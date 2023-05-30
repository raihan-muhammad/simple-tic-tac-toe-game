import { View, Text } from "react-native";
import styles from "./SinglePlayerGame.styles";
import { Background, Board } from "components";
// import { printFormattedBoard } from "utils/board";
import { ReactElement } from "react";

export default function Game(): ReactElement {
  // printFormattedBoard(b);

  return (
    <Background>
      <View style={styles.container}>
        <Board
          onPressCell={(index) => alert(index)}
          size={300}
          state={["x", "o", null, "x", "o", "o", "x", "o", "x"]}
        />
      </View>
    </Background>
  );
}
