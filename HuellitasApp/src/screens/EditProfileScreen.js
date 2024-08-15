import React, { useState, useEffect } from 'react';
import fetchData from '../../api/components';
import {View, StyleSheet, Image, Text, Dimensions, ScrollView, TouchableOpacity, Button, Alert} from "react-native"; // Añadido Button
import { TextInput, IconButton } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Fonts from "../../fonts/fonts";
import {SERVER_URL} from "../../api/components";
import { LoadingDots } from '@mrakesh0608/react-native-loading-dots';
//Importamos el boton personalizado -- Pueden utilizar este
import CustomButton from "../components/CustomeButton";
import * as ImagePicker from "expo-image-picker";
import {launchImageLibraryAsync} from "expo-image-picker";
import {DialogNotification, ToastNotification} from "../components/Alerts/AlertComponent";
import {AlertNotificationRoot, Dialog} from "react-native-alert-notification";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Obtener las dimensiones de la ventana para ajustar el diseño
const windowHeight = Dimensions.get('window').height;
const width = Dimensions.get("window").width;

const EditProfileScreen = () => {
    // Estado para almacenar los datos del perfil
    const [profile, setProfile] = useState({});

    //Campos necesarios para date picker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    //Declaracion de campos para el login
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dui, setDUI] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [direction, setDirection] = useState('');

    //Funcion para subir imagen desde la galeria y que se pueda mostrar.
    const [file, setFile] = useState(null);

    // Función para seleccionar una imagen desde la galería
    const pickImage = async () => {
        const option = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1
        };

        // Solicitar permisos para acceder a la galería
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(status !== 'granted') {
            ToastNotification(3, 'Para poder cambiar la imagen necesitamos los permisos para acceder a tu galería');
        } else {
            const result = await launchImageLibraryAsync(option);
            if(!result.canceled){
                const selectedAsset = result.assets[0];
                setFile(selectedAsset.uri);
            }
        }
    }

    //Funcion para tomar una imagen desde la camara y que se pueda mostrar.
    const takeImage = async () => {

        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            // Manejo si los permisos no fueron otorgados
            ToastNotification(3, 'Para poder tomar fotos, necesitamos permisos para acceder a la cámara y a la galería.');
        } else {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                maxWidth: 50,
                maxHeight: 50,
            });

            if (!result.canceled) {
                const selectedImage = result.assets[0];
                setFile(selectedImage.uri);
            }
        }
    }

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

    const UpdateProfile = async () => {
        try {

            if(!name.trim() || !lastName.trim() || !email.trim() || !direction.trim() || !dui.trim() || !birthdate.trim() || !phone.trim() ) {
                ToastNotification(3, 'Por favor complete todos los campos.');
                return;
            }

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

            if(file){
                form.append('imagenCliente', {
                    uri: file,
                    type: 'image/png',
                    name: 'imagen.png',
                });
            } else {
                form.append('imagenCliente', {
                    uri: `${SERVER_URL}images/clientes/${profile.imagen_cliente}`,
                    type: 'image/png',
                    name: 'imagen.png',
                });
            }



            const data = await fetchData(USER_API, 'editProfile', form);

            if(data.status){
                DialogNotification(1, data.message);
                setTimeout(() => {
                    Dialog.hide();
                    goToProfile();
                }, 1500);

            } else {
                DialogNotification(3, data.error, 'Ok');
            }
        } catch (error) {
            console.log(error);

        }
    }

    // Efecto para cargar los datos del perfil al montar el componente
    useEffect(() => {
        setLoading(true)
        const fetchProfileData = async () => {
            try {
                const data = await fetchData(USER_API, 'readProfile');
                if (data.status === 1 && data.dataset) {
                    const profileData = data.dataset;
                    setName(profileData.nombre_cliente);
                    setLastName(profileData.apellido_cliente);
                    setDUI(profileData.dui_cliente);
                    setEmail(profileData.correo_cliente);
                    setPhone(profileData.telefono_cliente);
                    setBirthdate(profileData.nacimiento_cliente);
                    setDirection(profileData.direccion_cliente);
                    setProfile(profileData);
                    setLoading(false)
                } else {
                    console.log('No se encontraron datos del perfil');
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error al obtener los datos del perfil:', error);
            }
        };

        fetchProfileData();
    }, []);

    // Obtener la navegación
    const navigation = useNavigation();

    // Función para navegar al perfil
    const goToProfile = () => {
        navigation.navigate('Profile', { updated: true });
    };

    // Cargar las fuentes
    Fonts();

    // Renderizado del componente
    return (
       <AlertNotificationRoot>
           <ScrollView contentContainerStyle={styles.scrollContainer}>
               {loading ? (
                   <View style={styles.loading}>
                       <LoadingDots
                           animation={"typing"}
                           color={'#EE964B'}
                           containerStyle={{backgroundColor: '#FAF0CA', padding: 18, borderRadius: 10,}}
                       />
                       <Text style={styles.loadingText}>Cargando...</Text>
                   </View>
               ):(
                   <View style={styles.container}>
                       <View style={styles.header}>
                           <IconButton icon="pencil" size={35} onPress={goToProfile}/>
                       </View>
                       <View style={styles.col}>
                           {file ? (
                               <Image style={styles.img} source={{ uri: file }} />
                           ) : (
                               <Image style={styles.img} source={{ uri: `${SERVER_URL}images/clientes/${profile.imagen_cliente}` }} />
                           )}
                           <View style={styles.buttonContainer}>
                               <TouchableOpacity onPress={()=>{takeImage()}}>
                                   <Icon name='camera-outline'  size={40} color={'#F95738'} />
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{pickImage()}}>
                                   <Icon name='image-multiple-outline'  size={35} color={'#EE964B'} />
                               </TouchableOpacity>
                           </View>
                           <View style={styles.inputBox}>
                               <View style={styles.input}>
                                   <Text style={styles.inputText}>Nombre</Text>
                                   <TextInput
                                       activeOutlineColor='#c5c4c2'
                                       textContentType='givenName'
                                       mode='outlined'
                                       outlineColor='#EDEDED'
                                       style={styles.textInput}
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
                                       outlineColor='#EDEDED'
                                       style={styles.textInput}
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
                                       outlineColor='#EDEDED'
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
                                       outlineColor='#EDEDED'
                                       style={styles.textInput}
                                       left={<TextInput.Icon icon="email" />}
                                       value={email}
                                       onChangeText={setEmail}
                                       editable={false} // Solo lectura
                                   />
                               </View>
                               <View style={styles.input}>
                                   <Text style={styles.inputText}>Teléfono</Text>
                                   <TextInput
                                       activeOutlineColor='#c5c4c2'
                                       textContentType='telephoneNumber'
                                       mode='outlined'
                                       placeholder="0000-0000"
                                       outlineColor='#EDEDED'
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
                                       outlineColor='#EDEDED'
                                       style={styles.textInput}
                                       left={<TextInput.Icon icon="compass-outline" />}
                                       value={direction}
                                       onChangeText={setDirection}
                                   />
                               </View>
                               <View style={styles.buttonContainer}>
                                   <CustomButton title='Actualizar datos' colorText='white' buttonColor='#EE964B' fontSize={16} onPress={UpdateProfile}/>
                               </View>
                               <View style={styles.input}></View>
                           </View>
                       </View>
                   </View>
               )}
           </ScrollView>
       </AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: "center",
        paddingHorizontal: 20
    },
    loading: {
        height: windowHeight * 0.6,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        marginTop: 5,
        fontFamily: 'Jost_500Medium',
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 5,
    },
    col: {
        flexDirection: "column",
        alignItems: "center"
    },
    inputBox: {
        width: width * 0.8,
        marginTop: 20
    },
    input: {
        marginVertical: 10,
    },
    inputText: {
        fontFamily: 'Jost_400Regular',
        fontSize: 18,
        marginBottom: 5,
    },
    textInput: {
        elevation: 5,
        borderRadius: 10,
        backgroundColor:'#FDFDFD'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 20
    },
});

export default EditProfileScreen;
