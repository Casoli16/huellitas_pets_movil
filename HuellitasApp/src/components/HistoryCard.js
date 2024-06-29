import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import icon from '../../assets/historialCompra.png'; // Asegúrate de usar la ruta correcta
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import fetchData from '../../api/components';

const HistoryCard = () => {
    const [history, setHistory] = useState([]);

    const fetchProfileData = async () => {
        const USER_API = 'services/public/clientes.php';
        try {
            const response = await fetchData(USER_API, 'readHistorial');
            console.log('Historial de compras:', response);

            if (response && response.status === 1 && response.dataset) {
                setHistory(response.dataset);
            } else {
                console.log('No se encontraron datos de historial de compras');
            }
        } catch (error) {
            console.error('Error al obtener el historial de compras:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchProfileData();
        }, [])
    );

    const navigation = useNavigation();
    const route = useRoute();
    const { updated } = route.params || {};

    useEffect(() => {
        if (updated) {
            fetchProfileData();
        }
    }, [updated]);

    return (
        <View style={styles.container}>
            <FlatList
                data={history}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.section}>
                        <Text style={styles.date}>{item.fecha}</Text>
                        <View style={styles.card}>
                            <Image source={icon} style={styles.icon} />
                            <View style={styles.details}>
                                <Text style={styles.title}>{item.estado_pedido}</Text>
                                <Text style={styles.subtext}>
                                    Cantidad: {item.cantidad} Unidades
                                </Text>
                            </View>
                            <Text style={styles.price}>${item.precio_total}</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginTop: 25,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 8,
        marginHorizontal: 16,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 16,
        marginTop: 8,
    },
});

export default HistoryCard;
