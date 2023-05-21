import { StyleSheet, View } from "react-native";
import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import { Text } from "components";
import AppLoading from "expo-app-loading";
export default function App() {
  const [fontLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
  });
  if (!fontLoaded) return <AppLoading />;
  console.log(fontLoaded);
  return (
    <View style={styles.container}>
      <Text onPress={() => alert("Ok!")} style={{ fontSize: 25 }} weight="bold">
        Shafaa cantik 🤍
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
