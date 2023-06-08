import { ReactElement, useRef, useState } from "react";
import { ScrollView, TextInput as NativeTextInput, Alert } from "react-native";
import { TextInput, Button } from "components"
import { Auth } from "aws-amplify";
import styles from "./Login.styles";

export default function Login(): ReactElement {
    const passwordRef = useRef<NativeTextInput | null>(null);
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value})
    }

    // const signup = async () => {
    //     try {
    //         const res = await Auth.signUp({
    //             username: "test",
    //             password: "testtest",
    //             attributes: {
    //                 email: "test@test.com",
    //                 name: "test test"
    //             }
    //         })
    //         console.log(res)
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    const Login = async () => {
        setLoading(true)
        try {
            const { username, password} = form;
            const res = await Auth.signIn(username, password);
            console.log(res);
        } catch(err){
            if(err instanceof Error) Alert.alert("Error!", err.message || "An error has occurred!")
        }
        setLoading(false);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput 
                placeholder="Username" 
                returnKeyType="next" 
                onSubmitEditing={() => passwordRef.current?.focus() } 
                value={form.username}
                onChangeText={(value) => setFormInput("username", value)}
            />
            <TextInput 
                ref={passwordRef} 
                placeholder="Password" 
                returnKeyType="done" 
                secureTextEntry
                value={form.password}
                onChangeText={(value) => setFormInput("password", value)}
            />

            <Button 
                loading={loading} 
                title="Login" 
                onPress={Login}
                style={{ backgroundColor: "#1B9C85" }} 
                textColor="white"
            />
        </ScrollView>
    )
}
