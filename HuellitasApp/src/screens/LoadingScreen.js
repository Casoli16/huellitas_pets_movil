import {View, Text, StyleSheet} from "react-native";
import React from 'react';
import LottieView from 'lottie-react-native';
import Fonts from "../../fonts/fonts";

const LoadingScreen = ()=> {
    Fonts();

    return(
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/wired-flat-1160-cat-head.json')}
                autoPlay
                loop
                style={styles.lottie}
            />
            <Text style={styles.loadingText}>Cargando...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF0CA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 50,
    },
    lottie: {
        width: 150,
        height: 200,
    },
    loadingText: {
        backgroundColor: '#f4d86f',
        padding: 10,
        borderRadius: 10,
        marginTop: -30,
        fontSize: 18,
        color: '#482F24',
        fontFamily: 'Jost_500Medium',
    }
});

export default LoadingScreen;