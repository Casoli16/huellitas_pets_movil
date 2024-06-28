import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, colorText, fontSize, buttonColor, buttonMargin}) => {

    return (
        <TouchableOpacity style={{backgroundColor: buttonColor, padding: 13, borderRadius: 10, marginEnd: buttonMargin}} onPress={onPress}>
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