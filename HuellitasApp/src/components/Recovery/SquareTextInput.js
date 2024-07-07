import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SquareTextInput = ({ value, onChangeText }) => {
    return (
        <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            keyboardType='text'
            maxLength={1}
        />
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: 50,
        height: 50,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 4,
        borderBottomColor: '#ccc',
        elevation: 5,
    },
});

export default SquareTextInput;
