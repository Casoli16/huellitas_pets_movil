import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from "@react-navigation/native";

const OrderDetailsModal = ({ visible, onClose, order }) => {
    if (!order) {
        return null;
    }

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
                    <View style={styles.content}>
                        {order.items && order.items.map((item, index) => (
                            <View key={index} style={styles.itemCard}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemTitle}>{item.name}</Text>
                                    <Text style={styles.itemSubtitle}>{item.description}</Text>
                                </View>
                                <Text style={styles.itemPrice}>${item.price}</Text>
                            </View>
                        ))}
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
                                <Text style={styles.orderDetailValue}>${order.total}</Text>
                                <Text>idPedido: {order.id_pedido}</Text>
                            </View>
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
        width: '80%',
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
    content: {
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
    },
    orderDetails: {
        marginTop: 20,
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
});

export default OrderDetailsModal;
