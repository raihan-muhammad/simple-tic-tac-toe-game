import { View, Dimensions } from "react-native";
import styles from "./SinglePlayerGame.styles";
import { Background, Board, Text, Button } from "components";
import { BoardState, getBestMove, isEmpty, isTerminal, Cell } from "utils";
import React, { ReactElement, useEffect, useState } from "react";
import { useSounds } from "hooks";
import { difficulties, useSettings } from "contexts/SettingContext";
const screenWidth = Dimensions.get("screen").width;

export default function Game(): ReactElement {
  const [state, setState] = useState<BoardState>([
    null,null, null,
    null, null,null,
    null, null,null,
  ]);
  const [turn, setTurn] = useState<'HUMAN' | 'BOT'>(Math.random() < 0.5 ? "HUMAN" : "BOT")
  const [isHumanMaxizing, setIsHumanMaxizing] = useState<boolean>(true)
  const [gamesCount, setGamesCount] = useState({
    wins: 0,
    losses: 0,
    draws: 0
  })
  
  const result = isTerminal(state)
  const playSound = useSounds();
  const {settings } = useSettings();

  const insertCell = (cell: number, symbol: 'x' | 'o'): void => {
    const stateCopy: BoardState = [...state];
    if(stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = symbol;
    setState(stateCopy)
    try {
      symbol === "x"? playSound("pop1") : playSound("pop2")
    } catch(error){
      console.log(error);
    }
  }
  
  const handleOnPressCell = (cell: number): void => {
    if(turn !== "HUMAN") return;
    insertCell(cell, isHumanMaxizing ? "x": "o")
    setTurn("BOT")
  }

  const getWinner = (winnerSymbol: Cell): "HUMAN" | "BOT" | "DRAW" => {
    if(winnerSymbol === "x") return isHumanMaxizing ? "HUMAN" : "BOT"
    if(winnerSymbol === "o") return isHumanMaxizing ? "BOT" : "HUMAN"

    return "DRAW"
  }

  const newGame = (): void => {
    setState([
      null, null, null,
      null, null, null,
      null, null, null
    ])
    setTurn(Math.random() > 0.5 ? "HUMAN" : "BOT")
  }

  useEffect(() => {
    if(result){
      const winner = getWinner(result.winner)
      if(winner === "HUMAN") {
        playSound("win");
        setGamesCount({...gamesCount, wins: gamesCount.wins + 1})
      }
      if(winner === "BOT") {
        playSound("lose")
        setGamesCount({...gamesCount, losses: gamesCount.losses + 1}) 
      }
      if(winner === "DRAW") {
        playSound("draw")
        setGamesCount({...gamesCount, draws : gamesCount.draws + 1})
      }
    } else {
      if(turn === "BOT"){
        if(isEmpty(state)){ 
          const centerAndCorner = [0,2,6,8,4];
          const firstMove = centerAndCorner[Math.floor(Math.random() * centerAndCorner.length)]
          insertCell(firstMove, "x");
          setIsHumanMaxizing(false);
          setTurn("HUMAN")
        } else {
          const best = getBestMove(state, !isHumanMaxizing, 0, parseInt(settings ? settings?.difficulty : "-1"));
          insertCell(best, isHumanMaxizing ? "o": "x")
          setTurn("HUMAN")
        }
      }
    }
  }, [state, turn])

  

  return (
    <Background>
      <View style={styles.container}>
        <View>
          <Text style={styles.difficulty}>Difficulty: {settings ? difficulties[settings.difficulty] : "Impossible"}</Text>
          <View style={styles.results}>
            <View style={styles.resultsBox}>
              <Text style={styles.resultTitle}>Wins</Text>
              <Text style={styles.resultCount}>{gamesCount.wins}</Text>
            </View>

            <View style={styles.resultsBox}>
              <Text style={styles.resultTitle}>Draws</Text>
              <Text style={styles.resultCount}>{gamesCount.draws}</Text>
            </View>

            <View style={styles.resultsBox}>
              <Text style={styles.resultTitle}>Losses</Text>
              <Text style={styles.resultCount}>{gamesCount.losses}</Text>
            </View>
          </View>
        </View>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"}
          onPressCell={(cell) => handleOnPressCell(cell)}
          size={screenWidth - 60}
          state={state}
          gameResult={result}
        />
        {result && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {getWinner(result.winner) === "HUMAN" && "You Won!"}
              {getWinner(result.winner) === "BOT" && "You Lose!"}
              {getWinner(result.winner) === "DRAW" && "Draw!"}
              </Text>
            <Button title="Play Again" onPress={newGame}/>
          </View>
        )}
      </View>
    </Background>
  );
}
