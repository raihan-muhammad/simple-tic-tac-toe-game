import { ReactElement, forwardRef } from "react";
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps } from "react-native";
import styles from "./TextInput.styles";

const TextInput = forwardRef<NativeTextInput, NativeTextInputProps>((props: NativeTextInputProps, ref): ReactElement => {
    return (
        <NativeTextInput
            ref={ref}
            {...props}
            style={styles.input}
        />
    )
})

TextInput.displayName = "TextInput"

export default TextInput;