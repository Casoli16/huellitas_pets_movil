import {View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Fonts from "../../fonts/fonts";
import {Searchbar} from "react-native-paper";
import {useState} from "react";

// Obtiene el tamaño de la pantalla en la que este.
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({logueado, setLogueado}) => {
    Fonts();

    //Para manejar el search input
    const [search, setSearch] = useState('');

    return(
        <ScrollView>
            <View style={styles.container}>
                <LinearGradient style={styles.linearGradient} colors={['#EE964B', '#88562B' ]}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.name}>¡Hola Susan!</Text>
                            <Text style={styles.subTitle}>Es un gusto tenerte de vuelta, descubre los productos más vendidos</Text>
                        </View>
                        <Image source={require('../../assets/shopImages/boxCat.png')}/>
                    </View>
                </LinearGradient>
                <View style={styles.row}>
                    <View>
                        <Image style={styles.img} source={require('../../assets/shopImages/pets4.png')}/>
                        <Image style={styles.img} source={require('../../assets/shopImages/pets.jpg')}/>
                    </View>
                    <View style={styles.col2}>
                        <Text style={styles.textPets}>Mascotas:</Text>
                        <Text style={styles.subtitlePets}>Elige los productos para tú mascota</Text>
                        <TouchableOpacity style={styles.contentPet1}>
                            <Image style={styles.img1} source={require('../../assets/shopImages/pet1.png')}/>
                            <Text style={styles.textPets2}>Perros</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contentPet2}>
                            <Image style={styles.img2} source={require('../../assets/shopImages/pet2.png')}/>
                            <Text style={styles.textPets2}>Perros</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Searchbar
                    style={{marginVertical: 15, backgroundColor:'#e4e2e2'}}
                    placeholder="Buscar productos"
                    onChangeText={''}
                    value={''}
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: windowWidth * 0.03,
        marginBottom: windowHeight * 0.07,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    col: {
        width: windowWidth * 0.6,
        padding: 20,
        marginStart: 20
    },
    col2: {
       width: windowWidth * 0.4,
        paddingHorizontal: 10
    },
    linearGradient: {
        borderRadius: 10,
        marginVertical: 20
    },
    name: {
        fontFamily: 'Jost_700Bold',
        fontSize: 25,
        color: 'white'
    },
    subTitle: {
        fontFamily: 'Jost_400Regular',
        fontSize: 14,
        color: 'white'
    },
    img: {
        resizeMode: "stretch",
        width: 180,
        height: 168,
        borderRadius: 20,
        marginVertical: 5
    },
    textPets: {
        color: '#482F24',
        fontFamily: 'Jost_700Bold',
        fontSize: 20
    },
    subtitlePets: {
        fontFamily: 'Jost_400Regular',
        fontSize: 14,
        marginVertical: 5
    },
    img1: {
        width: 80,
        height: 80,
        borderRadius: 100/2
    },
    img2: {
        width: 80,
        height: 80,
        borderRadius: 100/2
    },
    contentPet2: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#F4D35E',
        borderRadius: 10,
        padding: 10
    },
    contentPet1: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#EE964B',
        marginVertical: 10,
        borderRadius: 10,
        padding: 10
    },
    textPets2: {
        fontFamily: 'Jost_400Regular',
        fontSize: 15,
        marginTop: 5
    }
})
export default HomeScreen;