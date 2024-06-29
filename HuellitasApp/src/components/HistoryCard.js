import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import icon from '../../assets/historialCompra.png'; // Asegúrate de usar la ruta correcta

const data = [
  {
    date: '13 de enero, 2024',
    items: [
      { title: 'Estado del pedido: Completado', quantity: 115, price: 40 },
      { title: 'Bolsa pedigree - Perro mayor', quantity: 2, price: 40, unitPrice: 20 },
    ],
  },
  {
    date: '14 de enero, 2024',
    items: [
      { title: 'Bolsa pedigree - Perro mayor', quantity: 2, price: 40, unitPrice: 20 },
      { title: 'Bolsa pedigree - Perro mayor', quantity: 2, price: 40, unitPrice: 20 },
    ],
  },
  {
    date: '15 de enero, 2024',
    items: [
      { title: 'Bolsa pedigree - Perro mayor', quantity: 2, price: 40, unitPrice: 20 },
      { title: 'Bolsa pedigree - Perro mayor', quantity: 2, price: 40, unitPrice: 20 },
    ],
  },
];

const HistoryCard = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => (
        <View style={styles.section}>
          <Text style={styles.date}>{item.date}</Text>
          {item.items.map((entry, index) => (
            <View key={index} style={styles.card}>
              <Image source={icon} style={styles.icon} />
              <View style={styles.details}>
                <Text style={styles.title}>{entry.title}</Text>
                <Text style={styles.subtext}>
                  Cantidad: {entry.quantity} Unidades{' '}
                  {entry.unitPrice ? `Precio Individual: $${entry.unitPrice}.00` : ''}
                </Text>
              </View>
              <Text style={styles.price}>${entry.price}.00</Text>
            </View>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 16,
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
});

export default HistoryCard;
