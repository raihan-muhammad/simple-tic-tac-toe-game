import { ReactElement } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, BoardLine } from "components";
import { BoardResult, BoardState } from "utils";
import styles from "./Board.styles";

type BoardProps = {
  state: BoardState;
  size: number;
  disabled?: boolean;
  gameResult?: BoardResult | false; 
  onPressCell?: (index: number) => void;
};

export default function Board({
  state,
  size,
  disabled,
  gameResult,
  onPressCell,
}: BoardProps): ReactElement {
  return (
    <View
      style={[styles.board, {
        width: size,
        height: size,
      }]}
    >
      {state.map((cell, index) => (
        <TouchableOpacity
          disabled={cell !== null || disabled}
          onPress={() => onPressCell && onPressCell(index)}
          style={[styles.cell, styles[`cell${index}` as "cell"]]}
          key={index}
        >
          <Text style={{ color: "#fff", fontSize: size / 8 }}>{cell}</Text>
        </TouchableOpacity>
      ))}
      {true && <BoardLine size={size} gameResult={gameResult} /> }
      
    </View>
  );
}
