// Importamos las dependencias necesarias de React y otras librerías
import React, { useState, useEffect } from 'react';
import fetchData from '../../api/components'; // Función personalizada para realizar peticiones a la API
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from "react-native";
import { TextInput, IconButton } from 'react-native-paper'; // Componentes de Paper para diseño
import { TextInputMask } from 'react-native-masked-text'; // Componente para máscaras en inputs
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"; // Hooks de navegación
import CustomButton from "../components/CustomeButton"; // Componente de botón personalizado
import UpdatePasswordModal from '../components/UpdatePasswordModal'; // Componente para actualizar contraseñ
import { SERVER_URL } from "../../api/components"; // URL del servidor
import {LoadingDots} from "@mrakesh0608/react-native-loading-dots"; // Componente de animación de carga
import {AlertNotificationRoot} from "react-native-alert-notification"; // Componente para notificaciones

// Obtiene el ancho y alto de la pantalla
const width = Dimensions.get("window").width;
const windowHeight = Dimensions.get('window').height;

// Componente de la pantalla de perfil
const ProfileScreen = ({setName, setPicture, setLoad}) => {
    //Para manejar cuando este cargando la pantalla
    const [loading, setLoading] = useState(true);

    // Estado para los datos del perfil
    const [profile, setProfile] = useState({
        nombre_cliente: '',
        apellido_cliente: '',
        dui_cliente: '',
        correo_cliente: '',
        telefono_cliente: '',
        nacimiento_cliente: '',
        direccion_cliente: ''
    });
    // Estado para mostrar u ocultar el modal de actualización de contraseña
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // URL de la API de usuarios
    const USER_API = 'services/public/clientes.php';

    // Función para obtener los datos del perfil desde la API
    const fetchProfileData = async () => {
        try {
            const data = await fetchData(USER_API, 'readProfile');
            console.log('Profile data:', data);

            if (data.status === 1 && data.dataset) {
                setProfile(data.dataset);
                setPicture(data.dataset.imagen_cliente);
                setName(data.dataset.nombre_cliente);
                //Controla el icono de carga de esta pantalla
                setLoading(false);
                //Controla la pantalla de carga general
                setLoad(false);
            } else {
                console.log('No se encontraron datos del perfil');
            }
        } catch (error) {
            console.error('Error al obtener los datos del perfil:', error);
        }
    };

    // Hook para ejecutar la función cuando la pantalla recibe foco
    useFocusEffect(
        React.useCallback(() => {
            fetchProfileData();
        }, [])
    );

    // Variables de navegación y ruta
    const navigation = useNavigation();
    const route = useRoute();
    const { updated } = route.params || {};

    // Hook para recargar los datos del perfil si se ha actualizado
    useEffect(() => {
        if (updated) {
            fetchProfileData();
        }
    }, [updated]);

    // Funciones de navegación a otras pantallas
    const goToEditar = () => {
        navigation.navigate('StackNavigator', {
            screen: 'EditProfileScreen'
        });
    };

    const goToHistorial = () => {
        navigation.navigate('StackNavigator', {
            screen: 'History'
        });
    };

    // Renderizado del componente
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loading ? (
                    <View style={styles.loading}>
                        <LoadingDots
                            animation="typing"
                            color="#EE964B"
                            containerStyle={{ backgroundColor: '#FAF0CA', padding: 18, borderRadius: 10 }}
                        />
                        <Text style={styles.loadingText}>Cargando...</Text>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <IconButton icon="history" size={35} onPress={goToHistorial} />
                        </View>
                        <View style={styles.col}>
                            <Image style={styles.img} source={{ uri: `${SERVER_URL}images/clientes/${profile.imagen_cliente}` }} />
                            <View style={styles.inputBox}>
                                <View style={styles.input}>
                                    <Text style={styles.inputText}>Nombre</Text>
                                    <TextInput
                                        activeOutlineColor="#c5c4c2"
                                        textContentType="givenName"
                                        mode="outlined"
                                        outlineColor="#EDEDED"
                                        style={styles.textInput}
                                        left={<TextInput.Icon icon="account" />}
                                        value={profile.nombre_cliente}
                                        editable={false}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <Text style={styles.inputText}>Apellido</Text>
                                    <TextInput
                                        activeOutlineColor="#c5c4c2"
                                        textContentType="familyName"
                                        mode="outlined"
                                        outlineColor="#EDEDED"
                                        style={styles.textInput}
                                        left={<TextInput.Icon icon="account-plus" />}
                                        value={profile.apellido_cliente}
                                        editable={false}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <Text style={styles.inputText}>DUI</Text>
                                    <TextInput
                                        activeOutlineColor="#c5c4c2"
                                        placeholder="00000000-0"
                                        mode="outlined"
                                        outlineColor="#EDEDED"
                                        style={styles.textInput}
                                        left={<TextInput.Icon icon="card-account-details-outline" />}
                                        render={(props) => (
                                            <TextInputMask
                                                {...props}
                                                type="custom"
                                                options={{ mask: '99999999-9' }}
                                                value={profile.dui_cliente}
                                                editable={false}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <Text style={styles.inputText}>Correo electrónico</Text>
                                    <TextInput
                                        activeOutlineColor="#c5c4c2"
                                        textContentType="emailAddress"
                                        mode="outlined"
                                        outlineColor="#EDEDED"
                                        style={styles.textInput}
                                        left={<TextInput.Icon icon="email" />}
                                        value={profile.correo_cliente}
                                        editable={false}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <Text style={styles.inputText}>Teléfono</Text>
                                    <TextInput
                                        activeOutlineColor="#c5c4c2"
                                        textContentType="telephoneNumber"
                                        mode="outlined"
                                        placeholder="0000-0000"
                                        outlineColor="#EDEDED"
                                        style={styles.textInput}
                                        left={<TextInput.Icon icon="phone-outline" />}
                                        render={(props) => (
                                            <TextInputMask
                                                {...props}
                                                type="custom"
                                                options={{ mask: '9999-9999' }}
                                                value={profile.telefono_cliente}
                                                editable={false}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <Text style={styles.inputText}>Fecha de nacimiento</Text>
                                    <TextInput
                                        activeOutlineColor="#c5c4c2"
                                        textContentType="birthday"
                                        mode="outlined"
                                        outlineColor="#EDEDED"
                                        style={[styles.textInput, { flex: 1 }]}
                                        left={<TextInput.Icon icon="calendar-month" />}
                                        value={profile.nacimiento_cliente}
                                        editable={false}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <Text style={styles.inputText}>Dirección</Text>
                                    <TextInput
                                        activeOutlineColor="#c5c4c2"
                                        textContentType="fullStreetAddress"
                                        mode="outlined"
                                        outlineColor="#EDEDED"
                                        style={styles.textInput}
                                        left={<TextInput.Icon icon="compass-outline" />}
                                        value={profile.direccion_cliente}
                                        editable={false}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <CustomButton title="Editar" colorText="white" buttonColor="#EE964B" fontSize={16} buttonMargin={10} onPress={goToEditar} />
                                    <CustomButton title="Actualizar contraseña" colorText="white" buttonColor="#F95738" fontSize={16} onPress={() => setShowPasswordModal(true)} />
                                </View>
                                <View style={styles.input}></View>
                            </View>
                        </View>
                    </View>
                )}
                <UpdatePasswordModal visible={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
            </ScrollView>
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
        borderRadius: 100
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
        backgroundColor: '#EDEDED'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
});

export default ProfileScreen;
