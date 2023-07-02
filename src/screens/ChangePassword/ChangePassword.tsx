
import { Text, TextInput, Button } from 'components';
import styles from './ChangePassword.styles';
import { ScrollView, TextInput as NativeTextInput, Alert } from "react-native";
import { useAuth } from 'contexts/AuthContext';
import { useRef, useState } from 'react';
import { Auth } from 'aws-amplify';

export default function ChangePassword(){
    const { user} = useAuth();
    const newPasswordRef = useRef<NativeTextInput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: ""
    })

    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({...form, [key]: value})
    }

    const changePassword = async () => {
        const { oldPassword, newPassword } = form;
        setIsLoading(true)
        try {
            await Auth.changePassword(user, oldPassword, newPassword);
            setForm({
                oldPassword: "",
                newPassword: ""
            });
            Alert.alert("Success!", "Password Changed Successfully!")
        } catch(err: any){
            Alert.alert("Error!", err.message || "An error has occured!")
        }

        setIsLoading(false);
    }

    return (
        <ScrollView style={styles.container}>
            <Text weight="regular">Change password for username: 
                <Text weight="bold">{user?.username}</Text>
            </Text>
            <TextInput
                secureTextEntry
                returnKeyType="next"
                style={{ marginBottom: 20 }}
                placeholder="Old Password"
                onSubmitEditing={() => {
                    newPasswordRef.current?.focus();
                }}
                value={form.oldPassword}
                onChangeText={value => setFormInput("oldPassword", value)}
            />
            <TextInput
                secureTextEntry
                returnKeyType="done"
                style={{ marginBottom: 30 }}
                ref={newPasswordRef}
                placeholder="New Password"
                value={form.newPassword}
                onChangeText={value => setFormInput("newPassword", value)}
            />

            <Button
                loading={isLoading}
                onPress={changePassword}
                style={{ backgroundColor: "#1B9C85" }} 
                textColor='white'
                title="Change Password"
            />
        </ScrollView>
    )
}