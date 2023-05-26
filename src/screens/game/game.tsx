import { View, Text } from "react-native";
import styles from "./game.styles";
import { Background } from "components";

export default function Game() {
  return (
    <Background>
      <View style={styles.container}>
        <Text>Game</Text>
      </View>
    </Background>
  );
}
