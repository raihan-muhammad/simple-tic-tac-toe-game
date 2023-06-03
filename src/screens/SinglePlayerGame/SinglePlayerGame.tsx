import { View } from "react-native";
import styles from "./SinglePlayerGame.styles";
import { Background, Board } from "components";
import {  BoardState, getBestMove, isTerminal } from "utils";
import { ReactElement, useState } from "react";

export default function Game(): ReactElement {
  const [state, setState] = useState<BoardState>([
    null, "x", null,
    "o", null, "x",
    "o", "o", "x",
  ]);

  console.log(getBestMove(state, true))
  
  const handleOnPressCell = (cell: number): void => {
    const stateCopy: BoardState = [...state];
    if(stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = "x";
    setState(stateCopy)
  }

  return (
    // gshg
    <Background>
      <View style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state))}
          onPressCell={(cell) => handleOnPressCell(cell)}
          size={300}
          state={state}
        />
      </View>
    </Background>
  );
}
