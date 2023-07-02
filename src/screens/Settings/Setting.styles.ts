import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 40 
    },
    field: {
        marginBottom: 30,
        position: "relative"
    },
    label: {
        fontSize: 18
    },
    choices: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        marginHorizontal: -5
    },
    choice: {
        padding: 10,
        margin: 5
    },
    choiceText: {
        color: "#fff"
    },
    switchField: {
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
        marginBottom: 0
    },
    changePassword: {
        marginTop: 20
    },
    textChangePassword: {
        textDecorationLine: "underline"
    }
})

export default styles;