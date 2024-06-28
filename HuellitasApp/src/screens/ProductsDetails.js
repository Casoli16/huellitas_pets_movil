import {View, StyleSheet, Text} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";

const ProductsDetails = ()=> {

    //Recibimos los parametros que vienen de ProductsCards
    const route = useRoute();
    const { idProducto } = route.params;

    return(
        <View style={styles.container}>
            <Text>idProducto: {idProducto}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default ProductsDetails;

