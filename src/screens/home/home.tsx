import { View, ScrollView, Image } from "react-native";
import styles from "./Home.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "config/Navigator";
import { Background, Button } from "components";

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps) {
  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={require("assets/logo.png")} />
        <View>
          <Button
            title="Single Player"
            onPress={() =>
              navigation.navigate("SinglePlayerGame", { GameId: "aa1" })
            }
          />
          <Button title="Multiplayer" onPress={() => alert("yoi!")} />
          <Button title="Login" onPress={() => alert("yoi!")} />
          <Button onPress={() => navigation.navigate("Settings")} title="Setting" />
        </View>
      </ScrollView>
    </Background>
  );
}
