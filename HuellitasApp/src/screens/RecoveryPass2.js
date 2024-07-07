import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Fonts from "../../fonts/fonts";
import CustomButton from "../components/CustomeButton";
import { useNavigation } from "@react-navigation/native";
import SquareTextInput from "../components/Recovery/SquareTextInput"; // Import the new component

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const RecoveryPass2 = () => {
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [code5, setCode5] = useState('');
    Fonts();
    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate('LoginScreen');
    };
    const goToRec3 = () => {
        navigation.navigate('RecoveryPass3');
    };

    return (
        <View style={styles.container}>
            <View style={styles.col}>
                <Image style={styles.img} source={require('../../assets/huellitasLogo.png')} />
                <Text style={styles.title}>Recupera tu contraseña</Text>
                <Text style={styles.subTitle}>Revisa tu bandeja de correos e ingresa el código que recibiste.</Text>
                <View style={styles.inputBox}>
                    <Text style={styles.inputText}>Código</Text>
                    <View style={styles.codeContainer}>
                        <SquareTextInput value={code1} onChangeText={setCode1} />
                        <SquareTextInput value={code2} onChangeText={setCode2} />
                        <SquareTextInput value={code3} onChangeText={setCode3} />
                        <SquareTextInput value={code4} onChangeText={setCode4} />
                        <SquareTextInput value={code5} onChangeText={setCode5} />
                    </View>
                </View>
            </View>
            <View style={styles.buttonBox}>
                <CustomButton title='Enviar' colorText='white' buttonColor='#F4D35E' fontSize={16} onPress={goToRec3} />
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
    inputBox: {
        width: width * 0.8,
        marginTop: 50
    },
    inputText: {
        fontFamily: 'Jost_400Regular',
        fontSize: 18,
        marginBottom: 5
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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

export default RecoveryPass2;
