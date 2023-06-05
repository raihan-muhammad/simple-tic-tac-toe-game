import { View, Dimensions } from "react-native";
import styles from "./SinglePlayerGame.styles";
import { Background, Board } from "components";
import { BoardState, getBestMove, isEmpty, isTerminal, Cell } from "utils";
import React, { ReactElement, useEffect, useState } from "react";
import { useSounds } from "hooks";

const screenWidth = Dimensions.get("screen").width;

export default function Game(): ReactElement {
  const [state, setState] = useState<BoardState>([
    null,null, null,
    null, null,null,
    null, null,null,
  ]);
  const [turn, setTurn] = useState<'HUMAN' | 'BOT'>(Math.random() < 0.5 ? "HUMAN" : "BOT")
  const [isHumanMaxizing, setIsHumanMaxizing] = useState<boolean>(true)
  
  const result = isTerminal(state)
  const playSound = useSounds();

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

  useEffect(() => {
    if(result){
      const winner = getWinner(result.winner)
      if(winner === "HUMAN"){
        playSound("win");
        alert("You Won!")
      } 
      if(winner === "BOT"){
        playSound("lose")
        alert("You lose!")
      }
      if(winner === "DRAW"){
        playSound("draw")
        alert("Draw!")
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
          const best = getBestMove(state, !isHumanMaxizing, 0, 1);
          insertCell(best, isHumanMaxizing ? "o": "x")
          setTurn("HUMAN")
        }
      }
    }
  }, [state, turn])

  

  return (
    <Background>
      <View style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"}
          onPressCell={(cell) => handleOnPressCell(cell)}
          size={screenWidth - 60}
          state={state}
          gameResult={result}
        />
      </View>
    </Background>
  );
}
