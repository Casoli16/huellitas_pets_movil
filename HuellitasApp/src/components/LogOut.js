import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import fetchData from "../../api/components";
import {Alert, Dimensions, StyleSheet, View} from "react-native";
import Fonts from "../../fonts/fonts";
import CustomButton from "./CustomeButton";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";

// Obtiene el ancho y alto de la pantalla en la que se esta cargando la app
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const LogOut = ({logueado, setLogueado}) => {

    //Utilizamos nuestas fuentes.
    Fonts();

    //API
    const API = 'services/public/clientes.php';

    const logOut = async () => {
        const data = await fetchData(API,'logOut');

        if(data.status){
            console.log(data.message);
            setLogueado(false);
        } else {
            console.log(data.error);
        }

    }

    //Manejo del modal
    const [visible, setVisible] = React.useState(true);
    const hideModal = () => setVisible(false);

    return (
        <PaperProvider>
            <Portal>
                <Modal visible={visible} contentContainerStyle={styles.modal} dismissable={false}>
                    <Text style={styles.title}>Cerrar sesión</Text>
                    <Text style={styles.text}>¿Estás seguro que quieres cerrar sesión?</Text>
                    <CustomButton title='Cerrar sesión' buttonColor='orange' colorText='white' fontSize={17} onPress={logOut}/>
                </Modal>
            </Portal>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        padding: 20,
        backgroundColor: 'white',
        marginHorizontal: width * 0.1,
        borderRadius: 10
    },
    title: {
      fontSize: 20,
      fontFamily: 'Jost_700Bold'
    },
    text: {
        fontSize: 16,
        fontFamily: 'Jost_400Regular',
        marginBottom: 15,
        marginTop: 5
    }
})

export default LogOut;