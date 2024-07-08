import * as React from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modal, PaperProvider, Portal, TextInput} from "react-native-paper";
import {useEffect, useState} from "react";
import fetchData from "../../api/components";
import CustomButton from "../components/CustomeButton";
import {useNavigation} from "@react-navigation/native";
import Fonts from "../../fonts/fonts";
import {DialogNotification, ToastNotification} from "../components/Alerts/AlertComponent";
import {AlertNotificationRoot} from "react-native-alert-notification";

// Obtiene el tamaño de la pantalla en la que este.
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const DeliveryScreen1 = ()=>{
    Fonts();

    //Api
    const API = 'services/public/pedidos.php';
    //Declaracion de variables para la dirección actual y nueva dirección
    const [address, setAddress] = useState("");
    const [newAddress, setNewAddress] = useState("")
    //Ocupamos la navegacion
    const navigation = useNavigation();

    //Variables para el manejo de los modals
    const [visible, setVisible] = React.useState(false);
    const hideModal = () => setVisible(false);
    const showModal = () => setVisible(true);

    //Peticion a la api para traernos la direccion actual del usuario
    const getAddress = async ()=> {
        const DATA = await fetchData(API, 'readDetail');
        if (DATA.status){
          let address = DATA.dataset[0].direccion_pedido;
          setAddress(address)
        }
    }

    //Cuando se cargue la pantalla de llama a la funcion para traernos la direccion actual
    useEffect(() => {
        getAddress()
    }, []);

    //Funcion que permite la actualizacion de la direccion cuando el cliente lo requiera
    const updateAddress = async () => {
        const form = new FormData();
        form.append('direccion', newAddress);

        const data = await fetchData(API, 'updateAddress', form);

        if(data.status){
            ToastNotification(1, data.message, true);
            await getAddress();
            setVisible(false);
        } else{
            ToastNotification(3, data.error, true);
        }
    }

    //Mensaje de confirmacion antes de finalizar un pedido.
    const confirmMessage = () => {
        DialogNotification(3, '¿Estás seguro de finalizar tú pedido?', 'Sí', ()=> {finishOrder()});
    }

    //Funcion que permite finalizar un pedido.
    const finishOrder = async () => {
        const data = await fetchData(API, 'finishOrder');
        if(data.status){
            DialogNotification(1, data.message);
            setTimeout(() => {
                navigation.navigate('Delivery2');
            }, 2000);
        }
    }

    return(
        <AlertNotificationRoot>
            <PaperProvider style={styles.container}>
                {/*MODAL*/}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                        <View style={styles.row2}>
                            <Icon name="map-marker-plus" size={30} color={'#EE964B'}/>
                            <Text style={styles.titleModal}>Agrega tú nueva dirección</Text>
                        </View>
                        <TextInput
                            mode="flat"
                            textColor={'black'}
                            placeholder='Escribe tu nueva dirección'
                            activeOutlineColor={'#c5c2c2'}
                            outlineColor={'#fff'}
                            style={styles.input}
                            value={newAddress}
                            onChangeText={setNewAddress}
                            multiline={true}
                            numberOfLines={4}
                        />
                        <CustomButton title='Actualizar dirección' buttonColor={'#F95738'} colorText={'white'} fontSize={16} onPress={()=>{updateAddress()}}/>
                    </Modal>
                </Portal>
                <View style={styles.box}>
                    <View style={styles.col}>
                        <Image source={require('../../assets/motorcycle.png')} style={{width: 140, height: 140}}/>
                        <Text style={styles.title}>¡Tu pedido esta casi listo!</Text>
                    </View>
                    <Text style={styles.text}>Esta es la dirección que se encuentra registrada a tu cuenta</Text>
                    <TextInput
                        mode="flat"
                        disabled={true}
                        textColor={'black'}
                        value={address}
                        onChangeText={setAddress}
                        multiline={true}
                        numberOfLines={4}
                    />
                    <View style={styles.row}>
                        <Icon name="map-marker-radius" size={30} color={'#EBC351'}/>
                        <Text onPress={showModal} style={styles.newAddress}>¿Tienes una nueva dirección, no se encuentra tú dirección? Haz clíc aquí</Text>
                    </View>
                </View>
                <View style={styles.spacer}></View>
                <View style={styles.totalBox}>
                    <CustomButton title='Finalizar pedido' buttonColor='#EE964B' fontSize={18} colorText='white' onPress={()=>{confirmMessage()}}/>
                </View>
            </PaperProvider>
        </AlertNotificationRoot>
    )
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: 'white',
   },
   col: {
       flexDirection: "column",
       alignItems: "center",
   },
   box: {
       marginTop: 30,
       marginHorizontal: windowWidth * 0.06
   },
   row: {
       flexDirection: "row",
       alignItems: "center",
       gap: 5,
       justifyContent: "flex-start",
       width: windowWidth * 0.8
   },
   title: {
       fontFamily: 'Jost_500Medium',
       fontSize: 20,
       marginTop: 10,
       marginBottom: 30,
   },
   text: {
       marginVertical: 10,
       fontFamily: 'Jost_500Medium',
       fontSize: 15
   },
   newAddress: {
       marginVertical: 10,
       fontFamily: 'Jost_400Regular',
       textDecorationLine: "underline"
   },
   input: {
     backgroundColor: '#f3eeee',
       marginBottom: 30
   },
   // BOTON
   spacer: {
       flex: 1
    },
   totalBox: {
       height: 90,
       paddingHorizontal: 25,
    },
    //MODAL
    modal: {
       backgroundColor: 'white',
       padding: 20,
       margin: 20,
        borderRadius: 10
    },
    titleModal: {
       fontFamily: 'Jost_500Medium',
        textAlign: "center",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 15
    },
    row2:{
       flexDirection: "row",
        alignItems: "center",
        gap: 8
    }
});
export default DeliveryScreen1;