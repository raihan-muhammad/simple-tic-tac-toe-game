import { View } from "react-native";
import styles from "./SinglePlayerGame.styles";
import { Background, Board } from "components";
import { printFormattedBoard, BoardState, isEmpty, isFull, availableMoves } from "utils";
import { ReactElement } from "react";

export default function Game(): ReactElement {
  const b: BoardState = [null, null, null, null, null, null, null, null, null]
  printFormattedBoard(b);
  console.log(isEmpty(b));
  console.log(isFull(b));
  console.log(availableMoves(b))

  return (
    <Background>
      <View style={styles.container}>
        <Board
          onPressCell={(index) => alert(index)}
          size={300}
          state={b}
        />
      </View>
    </Background>
  );
}
