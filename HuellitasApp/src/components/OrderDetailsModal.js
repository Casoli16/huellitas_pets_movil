import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import fetchData from '../../api/components';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

const OrderDetailsModal = ({ visible, onClose, order }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const USER_API = 'services/public/clientes.php';

    useEffect(() => {
        if (visible) {
            loadProducts();
        }
    }, [visible]);

    const loadProducts = async () => {
        try {
            console.log('ID del pedido:', order.id_pedido); // Imprime el ID del pedido en la consola

            const form = new FormData();
            form.append('id_pedido', order.id_pedido);

            const response = await fetchData(USER_API, 'readTwo', form);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const data = await response.json();
            console.log(data, 'valor data');
            if (data.status) {
                setItems(data.items); // Asume que la respuesta contiene una propiedad "items"
            } else {
                console.log('No se pudieron cargar los productos.');
            }
        } catch (error) {
            console.log('Fetch error:', error);
            setError(error.message);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>{item.description}</Text>
            </View>
            <Text style={styles.itemPrice}>${item.price ? item.price : 'N/A'}</Text>
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
                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>Error: {error}</Text>
                        </View>
                    )}
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                    <View style={styles.orderDetails}>
                        <View style={styles.orderDetailRow}>
                            <Text style={styles.orderDetailLabel}>Nombre:</Text>
                            <Text style={styles.orderDetailValue}>{order.cliente}</Text>
                        </View>
                        <View style={styles.orderDetailRow}>
                            <Text style={styles.orderDetailLabel}>Dirección:</Text>
                            <Text style={styles.orderDetailValue}>{order.address}</Text>
                        </View>
                        <View style={styles.orderDetailRow}>
                            <Text style={styles.orderDetailLabel}>Estado:</Text>
                            <Text style={styles.orderDetailValue}>{order.estado_pedido}</Text>
                        </View>
                        <View style={styles.orderDetailRow}>
                            <Text style={styles.orderDetailLabel}>Total a pagar:</Text>
                            <Text style={styles.orderDetailValue}>${order.precio_total}</Text>
                        </View>
                    </View>
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
