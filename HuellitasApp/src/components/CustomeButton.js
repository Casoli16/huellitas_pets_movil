import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, colorText, fontSize, buttonColor}) => {

    return (
        <TouchableOpacity style={{backgroundColor: buttonColor, padding: 15, borderRadius: 10}} onPress={onPress}>
            <Text style={{
                fontFamily: 'Jost_500Medium',
                textAlign: 'center',
                color: colorText,
                fontSize: fontSize}}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;