import { ReactElement } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "components";

type Cell = "x" | "o" | null;
type BoardProps = {
  state: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
  size: number;
  onPressCell?: (index: number) => void;
};

export default function Board({
  state,
  size,
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
    </View>
  );
}
