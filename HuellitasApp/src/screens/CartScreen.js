import {View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, ScrollView} from "react-native";
import Fonts from "../../fonts/fonts";
import {Icon, TextInput, Card} from "react-native-paper";
import CustomButton from "../components/CustomeButton";
import fetchData, {SERVER_URL} from "../../api/components";
import {useEffect, useState, useCallback} from "react";
import { Swipeable } from "react-native-gesture-handler";
import {AlertNotificationRoot, Dialog} from "react-native-alert-notification";
import {DialogNotification, ToastNotification} from "../components/Alerts/AlertComponent";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import { LoadingDots } from '@mrakesh0608/react-native-loading-dots';

// Obtiene el tamaño de la pantalla en la que este.
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CartScreen = () => {
    Fonts();

    //Navegacion
    const navigation = useNavigation();

    //Recibir parametros que vienen de la pantalla de ProductsDetails
    const route = useRoute();
    const { state } = route.params || { state: false};

    //Api
    const API = 'services/public/pedidos.php';
    //Arreglo donde se guardara la dataset traida de la api
    const [products, setProducts] = useState([]);
    //Variable que guardara el precio total del pedido
    const [totaPrice, setTotalPrice] = useState(0.0);
    //Variable donde se guardara la respuesta si vienen productos o no.
    const [hasProducts, setHasProducts] = useState(true);
    const [loading, setLoading] = useState(true);
    //Variable que guarda el producto de la cantidad del producto por su precio.
    let subtotal;

    //Función que carga los productos que hay en nuestro carrito
    const fillCards = async () => {
        //Mientras este en true se mostrar el icono de carga
        setLoading(true)
        const DATA = await fetchData(API, 'readDetail');

        if(DATA.status){
            let data = DATA.dataset;
            setProducts(data);
            setHasProducts(true);
            //Cuando ya se haya hecho la peticion dejara de mostrarse el icono de carga
            setLoading(false)
        }else{
            Dialog.hide();
            setProducts([]);
            setHasProducts(false);
            setLoading(false);
        }
    }


    //Es similar a useEffect, pero se ejecuta específicamente cuando la pantalla en la que se encuentra
    // el componente está activa o enfocada, y se limpia cuando la pantalla pierde el enfoque.
    useFocusEffect(
        //Nos permite llamar a la funcion cada vez que state cambia.
        useCallback(() => {
            if(state === true){
                fillCards();
            }
        }, [state])
    );

    //Cuando se carga la pantalla llamamos a la funcion que carga los productos, esto porque el state viene falso
    //entonces no cargaria la funcion, por ello agregamos este useEffect que se ejecuta nomas cargue la pantalla
    useEffect(()=>{
        fillCards()
    }, []);

    //Carga el precio total del pedido calculado y cambia cada que products cambie.
    useEffect( () => {
        //Se utiliza para reducir un array a un solo valor mediante una función de acumulación
        let total = products.reduce((sum, products) => sum + (products.cantidad_detalle_pedido * products.precio_detalle_pedido), 0);
        //Suma todos los subtotales y saca el precio total del pedido
        //Se lo asiganamos a totalPrice
        setTotalPrice(total.toFixed(2));
    }, [products]);

    //Funcion para actualizar la cantidad de un producto.
    const updateProduct = async (idDetallePedido, cantidadProducto) => {
        const FORM = new FormData();
        FORM.append('idDetalle', idDetallePedido)
        FORM.append('cantidadProducto', cantidadProducto)

        const DATA = await fetchData(API, 'updateDetail', FORM);

        if(DATA.status){
            fillCards();
        }else{
            console.log('Ha ocurrido un error')
        }
    }

//Funciones para manejar el aumento y reducción de cantidad en los productos.
    const handleIncrease = async (index) => {
        const newProducts = [...products];
        if(newProducts[index].cantidad_detalle_pedido < (newProducts[index].cantidad_detalle_pedido + newProducts[index].existencia_producto)) {
            newProducts[index].cantidad_detalle_pedido += 1;
            setProducts(newProducts);
        } else{
            ToastNotification(3, 'Sobrepasaste el límite de existencias');
        }

        const updateCount = newProducts[index];
        const {id_detalle_pedido, cantidad_detalle_pedido} = updateCount;
        await updateProduct(id_detalle_pedido, cantidad_detalle_pedido)
    }

    //Reducir productos
    const handleDecrease = async (index) => {
        const newProducts = [...products];
        if (newProducts[index].cantidad_detalle_pedido > 1) {
            newProducts[index].cantidad_detalle_pedido -= 1;
            setProducts(newProducts);
        }
        const updateCount = newProducts[index];
        const {id_detalle_pedido, cantidad_detalle_pedido} = updateCount;
        await updateProduct(id_detalle_pedido, cantidad_detalle_pedido)
    }

    const deleteMessage = async (id) => {
        DialogNotification(
            3, //Tipo de mensaje
            '¿Estás seguro que quieres eliminar este producto de tu carrito de compras?', // Mensaje
            'Sí', // Texto del boton
            ()=>{deleteProduct(id)}); // Funcion que se activara al hacer clic al boton
    }

    //Funcion para eliminar un producto del carrito
    const deleteProduct = async (id)=>{

        const FORM = new  FormData();
        FORM.append('idDetalle', id);

        const DATA = await fetchData(API,'deleteDetail', FORM);
        if(DATA.status){
            await fillCards();
            Dialog.hide();
            ToastNotification(1, 'Producto eliminado correctamente de tu carrito', true)
        } else{
            console.log('Ocurrió un error al eliminar este producto')
        }
    }

    return(
        <AlertNotificationRoot>
            <View style={styles.container}>
                <ScrollView style={{height: windowHeight * 0.5}}>
                    {loading ? (
                        <View style={styles.loading}>
                            <LoadingDots
                                animation={"typing"}
                                color={'#EE964B'}
                                containerStyle={{backgroundColor: '#FAF0CA', padding: 18, borderRadius: 10,}}
                            />
                            <Text style={styles.loadingText}>Cargando...</Text>
                        </View>
                    ): (
                        hasProducts ? (
                                products.map((product, index) => {
                                    const { id_detalle_pedido, nombre_producto, nombre_marca, imagen_producto, precio_detalle_pedido, cantidad_detalle_pedido } = product;
                                    const productImageUrl = `${SERVER_URL}images/productos/${imagen_producto}`;
                                    subtotal = cantidad_detalle_pedido * precio_detalle_pedido;
                                    return (
                                        <Swipeable key={id_detalle_pedido} renderRightActions={() => (
                                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMessage(id_detalle_pedido)}>
                                                <Icon source="delete" size={25} color="white" />
                                            </TouchableOpacity>
                                        )}>
                                            <View style={styles.card}>
                                                <View style={styles.row}>
                                                    <View style={styles.imgContainer}>
                                                        <Image source={{ uri: productImageUrl }} style={{ width: 60, height: 60 }} />
                                                    </View>
                                                    <View style={styles.infoProductBox}>
                                                        <Text style={styles.product}>{nombre_producto}</Text>
                                                        <Text style={styles.marca}>{nombre_marca}</Text>
                                                        <Text style={styles.price}>${subtotal.toFixed(2)}</Text>
                                                    </View>
                                                    <View style={styles.close}>
                                                        <View style={styles.colButtons}>
                                                            <TouchableOpacity style={styles.plus} onPress={() => handleIncrease(index)}>
                                                                <Icon size={20} source={'plus'} color='white' />
                                                            </TouchableOpacity>
                                                            <TextInput
                                                                style={styles.count}
                                                                textColor={'black'}
                                                                mode={"outlined"}
                                                                disabled={true}
                                                                value={cantidad_detalle_pedido.toString()}
                                                            />
                                                            <TouchableOpacity style={styles.minus} onPress={() => handleDecrease(index)}>
                                                                <Icon size={20} source={'minus'} color='white' />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={styles.divisor}></View>
                                            </View>
                                        </Swipeable>
                                    );
                                })
                            ) : (
                                <View style={styles.noProducts}>
                                    <Text style={styles.txtNoProducts}>No hay productos en tu carrito</Text>
                                </View>
                            )
                    )}
                </ScrollView>
                {/*Precio total*/}
                <View style={styles.spacer}></View>
                <View style={styles.totalBox}>
                    <View style={styles.rowTotal}>
                        <Text style={styles.totalText}>Total:</Text>
                        <Text style={styles.totalPrice}>${totaPrice}</Text>
                    </View>
                    <CustomButton title='Ir a pagar' buttonColor='#EE964B' fontSize={18} colorText='white' onPress={()=>{navigation.navigate('Delivery1')}}/>
                </View>
            </View>
        </AlertNotificationRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
    },
    loading: {
        height: windowHeight * 0.6,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
      marginTop: 5,
      fontFamily: 'Jost_500Medium',
    },
    card: {
        marginHorizontal: windowWidth * 0.05,
        marginVertical: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    imgContainer: {
        borderColor: '#C2BCBC',
        borderStyle: "solid",
        borderRadius: 10,
        borderWidth: 1,
        padding: 12
    },
    infoProductBox: {
        width: 180,
        marginStart: 5
    },
    product: {
        fontFamily: 'Jost_500Medium',
        fontSize: 16
    },
    price: {
        fontFamily: 'Jost_600SemiBold',
        color: '#F95738'
    },
    close:{
        flexDirection: "column",
        alignItems: "flex-end"
    },
    minus: {
        backgroundColor: '#EE964B',
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        borderRadius: 100
    },
    plus: {
        backgroundColor: '#F95738',
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        borderRadius: 100
    },
    colButtons: {
        flexDirection: "column",
        gap: 10,
        alignItems: "center"
    },
    count: {
        fontSize: 20,
        width: 40,
        height: 40,
        marginVertical:5,
        fontFamily: 'Jost_600SemiBold',
    },
    divisor: {
        marginTop: 15,
        height: 1,
        backgroundColor: '#E2DFDF'
    },
    ///////////////////////// STYLES PARA LA BOX DEL TOTAL //////////////
    totalBox: {
        borderTopRightRadius: 30,
        borderColor: '#CCC5C5',
        borderTopLeftRadius: 30,
        height: 160,
        paddingHorizontal: 25,
        borderWidth: 1
    },
    spacer: {
        flex: 1
    },
    rowTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingTop: 20,
        marginBottom: 30
    },
    totalText: {
        fontSize: 18,
        color: '#616060',
        fontFamily: 'Jost_600SemiBold'
    },
    marca:{
        fontSize: 12,
        color: '#787676',
        marginBottom: 8
    },
    totalPrice:{
        fontSize: 18,
        fontFamily: 'Jost_700Bold',
        color: '#e60404',
    },
    deleteButton: {
        backgroundColor: '#f65b5b',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '90%',
    },
    noProducts: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    txtNoProducts: {
        marginVertical: '40%',
        fontFamily: 'Jost_600SemiBold',
        fontSize: 20
    }

});

export default CartScreen;