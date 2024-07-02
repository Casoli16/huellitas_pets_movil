import {Button, Card} from "react-native-paper";
import {Image, View, StyleSheet, Text, Dimensions, ScrollView} from "react-native";
import Fonts from "../../../fonts/fonts";
//Importamos la funcion fecthData, asi como tambien la variable SERVER_URL
import fetchData, {SERVER_URL} from "../../../api/components";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";

// Obtiene el tamaño de la pantalla en la que este.
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ProductsCards =  ({pet, search, category}) => {
    Fonts();

    console.log(pet, category)
    //Arreglo que guardara la data traida de nuestra api
    const [products, setProducts] = useState([]);
    const API = 'services/public/productos.php';
    //Usamos la navegacion que se ha creado - ver archivo navigation/StackNavigator.
    const navigation = useNavigation();

    //En este caso, como esta pantalla se encuentra en el tabBar y no en el stackNavigator, no vamos a poder dirigirnos a la pantalla de productDetails
    //directamente, para ello primero vamos a entrar al name: StackNavigator(Ubicado en el TabBar) y luego que entramos al StackNavigator
    //ahora si nos vamos a la pantalla de productsDetails.
    const goToProductsDetails = (idProducto) => {

        navigation.navigate('StackNavigator', {
            screen: 'productsDetails',
            params: {idProducto}
        });
    }

    //Funcion que permite mostrar los productos.
    const fillCards = async ()=> {
        let action;
        let FORM = new FormData();
        console.log(category)

        //Verifica si viene search, de ser asi, entonces enviara en el form lo que venga, pero si en cambio viene pet entonces
        //se trae todos los productos filtrados por su mascota, pero si no viene nada entonces cae en else y trae todos los productos
        if(search){
            FORM.append('search', search);
            action = 'searchProducts';
        }else if (pet && category) {
            FORM.append('mascota', pet);
            FORM.append('condition', category);
            action = 'readProductsByCategoria';
        } else if(pet){
            FORM.append('mascota', pet);
            action = 'readSpecificProduct';
        } else{
            action = 'readAllProducts';
            FORM = null
        }

        const DATA = await fetchData(API, action, FORM);

        if(DATA.status){
            let data = DATA.dataset;
            //Se guarda la data de la api en la variable products.
            setProducts(data);
        } else{
            console.log(DATA.error)
        }
    }

    //Permite ejecutar la funcion fillCards cada vez que se cargue la pantalla, asi como tambien
    //cuando los valores de pet y search cambien.
    useEffect(()=>{
        fillCards();
    },[pet, search, category])

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                {products.map((products, index) => (
                    <Card key={index} mode={"elevated"} contentStyle={styles.card} onPress={() => {goToProductsDetails(products.id_producto)}}>
                        <Image source={{uri:`${SERVER_URL}images/productos/${products.imagen_producto}`}} style={{width: 140, height: 140}} />
                        <View style={styles.contentCard}>
                            <Text style={styles.productName}>{products.nombre_producto}</Text>
                            <Text style={styles.marca}>{products.nombre_marca}</Text>
                            <Text style={styles.price}>${products.precio_producto}</Text>
                            <View style={styles.containerButton}>
                                <Card style={styles.button}>
                                    <Text style={styles.buttonText}>+</Text>
                                </Card>
                            </View>
                        </View>
                    </Card>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: windowWidth * 0.015,
        marginVertical: 20,
        marginBottom: windowHeight * 0.05
    },
    row: {
        flexDirection: "row",
        alignContent: "flex-start",
        justifyContent: "center",
        gap: 20,
        flexWrap: "wrap",
    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    contentCard: {
        width: 140
    },
    price: {
        fontSize: 18,
        fontFamily: 'Jost_600SemiBold',
        color: '#7C7878'
    },
    productName: {
        fontFamily: 'Jost_500Medium',
        marginTop: 8,
        fontSize: 16
    },
    marca: {
        fontFamily: 'Jost_300Light',
        fontSize: 15,
        marginBottom: 10
    },
    // BUTTON
    button: {
        width: 35,
        height: 35,
        backgroundColor: '#EE964B',
        borderRadius: 100,
    },
    containerButton: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    buttonText: {
        textAlign: "center",
        color: 'white',
        fontSize: 25
    }
});

export default ProductsCards;