import {View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, ScrollView} from "react-native";
import Fonts from "../../fonts/fonts";
import {Icon} from "react-native-paper";
import CustomButton from "../components/CustomeButton";

// Obtiene el tamaño de la pantalla en la que este.
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const CartScreen = ({logueado, setLogueado})=> {
    Fonts();
    return(
      <View style={styles.container}>
        <ScrollView style={{height: windowHeight * 0.5}}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.imgContainer}>
                        <Image source={require('../../assets/historialCompra.png')} style={{width: 40, height: 40}}/>
                    </View>
                    <View style={styles.infoProductBox}>
                        <Text style={styles.product}>Maxi chucho de carne</Text>
                        <Text style={styles.price}>$50.00</Text>
                    </View>
                    <View style={styles.close}>
                        <View style={styles.rowButtons}>
                            <TouchableOpacity style={styles.minus}>
                                <Icon size={20} source={'minus'} color='white'/>
                            </TouchableOpacity>
                            <Text style={styles.count}>2</Text>
                            <TouchableOpacity style={styles.plus}>
                                <Icon size={20} source={'plus'} color='white'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.divisor}></View>
            </View>
        </ScrollView>

         {/*Precio total*/}
        <View style={styles.spacer}></View>
        <View style={styles.totalBox}>
            <View style={styles.rowTotal}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalPrice}>$200.00</Text>
            </View>
            <CustomButton title='Comprar' buttonColor='#EE964B' fontSize={18} colorText='white'/>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
    },
    card: {
        marginHorizontal: windowWidth * 0.05,
        marginVertical: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    imgContainer: {
        borderColor: '#C2BCBC',
        borderStyle: "solid",
        borderRadius: 10,
        borderWidth: 1,
        padding: 12
    },
    infoProductBox: {
      width: 175,
        marginStart: 5
    },
    product: {
        fontFamily: 'Jost_500Medium',
        fontSize: 16
    },
    price: {
        fontFamily: 'Jost_600SemiBold',
        color: '#F95738'
    },
    close:{
      flexDirection: "column",
      alignItems: "flex-end"
    },
    minus: {
        backgroundColor: '#EE964B',
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        borderRadius: 100
    },
    plus: {
        backgroundColor: '#F95738',
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        borderRadius: 100
    },
    rowButtons: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    count: {
        fontSize: 20,
        fontFamily: 'Jost_600SemiBold'
    },
    divisor: {
        marginTop: 15,
        height: 1,
        backgroundColor: '#E2DFDF'
    },
    ///////////////////////// STYLES PARA LA BOX DEL TOTAL //////////////
    totalBox: {
        borderTopRightRadius: 30,
        borderColor: '#CCC5C5',
        borderTopLeftRadius: 30,
        height: 160,
        paddingHorizontal: 25,
        borderWidth: 1
    },
    spacer: {
        flex: 1
    },
    rowTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingTop: 20,
        marginBottom: 30
    },
    totalText: {
        fontSize: 18,
        color: '#616060',
        fontFamily: 'Jost_600SemiBold'
    },
    totalPrice:{
        fontSize: 18,
        fontFamily: 'Jost_700Bold',
        color: '#e60404',
    }

});

export default CartScreen;