import {View, StyleSheet, Image, Text} from "react-native";

const WelcomeScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Hola</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center"
    },
})

export default WelcomeScreen;