import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import fetchData from '../../api/components';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { SERVER_URL } from "../../api/components";

const OrderDetailsModal = ({ visible, onClose, order }) => {
    const [items, setItems] = useState([]);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const USER_API = 'services/public/clientes.php';

    useEffect(() => {
        if (visible) {
            loadProducts();
            loadProfile();
        }
    }, [visible]);

    const loadProducts = async () => {
        try {
            const form = new FormData();
            form.append('id_pedido', order.id_pedido);

            const data = await fetchData(USER_API, 'readOne', form);

            console.log(data, 'valor data');
            if (data.status) {
                setItems(data.dataset); // Asume que la respuesta contiene una propiedad "dataset"
            } else {
                console.log('No se pudieron cargar los productos.');
            }
        } catch (error) {
            console.log('Fetch error:', error);
            setError(error.message);
        }
    };

    const loadProfile = async () => {
        try {
            const form = new FormData();
            form.append('id_pedido', order.id_pedido);

            const data = await fetchData(USER_API, 'readTwo', form);

            console.log(data, 'valor data');
            if (data.status) {
                setProfile(data.dataset[0]); // Asume que la respuesta contiene una propiedad "dataset" con el primer objeto como perfil
            } else {
                console.log('No se pudo cargar el perfil del cliente.');
            }
        } catch (error) {
            console.log('Fetch error:', error);
            setError(error.message);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemCard}>
            <Image source={{ uri: `${SERVER_URL}images/productos/${item.imagen_producto}` }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.nombre_producto}</Text>
                <Text style={styles.itemSubtitle}>{item.nombre_marca}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.precio}</Text>
        </View>
    );

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Información del pedido</Text>
                    </View>
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                    {profile && (
                        <View style={styles.orderDetails}>
                            <View style={styles.orderDetailRow}>
                                <Text style={styles.orderDetailLabel}>Nombre:</Text>
                                <Text style={styles.orderDetailValue}>{profile.nombre_cliente}</Text>
                            </View>
                            <View style={styles.orderDetailRow}>
                                <Text style={styles.orderDetailLabel}>Dirección:</Text>
                                <Text style={styles.orderDetailValue}>{profile.direccion}</Text>
                            </View>
                            <View style={styles.orderDetailRow}>
                                <Text style={styles.orderDetailLabel}>Estado:</Text>
                                <Text style={styles.orderDetailValue}>{profile.estado}</Text>
                            </View>
                            <View style={styles.orderDetailRow}>
                                <Text style={styles.orderDetailLabel}>Total a pagar:</Text>
                                <Text style={styles.orderDetailValue}>{profile.precio_total}</Text>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    header: {
        backgroundColor: '#FFA500',
        padding: 15,
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 20,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    orderDetails: {
        padding: 20,
    },
    orderDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    orderDetailLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    orderDetailValue: {
        fontSize: 14,
        width: 180
    },
    closeButton: {
        backgroundColor: '#FFA500',
        padding: 15,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        padding: 10,
        backgroundColor: '#f8d7da',
        borderRadius: 8,
        marginBottom: 10,
    },
    errorText: {
        color: '#721c24',
        fontSize: 14,
    },
});

export default OrderDetailsModal;
