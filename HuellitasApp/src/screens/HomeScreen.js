import {View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Fonts from "../../fonts/fonts";
import {Searchbar} from "react-native-paper";
import {useEffect, useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import ProductsCards from "../components/ShopComponents/ProductsCards";

// Obtiene el tamaño de la pantalla en la que este.
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({logueado, setLogueado, name}) => {
    Fonts();

    const firstName = name.split(" ")[0];

    //Usamos la navegacion que se ha creado - ver archivo navigation/StackNavigator.
    const navigation = useNavigation();
    //Para el manejo de la posicion inicial del scroll
    const scrollViewRef = useRef(null);
    //Para manejar el search input
    const [search, setSearch] = useState('');

    //Creamos una funcion que nos diriga para la pantalla que queremos y mandamos como parametro
    // el tipo de mascota seleccionada.
    const goToProducts = (pet) => {

        //Identificamos a la pantalla con el name que se le puso en el StackNavigator.
        navigation.navigate('Shop', {
            pet: pet
        });
    };

    useEffect(() => {
        //MANEJO DE SCROLL (Para que cuando se vuelva a ver la pantalla, vuelva al inicio)
        //Funcion que manda al scroll a su posicion inicial
        const scrollToTop = () => {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }

        //Evento que se activa cuando se abre la pantalla de HomeScreen(Esta pantalla)
        navigation.addListener('focus', scrollToTop);

    }, [navigation]); // Le pasamos la navegacion para que pueda identificar los cambios de pantalla


    return(
        <ScrollView ref={scrollViewRef}>
            <View style={styles.container}>
                <LinearGradient style={styles.linearGradient} colors={['#EE964B', '#88562B' ]}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.name}>¡Hola {firstName}!</Text>
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
                        <TouchableOpacity style={styles.contentPet1} onPress={()=>goToProducts('Gatos')}>
                            <Image style={styles.img1} source={require('../../assets/shopImages/pet1.png')}/>
                            <Text style={styles.textPets2}>Gatos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contentPet2} onPress={()=>goToProducts('Perros')}>
                            <Image style={styles.img2} source={require('../../assets/shopImages/pet2.png')}/>
                            <Text style={styles.textPets2}>Perros</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.titleProducts}>Los productos más vendidos</Text>
                <Searchbar
                    style={{marginTop: 15, backgroundColor:'#f4f2f2', marginHorizontal: 10}}
                    placeholder="Buscar productos"
                    onChangeText={setSearch}
                    value={search}
                />

                <ProductsCards search={search}/>

            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginHorizontal: 2,
        marginBottom: windowHeight * 0.01,
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
        marginVertical: 20,
        marginHorizontal: 10
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
    },
    titleProducts: {
        fontFamily: 'Jost_700Bold',
        fontSize: 20,
        marginTop: 15,
        marginHorizontal: 15
    }
})
export default HomeScreen;