import { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SinglePlayerGame, Home, Settings } from "screens";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: { GameId: string };
  Settings: undefined
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();
const NavigatorOptions: NativeStackNavigationOptions = {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
