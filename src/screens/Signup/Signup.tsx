import { ReactElement, useEffect, useRef, useState } from "react";
import { ScrollView, TextInput as NativeTextInput, Alert, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "components"
import { StackNavigationProp } from "@react-navigation/stack";
import { useHeaderHeight } from "@react-navigation/elements";
import { StackNavigatorParams } from "config/Navigator";
import { Auth } from "aws-amplify";
import OTPInput from "@twotalltotems/react-native-otp-input"
import styles from "./Signup.styles";
import { RouteProp } from "@react-navigation/native";

type SignUpProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "SignUp">;
    route: RouteProp<StackNavigatorParams, "SignUp">
}

export default function SignUp({ navigation, route }: SignUpProps): ReactElement {
    const unconfirmedUsername = route.params?.username;
    const headerHeight = useHeaderHeight();
    const emailRef = useRef<NativeTextInput | null>(null);
    const nameRef = useRef<NativeTextInput | null>(null);
    const passwordRef = useRef<NativeTextInput | null>(null);

    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<"otp" | "signup">(unconfirmedUsername ? "otp": "signup")
    const [isConfirming, setIsConfirming] = useState(false);
    const [isResending, setIsResending] = useState(false);
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
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    name
                }
            })
            setStep("otp")
        } catch(err){
            if(err instanceof Error) Alert.alert("Error!", err.message || "An error has occurred!")
        }
        setLoading(false);
    }

    const confirmCode = async (code: string) => {
        setIsConfirming(true);
        try {
            await Auth.confirmSignUp(form.username || unconfirmedUsername || "", code)
            navigation.navigate("Login")
            Alert.alert("Success!")
        } catch(err){
            if(err instanceof Error) Alert.alert("Error!", err.message || "An error has occurred!")
        }
    }

    const resendCode = async (username: string) => {
        setIsResending(true);
        try {
            await Auth.resendSignUp(username);
        } catch(err) {
            if(err instanceof Error) Alert.alert("Error!", err.message || "An error has occurred!")
        } finally {
            setIsResending(false);
        }
    }

    useEffect(() => {
        if(unconfirmedUsername){
            resendCode(unconfirmedUsername)
        }
    }, []);

    return (
        <KeyboardAvoidingView style={{ flex: 1,}} behavior={Platform.OS === "ios" ? "padding": "height"} keyboardVerticalOffset={headerHeight}>
            <ScrollView contentContainerStyle={styles.container}>
                {step === "otp" && (
                    <>
                        <Text style={styles.textTitle}>Enter the otp code from your email</Text>
                        {isConfirming ? (
                            <ActivityIndicator />
                        ): (
                            <>
                                <OTPInput 
                                    pinCount={6} 
                                    codeInputHighlightStyle={{ borderWidth: 1, borderColor:" #1B9C85"}} 
                                    codeInputFieldStyle={{ color: "#1B9C85", backgroundColor: "#fff", fontWeight: "bold" }} 
                                    onCodeFilled={code => {
                                        confirmCode(code)
                                    }}
                                />
                                {isResending ? (
                                    <ActivityIndicator/>    
                                ): (
                                    <TouchableOpacity onPress={() => {
                                        if(form.username) resendCode(form.username);
                                        if(unconfirmedUsername) resendCode(unconfirmedUsername);
                                    }}>
                                        <Text style={styles.textResend}>Resend Code</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                    </>
                )}
                {step === "signup" && (
                    <>
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
                    </>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
