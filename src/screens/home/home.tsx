import { View, ScrollView, Image } from "react-native";
import styles from "./home.styles";
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
            title="Shafaa Cantik! 🤍"
            onPress={() =>
              navigation.navigate("SinglePlayerGame", { GameId: "aa1" })
            }
          />
          <Button title="Multiplayer" onPress={() => alert("yoi!")} />
          <Button title="Login" onPress={() => alert("yoi!")} />
          <Button title="Setting " onPress={() => alert("yoi!")} />
        </View>
      </ScrollView>
    </Background>
  );
}
