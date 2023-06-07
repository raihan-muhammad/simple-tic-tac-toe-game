import { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SinglePlayerGame, Home, Settings, Login } from "screens";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: { GameId: string };
  Settings: undefined,
  Login: undefined
};

const Stack = createStackNavigator<StackNavigatorParams>();
const NavigatorOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#1B9C85",
  },
  headerTintColor: "#fff",
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: "DeliusUnicase_700Bold"
  }
}

export default function Navigator(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NavigatorOptions}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} />
        <Stack.Screen name="SinglePlayerGame" component={SinglePlayerGame} options={{ headerShown: false}} />
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Login" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
