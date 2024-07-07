import {View, Text, StyleSheet} from "react-native";
import React from 'react';
import LottieView from 'lottie-react-native';
import Fonts from "../../fonts/fonts";

const LoadingScreen = ()=> {
    // Cargamos las fuentes tipograficas
    Fonts();

    return(
        <View style={styles.container}>
            {/*Cargamos la animacion*/}
            <LottieView
                source={require('../../assets/animation/wired-flat-1160-cat-head.json')}
                autoPlay
                loop
                style={styles.lottie}
            />
            <LottieView
                source={require('../../assets/animation/loading.json')}
                autoPlay
                loop
                style={styles.lottie2}
            />
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
    lottie: {
        width: 150,
        height: 200,
    },
    lottie2: {
        marginTop: -60,
        width: 150,
        height: 150,
    },
    loadingText: {
        backgroundColor: '#f4d86f',
        padding: 10,
        borderRadius: 10,
        marginTop: -30,
        fontSize: 18,
        color: '#482F24',
        fontFamily: 'Jost_500Medium',
    },
});

export default LoadingScreen;