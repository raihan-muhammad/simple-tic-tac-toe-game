import { ReactElement, useRef, useState } from "react";
import { ScrollView, TextInput as NativeTextInput, Alert, KeyboardAvoidingView, Platform, View } from "react-native";
import { TextInput, Button } from "components"
import { StackNavigationProp } from "@react-navigation/stack";
import { useHeaderHeight } from "@react-navigation/elements";
import { StackNavigatorParams } from "config/Navigator";
import { Auth } from "aws-amplify";
import styles from "./Signup.styles";

type SignUpProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "SignUp">;
}

export default function SignUp({ navigation }: SignUpProps): ReactElement {
    const headerHeight = useHeaderHeight();
    const emailRef = useRef<NativeTextInput | null>(null);
    const nameRef = useRef<NativeTextInput | null>(null);
    const passwordRef = useRef<NativeTextInput | null>(null);

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        username: "",
        email: "",
        name: "",
        password: ""
    })

    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value})
    }

    const SignUp = async () => {
        setLoading(true)
        const {username, email, name, password} = form
        try {
            const res = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    name
                }
            })
            console.log(res)
        } catch(err){
            if(err instanceof Error) Alert.alert("Error!", err.message || "An error has occurred!")
        }
        setLoading(false);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1,}} behavior={Platform.OS === "ios" ? "padding": "height"} keyboardVerticalOffset={headerHeight}>
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput 
                    placeholder="Username" 
                    returnKeyType="next" 
                    onSubmitEditing={() => nameRef.current?.focus() } 
                    value={form.username}
                    onChangeText={(value) => setFormInput("username", value)}
                />
                <TextInput 
                    ref={nameRef }
                    placeholder="Name" 
                    returnKeyType="next" 
                    onSubmitEditing={() => emailRef.current?.focus() } 
                    value={form.name}
                    onChangeText={(value) => setFormInput("name", value)}
                />
                <TextInput 
                    keyboardType="email-address"
                    ref={emailRef}
                    placeholder="Email" 
                    returnKeyType="next" 
                    onSubmitEditing={() => passwordRef.current?.focus() } 
                    value={form.email}
                    onChangeText={(value) => setFormInput("email", value)}
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
                    title="SignUp" 
                    onPress={SignUp}
                    style={{ backgroundColor: "#1B9C85" }} 
                    textColor="white"
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
