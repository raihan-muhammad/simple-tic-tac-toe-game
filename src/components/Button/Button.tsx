import { ReactElement } from "react";
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";
import { Text } from "components";
import styles from "./Button.styles";

type ButtonProps = {
  title: string;
  loading?: boolean;
  textColor?: "white"
} & TouchableOpacityProps;

export default function Button({
  title,
  style,
  textColor,
  loading,
  ...props
}: ButtonProps): ReactElement {
  return (
    <TouchableOpacity disabled={loading} style={[styles.button, style]} {...props}>
      {loading ? (
        <ActivityIndicator/>
      ): (
        <Text style={[styles.textButton, { color: textColor === "white" ? "#fff" : "intial" }]} weight="bold">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
