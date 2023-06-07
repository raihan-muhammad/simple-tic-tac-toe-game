import { ReactElement, useRef } from "react";
import { ScrollView, TextInput as NativeTextInput } from "react-native";
import { TextInput} from "components"
import styles from "./Login.styles";

export default function Login(): ReactElement {
    const passwordRef = useRef<NativeTextInput | null>(null);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput placeholder="Username" returnKeyType="next" onSubmitEditing={() => passwordRef.current?.focus() } />
            <TextInput ref={passwordRef} placeholder="Username" returnKeyType="done" secureTextEntry />
        </ScrollView>
    )
}
