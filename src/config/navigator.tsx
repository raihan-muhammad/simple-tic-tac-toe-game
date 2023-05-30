import { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SinglePlayerGame, Home } from "screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: { GameId: string };
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export default function Navigator(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SinglePlayerGame" component={SinglePlayerGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
