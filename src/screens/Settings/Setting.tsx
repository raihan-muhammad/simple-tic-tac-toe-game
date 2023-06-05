
import { ScrollView } from "react-native";
import { Text } from "components";
import styles from "./Setting.styles";
import { ReactElement } from "react";


export default function Settings(): ReactElement {
    return (
        <ScrollView style={styles.container}>
            <Text>Settings</Text>
        </ScrollView>
    )
}