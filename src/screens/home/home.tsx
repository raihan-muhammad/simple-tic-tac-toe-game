import { View, ScrollView, Image } from "react-native";
import styles from "./Home.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "config/Navigator";
import { Background, Button, Text } from "components";
import { ReactElement } from "react";
import { useAuth } from "contexts/AuthContext"

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
  const {user} = useAuth();
  console.log(user);
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
          <Button title={user? "Logout": "Login"} onPress={() => {
            if(user){
              console.log(user)
            } else {
              navigation.navigate("Login")} 
            }}
            />
          <Button onPress={() => navigation.navigate("Settings")} title="Setting" />
          {user && <Text weight="bold" style={styles.textLogin}>Logged in as {user.username} </Text>}
        </View>
      </ScrollView>
    </Background>
  );
}
