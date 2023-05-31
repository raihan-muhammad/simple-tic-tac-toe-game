import { View } from "react-native";
import styles from "./SinglePlayerGame.styles";
import { Background, Board } from "components";
import { printFormattedBoard, BoardState, isEmpty, isFull, availableMoves, isTerminal } from "utils";
import { ReactElement, useState } from "react";

export default function Game(): ReactElement {
  const [state, setState] = useState<BoardState>([
    null, null, null,
    null, null, null,
    null, null, null,
  ]);
  
  const handleOnPressCell = (cell: number): void => {
    const stateCopy: BoardState = [...state];
    if(stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = "x";
    setState(stateCopy)
  }

  return (
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
