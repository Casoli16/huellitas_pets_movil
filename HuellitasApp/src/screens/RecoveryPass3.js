import React, { useState } from 'react';

import { View, StyleSheet, Image, Text, Dimensions, Touchable, TouchableOpacity } from "react-native";
import { TextInput } from 'react-native-paper';
//Importamos las fuentes a utilizar
import Fonts from "../../fonts/fonts";
//Importamos el boton personalizado -- Pueden utilizar este
import CustomButton from "../components/CustomeButton";
//Importamos la navegacion
import { useNavigation } from "@react-navigation/native";

// Obtiene el ancho y alto de la pantalla en la que se esta cargando la app
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const RecoveryPass3 = () => {
    //Declaracion de campos para el login
    const [pass2, setPass2] = useState('');
    const [pass, setPass] = useState('');

    //Utilizamos nuestras fuentes
    Fonts();

    //Usamos la navegacion que se ha creado - ver archivo navigation/StackNavigator.
    const navigation = useNavigation();

    //Creamos una funcion que nos diriga para la pantalla que queremos.
    const goToLogin = () => {
        //Identificamos a la pantalla con el name que se le puso en el StackNavigator.
        navigation.navigate('LoginScreen');
    };
    const goToRec2 = () => {
        //Identificamos a la pantalla con el name que se le puso en el StackNavigator.
        navigation.navigate('RecoveryPass2');
    };

    return (
        <View style={styles.container}>
            <View style={styles.col}>
                <Image style={styles.img} source={require('../../assets/huellitasLogo.png')} />
                <Text style={styles.title}>Recupera tu contraseña</Text>
                <Text style={styles.subTitle}>¡Listo, ahora ingresa la nueva contraseña y recuerda guardar tus contraseñas en un lugar seguro!</Text>
                <View style={styles.inputBox}>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>Nueva Contraseña</Text>
                        <TextInput
                            activeOutlineColor='#c5c4c2'
                            secureTextEntry={true}
                            mode='outlined'
                            outlineColor='#fff'
                            style={styles.textInput}
                            //Ver nombre de iconos en https://oblador.github.io/react-native-vector-icons/
                            left={<TextInput.Icon icon="lock" />}
                            value={pass}
                            onChangeText={setPass}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>Repetir Contraseña</Text>
                        <TextInput
                            activeOutlineColor='#c5c4c2'
                            secureTextEntry={true}
                            mode='outlined'
                            outlineColor='#fff'
                            style={styles.textInput}
                            //Ver nombre de iconos en https://oblador.github.io/react-native-vector-icons/
                            left={<TextInput.Icon icon="lock" />}
                            value={pass2}
                            onChangeText={setPass2}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonBox}>
                <CustomButton title='Guardar nueva contraseña' colorText='white' buttonColor='#F4D35E' fontSize={16} onPress={goToLogin} />
            </View>
            <View style={styles.row}>
                <Text style={styles.text1}>Volver</Text>
                <Text onPress={goToLogin} style={styles.text2}>Iniciar sesión</Text>
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
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
    },
    text1: {
        fontFamily: 'Jost_400Regular',
        fontSize: 16
    },
    text2: {
        fontFamily: 'Jost_600SemiBold',
        fontSize: 16
    }
})

export default RecoveryPass3;