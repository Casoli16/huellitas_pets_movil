import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import {StyleSheet} from "react-native";

//Funcion para mostrar mensajes en toast, recibe como parametros el tipo de mensaje (Error, advertencia o exito), el mensaje del toast y si se cierra automatico
//o no
export const ToastNotification = (type, message, autoClose) => {

    let action;
    let text;
    let title;
    let style;
    let boolean;

    //Evaluamos el tipo de mensaje que se recibio
    switch (type){
        //Mensaje de exito
        case 1:
            action = ALERT_TYPE.SUCCESS;
            text = message;
            title = 'Éxito';
            style = styles.text1;
            boolean = autoClose;
            break;
        //Mensaje de error
        case 2:
            action = ALERT_TYPE.DANGER;
            text = message;
            title = 'Error';
            style = styles.text2;
            boolean = autoClose;
            break;
        //Mensaje de advertencia
        case 3:
            action = ALERT_TYPE.WARNING;
            text = message;
            title = 'Advertencia';
            style = styles.text3;
            boolean = autoClose;
            break;
        default:
            console.log('La opción seleccionada no existe');
    }

    //Mostramos nuestro toast con los parametros recibidos.
        Toast.show({
            type: action,
            autoClose: boolean,
            titleStyle: style,
            title: title,
            textBody: text,
        });
}

//Funcion para mostrar cajas de dialogo, esta recibe el tipo del mensaje (Error, advertencia y exito), el mensaje que se mostrara y el texto del boton
export const DialogNotification = (type, message, button, functions) => {

    let action;
    let text;
    let title;
    let buttonText;
    let onPress;

    //Evaluamos el tipo de mensaje que se recibio
    switch (type){
        //Mensaje de exito
        case 1:
            action = ALERT_TYPE.SUCCESS;
            text = message;
            title = 'Éxito';
            buttonText = button;
            onPress = functions;
            break;
        //Mensaje de error
        case 2:
            action = ALERT_TYPE.DANGER;
            text = message;
            title = 'Error';
            buttonText = button;
            break;
        //Mensaje de advertencia
        case 3:
            action = ALERT_TYPE.WARNING;
            text = message;
            title = 'Advertencia';
            buttonText = button;
            onPress = functions;
            break;
        default:
            console.log('La opción seleccionada no existe');
    }

    //Mostramos nuestro toast con los parametros recibidos.
    Dialog.show({
        type: action,
        title: title,
        textBody: text,
        button: buttonText,
        onPressButton: onPress
    });
}

const styles = StyleSheet.create({
    text1: {
        color: '#3fa604'
    },
    text2: {
        color: '#d82828'
    },
    text3: {
        color: '#cfa703'
    }
})