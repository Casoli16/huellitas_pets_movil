import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import { TextInput } from 'react-native-paper';
import Fonts from "../../fonts/fonts";
import CustomButton from "../components/CustomeButton";
import { useNavigation } from "@react-navigation/native";
import fetchData from '../../api/components';
import { ToastNotification } from "../components/Alerts/AlertComponent";
import {AlertNotificationRoot, Dialog} from "react-native-alert-notification";

// Obtiene el ancho y alto de la pantalla en la que se está cargando la app
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const RecoveryPass1 = () => {
    const [email, setEmail] = useState("");
    const API = 'services/recuperacion/recuperacion.php';

    Fonts();

    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate('LoginScreen');
    };

    const handleRecoverPassword = async () => {
        if (email === "") {
            ToastNotification(3, 'El correo no puede estar vacío', true);
            console.log('Si entra');
            return;
        }

        const fechaActualUTC = new Date();
        const FORM = new FormData();
        FORM.append('correo', email);
        FORM.append('nivel', 2);
        FORM.append('fecha', fechaActualUTC.toISOString());
        console.log(email);
        console.log(fechaActualUTC.toISOString());
        try {
            const data = await fetchData(API, 'envioCorreo', FORM);
            console.log(data);
            if (data.status) {
                ToastNotification(1, data.message, true);
                navigation.navigate('LoginScreen');
            } else {
                ToastNotification(2, data.message, true);
            }
        } catch (error) {
            ToastNotification(2, data.error, true);
        }
    };

    return (
        <AlertNotificationRoot>{
        <View style={styles.container}>
            <View style={styles.col}>
                <Image style={styles.img} source={require('../../assets/huellitasLogo.png')} />
                <Text style={styles.title}>Recupera tu contraseña</Text>
                <Text style={styles.subTitle}>Ingresa el correo electrónico asociado a tu cuenta de Huellitas Pets para recibir un código
                    de recuperación.</Text>
                <View style={styles.inputBox}>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>Correo electrónico</Text>
                        <TextInput
                            activeOutlineColor='#c5c4c2'
                            textContentType='emailAddress'
                            mode='outlined'
                            outlineColor='#fff'
                            style={styles.textInput}
                            left={<TextInput.Icon icon="email" />}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonBox}>
                <CustomButton title='Enviar código' colorText='white' buttonColor='#F4D35E' fontSize={16} onPress={handleRecoverPassword} />
            </View>
            <View style={styles.row}>
                <Text style={styles.text1}>Volver</Text>
                <Text onPress={goToLogin} style={styles.text2}>Iniciar sesión</Text>
            </View>
            <ToastNotification/>
        </View>
        }
        </AlertNotificationRoot>
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
});

export default RecoveryPass1;
