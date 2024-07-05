import {View, StyleSheet, Image, Text, Dimensions} from "react-native";
import Fonts from "../../fonts/fonts";
import CustomButton from "../components/CustomeButton";
import {useNavigation} from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;

const DeliveryScreen2 = ()=>{
    Fonts();

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.col}>
                <View style={styles.box}>
                    <Image source={require('../../assets/buy.png')}/>
                </View>
                <Text style={styles.title}>Tu compra ha sido exitosa</Text>
                <Text style={styles.subtitle}>Cuando tú pedido este cerca se te avisará al correo electrónico</Text>
                <CustomButton title='Ir a mis pedidos' buttonColor='#F4D35E' colorText='#fff' fontSize={14} onPress={()=>{navigation.navigate('History')}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
    col: {
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: windowWidth * 0.05
    },
    box: {
        backgroundColor: '#D4FDBB',
        borderRadius: 100,
        padding: 20,
        marginBottom: 10
    },
    title: {
        fontFamily: 'Jost_600SemiBold',
        fontSize: 20,
        marginBottom: 5
    },
    subtitle: {
        fontFamily: 'Jost_300Light',
        fontSize: 16,
        textAlign:"center",
        marginBottom: 15
    }
})

export default DeliveryScreen2;