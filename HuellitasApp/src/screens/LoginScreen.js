import {View, StyleSheet, Image, Text, Dimensions, Touchable, TouchableOpacity} from "react-native";
import { TextInput } from 'react-native-paper';
//Importamos las fuentes a utilizar
import Fonts from "../../fonts/fonts";
//Importamos el boton personalizado -- Pueden utilizar este
import CustomButton from "../components/buttons";
//Importamos la navegacion
import {useNavigation} from "@react-navigation/native";

// Obtiene el ancho y alto de la pantalla en la que se esta cargando la app
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const LoginScreen = () => {
    Fonts();

    return(
      <View style={styles.container}>
          <View style={styles.col}>
              <Image  style={styles.img} source={require('../../assets/huellitasLogo.png')}/>
              <Text style={styles.title}>Iniciar sesión</Text>
              <Text style={styles.subTitle}>¡Bienvenido de nuevo! Es un placer tenerte de nuevo</Text>
              <View style={styles.inputBox}>
                  <View style={styles.input}>
                      <Text style={styles.inputText}>Correo electrónico</Text>
                      <TextInput
                          activeOutlineColor='#c5c4c2'
                          textContentType='emailAddress'
                          mode='outlined'
                          outlineColor='#fff'
                          style={styles.textInput}
                          //Ver nombre de iconos en https://oblador.github.io/react-native-vector-icons/
                          left={<TextInput.Icon icon="email" />}
                      />
                  </View>
                  <View style={styles.input}>
                      <Text style={styles.inputText}>Contraseña</Text>
                      <TextInput
                          activeOutlineColor='#c5c4c2'
                          secureTextEntry={true}
                          mode='outlined'
                          outlineColor='#fff'
                          style={styles.textInput}
                          //Ver nombre de iconos en https://oblador.github.io/react-native-vector-icons/
                          left={<TextInput.Icon icon="lock" />}
                      />
                      <Text onPress={''} style={styles.pass}>¿Has olvídado tú contraseña?</Text>
                  </View>
              </View>
          </View>
          <View style={styles.buttonBox}>
              <CustomButton title='Iniciar sesión' colorText='white' buttonColor='#F4D35E' fontSize={16}/>
          </View>
          <View style={styles.row}>
              <Text style={styles.text1}>¿No tienes cuenta?</Text>
              <Text onPress={''} style={styles.text2}>Registrar sesión</Text>
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF0CA',
        justifyContent: "center",
        paddingHorizontal: 20
    },
    img: {
        width: 150,
        height: 150
    },
    col: {
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        fontFamily: 'Jost_500Medium',
        fontSize: 36
    },
    subTitle: {
        fontFamily: 'Jost_300Light',
        fontSize: 18,
        textAlign: "center"
    },
    //ESTILOS PARA LOS INPUTS
    inputBox: {
        width: width * 0.8,
        marginTop: 50
    },
    input: {
        marginVertical: 10
    },
    inputText: {
        fontFamily: 'Jost_400Regular',
        fontSize: 18,
        marginBottom: 5
    },
    textInput: {
        elevation: 5,
    },
    pass: {
        fontFamily: 'Jost_400Regular',
        textAlign: "right",
        marginTop: 10
    },
    buttonBox: {
        paddingHorizontal: 20,
        marginVertical: 20
    },
    row: {
        flexDirection:"row",
        justifyContent: "center",
        gap: 5,
    },
    text1:{
      fontFamily: 'Jost_400Regular',
      fontSize: 16
    },
    text2: {
        fontFamily: 'Jost_600SemiBold',
        fontSize: 16
    }
})

export default LoginScreen;