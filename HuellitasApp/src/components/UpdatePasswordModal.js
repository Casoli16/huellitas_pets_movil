import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomButton from '../components/CustomeButton';
import fetchData from '../../api/components';

const UpdatePasswordModal = ({ visible, onClose }) => {
    const [pass, setPass] = useState('');
    const [newpass, setNewPass] = useState('');
    const [newPassCheck, setNewPassCheck] = useState('');

    const USER_API = 'services/public/clientes.php';

    const handleUpdatePassword = async () => {
        try {
            const form = new FormData();
            form.append('claveActual', pass);
            form.append('claveNueva', newpass);
            form.append('ConfirmarClave', newPassCheck);

            const data = await fetchData(USER_API, 'changePassword', form);

            if(data.status){
                console.log('Tu constraseña se ha cambiado exitosamente');
                onClose();
            } else {
                console.log('Sorry');
            }
        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Actualizar Contraseña</Text>
                    <TextInput
                        label="Contraseña Actual"
                        value={pass}
                        onChangeText={setPass}
                        secureTextEntry
                        style={styles.input}
                    />
                    <TextInput
                        label="Nueva Contraseña"
                        value={newpass}
                        onChangeText={setNewPass}
                        secureTextEntry
                        style={styles.input}
                    />
                    <TextInput
                        label="Confirmar Nueva Contraseña"
                        value={newPassCheck}
                        onChangeText={setNewPassCheck}
                        secureTextEntry
                        style={styles.input}
                    />
                    <CustomButton
                        title="Actualizar"
                        colorText="white"
                        buttonColor="#EE964B"
                        onPress={handleUpdatePassword}
                    />
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancel}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 15,
    },
    cancel: {
        marginTop: 10,
        color: '#EE964B',
        fontWeight: 'bold',
    },
});

export default UpdatePasswordModal;