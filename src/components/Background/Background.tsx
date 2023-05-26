import { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";

import { View } from "react-native";

type BackgroundProps = {
  children: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "#1B9C85" }}>
      <StatusBar style="light" />
      {children}
    </View>
  );
}
