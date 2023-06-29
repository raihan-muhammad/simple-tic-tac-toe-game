import { Alert, ScrollView, TextInput as NativeTextInput } from "react-native";
import { Button, TextInput } from "components"
import styles from "./ForgotPassword.styles";
import { useState, useRef, ReactElement } from "react";
import { Auth } from "aws-amplify";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "config/Navigator";

type ForgotPasswordNavigationProp = StackNavigationProp<StackNavigatorParams, "ForgotPassword">

type ForgotPasswordProps = {
    navigation: ForgotPasswordNavigationProp;
}

export default function ForgotPassword({ navigation }: ForgotPasswordProps): ReactElement {
    const passwordRef = useRef<NativeTextInput | null>(null);
    const [form, setForm] = useState({
        username: "",
        password: "",
        code: ""
    })
    const [step, setStep] = useState<"1" | "2">("1");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({...form, [key]: value})
    }

    const forgotPassword = async () => {
        const { username } = form;
        setIsLoading(true);
        try {
            await Auth.forgotPassword(username)
            setStep("2");
        } catch(err: any) {
            Alert.alert("Error!", err.message || "An error has occurred!");
        }
        setIsLoading(false);
    }

    const forgotPasswordSubmit = async () => {
        const { username, code, password } = form;
        setIsLoading(true);
        try {
            await Auth.forgotPasswordSubmit(username, code, password);
            Alert.alert("Success!", "Password Changed Successfully!");
            navigation.navigate("Login")
        } catch(err: any){
            Alert.alert("Error!", err.message || "An error has occurred!");
        }
        setIsLoading(false);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {step === "1" && (
                <TextInput
                    returnKeyType="next"
                    placeholder="Username"
                    value={form.username}
                    onChangeText={value => setFormInput("username", value)}
                />
            )}
            {step === "2" && (
                <>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="numeric"
                        placeholder="Verification Code"
                        value={form.code}
                        onChangeText={value => setFormInput("code", value)}
                        onSubmitEditing={() => {
                            passwordRef.current?.focus();
                        }}
                    />
                    <TextInput
                        secureTextEntry
                        returnKeyType="done"
                        ref={passwordRef}
                        placeholder="New Password"
                        value={form.password}
                        onChangeText={value => setFormInput("password", value)}
                    />
                </>
            )}
            <Button 
                title="Submit"
                style={{ backgroundColor: "#1B9C85" }} 
                textColor="white"
                onPress={() => {
                    if(step === "1") forgotPassword();
                    if(step === "2") forgotPasswordSubmit();
                }}
            />
        </ScrollView>
    )
}