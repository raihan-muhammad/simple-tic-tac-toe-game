import { ReactNode, ReactElement } from "react";
import {
  View,
  Text as NativeText,
  TextProps as NativeTextProps,
} from "react-native";

type TextProps = {
  weight: "bold" | "regular";
  children: ReactNode;
} & NativeTextProps;

const defaultProps = {
  weight: "bold",
};

export default function Text({
  children,
  weight,
  style,
  ...props
}: TextProps): ReactElement {
  let fontFamily;
  if (weight === "bold") fontFamily = "DeliusUnicase_700Bold";
  if (weight === "regular") fontFamily = "DeliusUnicase_400Regular";

  return (
    <View>
      <NativeText {...props} style={[{ fontFamily }, style]}>
        {children}
      </NativeText>
    </View>
  );
}

Text.defaultProps = defaultProps;
