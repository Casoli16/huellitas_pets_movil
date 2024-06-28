import React, { useState } from 'react';
import fetchData from '../../api/components';

import {View, StyleSheet, Image, Text, Dimensions, Touchable, TouchableOpacity, ScrollView} from "react-native";
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
//Importamos las fuentes a utilizar
import Fonts from "../../fonts/fonts";
//Importamos el boton personalizado -- Pueden utilizar este
import CustomButton from "../components/CustomeButton";
//Importamos la navegacion
import {useNavigation} from "@react-navigation/native";

// Obtiene el ancho y alto de la pantalla en la que se esta cargando la app
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const SingUpScreen = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    //Declaracion de campos para el login
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dui, setDUI] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [direction, setDirection] = useState('');
    const [pass, setPass] = useState('');
    const [passCheck, setPassCheck] = useState('');

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

        /*
    Codigo para mostrar el datetimepicker
    */

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        /*
        Codigo para convertir la fecha al formato año-mes-dia */

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const fechaNueva = `${year}-${month}-${day}`;
        setBirthdate(fechaNueva)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    /*
        Fin Codigo para mostrar el datetimepicker
        */

    const USER_API = 'services/public/clientes.php';

    const SingUp = async () => {
        try {

            // Si todos los campos son válidos, proceder con la creación del usuario
            //Creamos el forms que mandara los datos a la api
            const form = new FormData();
            form.append('nombreCliente', name);
            form.append('apellidoCliente', lastName);
            form.append('correoCliente', email);
            form.append('direccionCliente', direction);
            form.append('duiCliente', dui);
            form.append('nacimientoCliente', birthdate);
            form.append('telefonoCliente', phone);
            form.append('claveCliente', pass);
            form.append('confirmarClave', passCheck);

            const data = await fetchData(USER_API, 'signUpPhone', form);
            
            if(data.status){
                console.log('Tu cuenta se ha creado exitosamente');
                goToLogin();
            } else {
                console.log('Sorry');
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    //Usamos la navegacion que se ha creado - ver archivo navigation/StackNavigator.
    const navigation = useNavigation();

    //Creamos una funcion que nos diriga para la pantalla que queremos.
    const goToLogin = () => {
        //Identificamos a la pantalla con el name que se le puso en el StackNavigator.
        navigation.navigate('LoginScreen');
    };

    //Utilizamos nuestras fuentes
    Fonts();

    return(
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <View style={styles.col}>
                <Image  style={styles.img} source={require('../../assets/huellitasLogo.png')}/>
                <Text style={styles.title}>Registro</Text>
                <Text style={styles.subTitle}>¡Ya casi estamos! solo falta registrarnos para comenzar está a buscar el juguete perfecto.</Text>
                <View style={styles.inputBox}>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>Nombre</Text>
                        <TextInput
                            activeOutlineColor='#c5c4c2'
                            textContentType='givenName'
                            mode='outlined'
                            outlineColor='#fff'
                            style={styles.textInput}
                            //Ver nombre de iconos en https://oblador.github.io/react-native-vector-icons/
                            left={<TextInput.Icon icon="account" />}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>Apellido</Text>
                        <TextInput
                            activeOutlineColor='#c5c4c2'
                            textContentType='familyName'
                            mode='outlined'
                            outlineColor='#fff'
                            style={styles.textInput}
                            //Ver nombre de iconos en https://oblador.github.io/react-native-vector-icons/
                            left={<TextInput.Icon icon="account-plus" />}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>DUI</Text>
                        <TextInput
                            activeOutlineColor='#c5c4c2'
                            placeholder="00000000-0"
                            mode='outlined'
                            outlineColor='#fff'
                            style={styles.textInput}
                            left={<TextInput.Icon icon="card-account-details-outline" />}
                            render={(props) => (
                                <TextInputMask
                                    {...props}
                                    type={'custom'}
                                    options={{
                                        mask: '99999999-9'
                                    }}
                                    value={dui}
                                    onChangeText={setDUI}
                                />
                            )}
                        />
                    </View>
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
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>Teléfono</Text>
                        <TextInput
                            activeOutlineColor='#c5c4c2'
                            textContentType='telephoneNumber'
                            mode='outlined'
                            placeholder="0000-0000"
                            outlineColor='#fff'
                            style={styles.textInput}
                            left={<TextInput.Icon icon="phone-outline" />}
                            render={(props) => (
                                <TextInputMask
                                    {...props}
                                    type={'custom'}
                                    options={{
                                        mask: '9999-9999'
                                    }}
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>Fecha de nacimiento</Text>
                        <TouchableOpacity onPress={showDatepicker} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                activeOutlineColor='#c5c4c2'
                                textContentType='birthday'
                                mode='outlined'
                                outlineColor='#fff'
                                style={[styles.textInput, { flex: 1 }]} // Asegúrate de que el TextInput ocupe todo el espacio
                                //Ver nombre de iconos en https://oblador.github.io/react-native-vector-icons/
                                left={<TextInput.Icon icon="calendar-month" />}
                                value={birthdate}
                                onChangeText={setBirthdate}
                                editable={false} // Deshabilita la edición directa del TextInput
                            />
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                is24Hour={true}
                                minimumDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())} // Fecha mínima permitida (100 años atrás desde la fecha actual)
                                maximumDate={new Date()} // Fecha máxima permitida (fecha actual)
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>Dirección</Text>
                        <TextInput
                            activeOutlineColor='#c5c4c2'
                            textContentType='fullStreetAddress'
                            mode='outlined'
                            outlineColor='#fff'
                            style={styles.textInput}
                            //Ver nombre de iconos en https://oblador.github.io/react-native-vector-icons/
                            left={<TextInput.Icon icon="compass-outline" />}
                            value={direction}
                            onChangeText={setDirection}
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
                            value={pass}
                            onChangeText={setPass}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>Confirmar contraseña</Text>
                        <TextInput
                            activeOutlineColor='#c5c4c2'
                            secureTextEntry={true}
                            mode='outlined'
                            outlineColor='#fff'
                            style={styles.textInput}
                            //Ver nombre de iconos en https://oblador.github.io/react-native-vector-icons/
                            left={<TextInput.Icon icon="lock-check" />}
                            value={passCheck}
                            onChangeText={setPassCheck}
                        />
                        <Text onPress={''} style={styles.pass}>¿Has olvídado tú contraseña?</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonBox}>
                <CustomButton title='Crear cuenta' colorText='white' buttonColor='#F4D35E' fontSize={16} onPress={SingUp}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.text1}>¿Ya tienes una cuenta?</Text>
                <Text onPress={goToLogin} style={styles.text2}>Iniciar sesión</Text>
            </View>
        </View>
        </ScrollView>
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
        height: 150,
        marginTop: 60
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
        marginTop: 40
    },
    input: {
        marginVertical: 10,
    },
    inputText: {
        fontFamily: 'Jost_400Regular',
        fontSize: 18,
        marginBottom: 5
    },
    textInput: {
        elevation: 5,
        borderRadius: 10
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
    },
    fecha: {
        fontWeight: '600',
        color: '#FFF'
    },
    contenedorFecha: {
        backgroundColor: '#A79277',
        color: "#fff", fontWeight: '800',
        width: 250,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    }
})

export default SingUpScreen;