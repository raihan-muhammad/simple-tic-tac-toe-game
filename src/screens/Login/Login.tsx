import { ReactElement, useRef, useState } from "react";
import { ScrollView, TextInput as NativeTextInput, Alert, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "components"
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "config/Navigator";
import { Auth } from "aws-amplify";
import styles from "./Login.styles";

type LoginProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Login">;
}

export default function Login({ navigation }: LoginProps): ReactElement {
    const passwordRef = useRef<NativeTextInput | null>(null);
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value})
    }

    const Login = async () => {
        setLoading(true)
        const { username, password} = form;
        try {
            await Auth.signIn(username, password);
            navigation.navigate("Home")
        } catch(err: any){
            if(err.code === "UserNotConfirmedException"){
                navigation.navigate("SignUp", {username})
            }
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
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SignUp");
                }}
            >
                <Text style={styles.RegisterText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
