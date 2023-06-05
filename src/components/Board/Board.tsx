import { ReactElement } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, BoardLine } from "components";
import { BoardResult, BoardState } from "utils";

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
      style={{
        width: size,
        height: size,
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {state.map((cell, index) => (
        <TouchableOpacity
          disabled={cell !== null || disabled}
          onPress={() => onPressCell && onPressCell(index)}
          style={{
            width: "33.333%",
            height: "33.333%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#fff",
          }}
          key={index}
        >
          <Text style={{ color: "#fff", fontSize: size / 8 }}>{cell}</Text>
        </TouchableOpacity>
      ))}
      {true && <BoardLine size={size} gameResult={gameResult} /> }
      
    </View>
  );
}
