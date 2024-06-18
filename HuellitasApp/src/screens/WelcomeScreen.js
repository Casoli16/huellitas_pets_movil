import {View, StyleSheet, Image, Text, Dimensions, Touchable, TouchableOpacity} from "react-native";
//Importamos las fuentes a utilizar
import Fonts from "../../fonts/fonts";
//Importamos el boton personalizado -- Pueden utilizar este
import CustomButton from "../components/CustomeButton";
//Importamos la navegacion
import {useNavigation} from "@react-navigation/native";

// Obtiene el ancho y alto de la pantalla en la que se esta cargando la app
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const WelcomeScreen = () => {

    //Usamos la navegacion que se ha creado - ver archivo navigation/StackNavigator.
    const navigation = useNavigation();

    //Creamos una funcion que nos diriga para la pantalla que queremos.
    const goToLogin = () => {
        //Identificamos a la pantalla con el name que se le puso en el StackNavigator.
        navigation.navigate('LoginScreen');
    };

    //Utilizamos nuestras fuentes - Para saber como se llaman las fuentes, revisar fonts.js
    Fonts();

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/welcome.png')}/>
            <View style={styles.containerTitle}>
                <Text style={styles.title1}>HUELLITAS</Text>
                <Text style={styles.title2}>PET’S SHOP</Text>
                <Text style={styles.text}>Descubre una tienda solo para los consentidos de la casa.</Text>
                {/*Se le puede enviar el color del texto, color del boton, tamaño de la letra, titulo del boton y el evento onPress*/}
                <CustomButton title='Empezar' colorText='white' buttonColor='#EE964B' fontSize={20} onPress={goToLogin}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    img: {
        resizeMode: "stretch",
        width: width,
        height: height * 0.55
    },
    containerTitle: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title1:{
        fontSize: 45,
        color: '#EE964B',
        fontFamily: 'FredokaOne_400Regular'
    },
    title2: {
        fontSize: 45,
        fontFamily: "FredokaOne_400Regular",
    },
    text: {
        fontFamily: 'Jost_300Light',
        fontSize: 20,
        marginBottom: 40
    }
})

export default WelcomeScreen;