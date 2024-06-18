import Fonts from "../../fonts/fonts";
import {View, StyleSheet, Alert} from "react-native";

const ProfileScreen = () => {
    Fonts();

    return(
      <View style={styles.container}>

      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ProfileScreen;