import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from "react-native";
import PurchaseCard from '../components/HistoryCard';

const History = () => {
  return (
    <View style={styles.container}>
        <PurchaseCard />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    }
});

export default History;
