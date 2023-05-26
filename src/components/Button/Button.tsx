import { ReactElement } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Text } from "components";
import styles from "./Button.styles";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export default function Button({
  title,
  style,
  ...props
}: ButtonProps): ReactElement {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.textButton} weight="bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
