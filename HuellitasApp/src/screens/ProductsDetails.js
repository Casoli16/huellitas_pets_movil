import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, ImageBackground, Share  } from "react-native";
import fetchData from '../../api/components';
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { SERVER_URL } from "../../api/components";
import CommentBox from '../components/CommentBox';
import { useNavigation } from "@react-navigation/native";
import { ToastNotification } from "../components/Alerts/AlertComponent";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AlertNotificationRoot, Dialog} from "react-native-alert-notification";
import {LoadingDots} from "@mrakesh0608/react-native-loading-dots";

const windowHeight = Dimensions.get('window').height;
const width = Dimensions.get("window").width;

const ProductsDetails = () => {
    // Se mantiene la URL de las APIs en una constante
    const PRODUCTOS_API = 'services/public/productos.php';
    const PEDIDOS_API = 'services/public/pedidos.php';
    const navigation = useNavigation();

    const route = useRoute();
    const { idProducto } = route.params;

    //Se declaran cosntantes para el estado de los datos del producto
    const [data, setData] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [messageCupon, setmessageCupon] = useState("");
    const [messageCuponColor, setmessageCuponColor] = useState("FFF"); // Color inicial blanco
    const [messageCuponFont, setmessageCuponFont] = useState(13);
    const [cupon, setCupon] = useState("");
    const [idcupon, setIdCupon] = useState(0);
    const [precioProducto, setPrecioProducto] = useState(0);
    const [precioProductoColor, setPrecioProductoColor] = useState("#7C7979"); // Color inicial gris
    const [precioProductoAntes, setPrecioProductoAntes] = useState(0);
    const [decorationText, setDecorationText] = useState("none");
    const [precioProductoColor2, setPrecioProductoColor2] = useState("#FFF"); // Color inicial gris
    const [existencia, setExistencia] = useState('');

    const [userRating, setUserRating] = useState(0); // Estado para manejar la calificación del usuario
    const [comment, setComment] = useState(""); // Estado para manejar el comentario del usuario
    const [date, setDate] = useState(""); // Estado para manejar el comentario del usuario
    const [user, setUser] = useState(""); // Estado para manejar el comentario del usuario

    const [comments, setComments] = useState([]); // Estado para manejar la lista de comentarios
    const [loading, setLoading] = useState(true);

    // Función para obtener los datos del producto
    const fetchProducto = async () => {
        // Se establece el estado de carga en true
        setLoading(true)
        try {
            const FORM = new FormData();
            FORM.append('idProducto', idProducto);
            const data1 = await fetchData(PRODUCTOS_API, 'readOneProduct', FORM);
            if (data1.status === 1 && data1.dataset) {
                setData(data1.dataset[0]);
                setPrecioProducto(data1.dataset[0].precio_producto);
                setPrecioProductoAntes(data1.dataset[0].precio_producto);
                setExistencia(data1.dataset[0].existencia_producto);
                setDecorationText("none");
                setIdCupon(0);
                setPrecioProductoColor2("#FFF"); // Color inicial blanco
                setPrecioProductoColor("#7C7979"); // Color inicial gris
                setLoading(false); // Se establece el estado de carga en false
                setmessageCupon("");
                setmessageCuponColor("FFF");
                setmessageCuponFont(1);
            } else {
                console.log('Cuando status es 0 ', data1);
            }
        } catch (error) {
            console.error('Error al obtener los datos del producto:', error);
        }
    };

        const fetchComentarios = async () => {
            setLoading(true);
            try {
            const FORM = new FormData();
            FORM.append('idProducto', idProducto);
            const datass = await fetchData(PRODUCTOS_API, 'readComentarios', FORM);
            if (datass.status === 1 && datass.dataset) {
                console.log('Comentarios:', datass.dataset); // Agrega esta línea
                setComments(datass.dataset);
                setLoading(false);
            } else {
                console.log('Cuando status es 0 ', datass);
                setComments([]); // Limpiar comentarios si la respuesta no tiene datos
                setLoading(false); // Terminar la carga si no hay datos
            }
            } catch (error) {
            console.error('Error al obtener los comentarios:', error);
            }
        };
        

    //Función que se ejecuta cuando el componente se carga
    useFocusEffect(
        React.useCallback(() => {
            //Se manda a llamar la función que ocurrirá cuando el componente se cargue
            setQuantity(1)
            fetchProducto();
            fetchComentarios();
        }, [idProducto])
    );

    // Función para enviar el código del cupón
    // Esta función se encarga de comprobar si el código del cupón al servidor es válido
    //En caso de que sea valido se mostrará el nuevo precio del producto, algunos mensajes y se cambiará el color del precio
    //En caso de que no sea valido se mostrará un mensaje de error y se cambiará el color del precio en caso de que sea necesario
    const enviarCodigo = async () => {
        try {
            const form = new FormData();
            form.append('cupon', cupon);

            const data = await fetchData(PRODUCTOS_API, 'readCuponDisponible', form);
            //Condicional cuando el cupón es válido y se puede aplicar
            if (data.status == 1 && data.dataset.mensaje == 'Cupón disponible') {
                setIdCupon(data.dataset.id_cupon);
                setPrecioProducto(precioProductoAntes - (precioProductoAntes * data.dataset.porcentaje_cupon / 100));
                setDecorationText("line-through");
                setmessageCuponFont(13);
                setPrecioProductoColor2("#00CC00"); // Cambia el color a verde cuando se aplica el cupón
                setmessageCuponColor("#00CC00");
                setmessageCupon(data.dataset.mensaje + " del " + data.dataset.porcentaje_cupon + "% de descuento");
                //setPrecioProductoColor("#00CC00"); // Cambia el color a verde cuando se aplica el cupón
            } 
            //Condicional cuando el cupón ya ha sido utilizado
            else if (data.status == 2) {
                setIdCupon(0);
                console.log('cupon ya utilizado');
                setmessageCuponColor("#ff0000");
                setmessageCupon("Cupón ya utilizado");
                setDecorationText("none");
                setPrecioProductoColor2("#FFF"); 
                setPrecioProducto(0);
            } 
            //Condición cuando el cupón esta vacío
            else if (data.status == 3) {
                setIdCupon(0);
                setmessageCuponFont(13);
                setmessageCuponColor("#ff0000");
                setmessageCupon("Cupón vacío");
                setDecorationText("none");
                setPrecioProductoColor2("#FFF"); 
                console.log('cupon vacio');
                setPrecioProducto(0);
            } 
            //Condición cuando el cupón no existe o ya ha sido utilizado
            else {
                setIdCupon(0);
                setmessageCuponFont(13);
                setmessageCuponColor("#ff0000");
                setmessageCupon("Cupón ya utilizado o no existe");
                setDecorationText("none");
                setPrecioProductoColor2("#FFF"); 
                console.log('cupon ya utilizado 2');
                setPrecioProducto(0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //Función para enviar el producto al carrito
    // Esta función redirige al usuario a la pantalla del carrito y muestra un mensaje de éxito o error
    const SendComentario = async () => {
        if (!comment.trim()) {
            // Muestra un mensaje de error si el comentario está vacío
            ToastNotification(2, "El comentario no puede estar vacío", true);
            return; // Sale de la función sin hacer nada más
        }

        try {
            const form = new FormData();
            form.append('idProducto', idProducto);
            form.append('comentarioValoracion', comment);
            form.append('calificacionValoracion', userRating);

            const data = await fetchData(PRODUCTOS_API, 'createValoracion', form);
            console.log(data);
            console.log('idProducto', idProducto);
            console.log('comentarioValoracion', comment);
            console.log('calificacionValoracion', userRating);
            if (data.status) {
                ToastNotification(1, data.message, true);
                setComment("");
                setUserRating(0);
                await fetchComentarios();
            } else {
                ToastNotification(2, data.error, true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //Función para enviar el producto al carrito
    // Esta función redirige al usuario a la pantalla del carrito y muestra un mensaje de éxito o error
    const SendToCart = async () => {
        try {
            const form = new FormData();
            form.append('idProducto', idProducto);
            form.append('cantidadProducto', quantity);
            form.append('idCupon', idcupon);

            const data = await fetchData(PEDIDOS_API, 'createDetail', form);
            console.log(data);
            console.log('idProducto', idProducto);
            console.log('cantidadProducto', quantity);
            console.log('idCupon', idcupon);
            if (data.status) {
                await ToastNotification(1, data.message, true);
                // Se redirige al usuario a la pantalla del carrito
                navigation.navigate('Cart', {
                    state: true
                });
            } else if(data.exception) {
                await ToastNotification(3, data.exception, true);
            } else {
                await ToastNotification(3, data.error, true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //Función para aumentar el input cuando se dé click al botón de más
    const handleIncrement = () => {
        if (quantity < data.existencia_producto) {
            setQuantity(quantity + 1);
        }
    };

    //Función para compartir el producto
    // Esta función permite compartir el producto a través de las aplicaciones disponibles en el dispositivo
    // Esta función solo tiene la capacidad de compartir texto, por lo que se comparte el nombre del producto, la marca, la categoría y el precio
    const share = async () => {
        try {
            const result = await Share.share({
                message: `¡Hola! Te comparto este producto que encontré en HuellitasApp: ${data.nombre_producto} de la marca ${data.nombre_marca}. Puedes encontrarlo en la categoría de ${data.nombre_categoria} por solo $${precioProducto}. ¡No te lo pierdas!. Lo encontré en http://localhost/Huellitas_pets/system_huellitas/views/public/producto.html?producto=${idProducto}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Actividad compartida:", result.activityType);
                } else {
                    console.log("Compartido");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Compartir cancelado");
            }
        } catch (error) {
            console.error("Error al compartir:", error.message);
        }
    };

    //Función para disminuir el input cuando se dé click al botón de menos
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    //Función para manejar la calificación del usuario
    const handleRatingPress = (rating) => {
        setUserRating(rating);
    };

    //Función para manejar el cambio en el comentario del usuario
    const handleCommentChange = (text) => {
        setComment(text);
    };

    return (
        <AlertNotificationRoot>
        {loading ? (
            //Pantalla loading que se cargará en lo que la API termina de cargar
                <View style={styles.loading}>
                    <LoadingDots
                        animation={"typing"}
                        color={'#EE964B'}
                        containerStyle={{backgroundColor: '#FAF0CA', padding: 18, borderRadius: 10,}}
                    />
                    <Text style={styles.loadingText}>Cargando...</Text>
                </View>
            ):(
                //Contenido con datos de la API
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.imageContainer}>
                        {
                        /* Imagen del producto*/
                        }
                        <ImageBackground
                            style={styles.image}
                            source={{ uri: `${SERVER_URL}images/productos/${data.imagen_producto}` }}
                        >
                            <TouchableOpacity onPress={share}>
                                <View style={styles.circle2}>
                                    <Ionicons name="share-social-sharp" size={25} color="#F29E20" />
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <Text style={styles.title}>{data.nombre_producto}</Text>
                    <Text style={styles.brand}>{data.nombre_marca}</Text>
                    <View style={styles.priceCategoryContainer}>
                        <View style={styles.alignNew}>
                            <Text style={[styles.price, { color: precioProductoColor, textDecorationLine: decorationText }]}>${data.precio_producto}</Text>
                            <Text style={[styles.price, { color: precioProductoColor2 }]}>${precioProducto}</Text>
                        </View>
                        <Text style={styles.category}>{data.nombre_categoria}</Text>
                    </View>
                    <Text style={styles.descriptionTittle}>Descripción</Text>
                    <Text style={styles.description}>{data.descripcion_producto}</Text>
                    <View style={styles.existenciasRow}>
                        <Text style={styles.existenciasT}>Existencias:</Text>
                        <Text style={styles.existenciasN}>{data.existencia_producto}</Text>
                    </View>
                    <View style={styles.buttonContent}>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.quantityInput}
                                value={String(quantity)}
                                keyboardType="numeric"
                                maxLength={String(data.existencia_producto).length}
                                onChangeText={(text) => {
                                    const value = Math.max(1, Math.min(data.existencia_producto, parseInt(text) || 1));
                                    setQuantity(value);
                                }}
                            />
                            <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={SendToCart}>
                            <View style={styles.buttonContent}>
                                <View style={styles.circle}>
                                    <Ionicons name="cart-outline" size={25} color="#000" />
                                </View>
                                <Text style={styles.buttonText}>Añadir al carrito</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cuponContent}>
                        <Ionicons name="pricetags" size={26} color="#F29E20" />
                        <View style={styles.align}>
                            <Text style={styles.boldText}>¿Tienes un cupón de descuento?</Text>
                            <Text style={styles.normalText}>Podrás añadirlo en la parte de abajo.</Text>
                        </View>
                    </View>
                    <View style={styles.inputContent}>
                        <TextInput
                            style={styles.codigoInput}
                            value={cupon}
                            keyboardType="default"
                            onChangeText={(text) => setCupon(text)}
                        />

                        <TouchableOpacity onPress={enviarCodigo}>
                            <Ionicons name="send" size={28} color="#000" />
                        </TouchableOpacity>

                    </View>
                    <Text style={[styles.brand2, { color: messageCuponColor }, {fontSize: messageCuponFont}]}>{messageCupon}</Text>
                    <View style={styles.valorationContainer}>
                        <Text style={styles.TitleValoration}>Reseñas</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingTitle}>Tu puntuación sobre este producto</Text>
                            <View style={styles.starsContainer}>
                                {[...Array(5)].map((_, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleRatingPress(index + 1)}>
                                        <Image
                                            style={styles.star}
                                            source={index < userRating ? require('../../assets/star_filled.png') : require('../../assets/star_empty.png')}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Escribe un comentario..."
                                multiline={true}
                                value={comment}
                                onChangeText={handleCommentChange}
                            />
                            <TouchableOpacity style={styles.submitButton} onPress={SendComentario}>
                                <Text style={styles.submitButtonText}>Enviar reseña</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.commentsContainer}>
                        <Text style={styles.TitleValoration}>Comentarios</Text>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <CommentBox
                                    key={index}
                                    author={comment.nombre_cliente}
                                    date={comment.fecha_formato}
                                    comment={comment.comentario}
                                    rating={comment.calificacion}
                                />
                            ))
                        ) : (
                            <Text style={styles.noComments}>Aun no se calificado este producto.</Text>
                        )}
                    </View>
                    </View>
                </ScrollView>
            )}
        </AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff"
    },
    noComments: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        marginVertical: 20,
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
    imageContainer: {
        width: width * 0.95,
        height: width * 0.95,
        backgroundColor: "#F5F5DC",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        overflow: "hidden", // Necesario para que el borde redondeado aplique a la imagen de fondo
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: 20,
        justifyContent: "flex-end", // Alinea el contenido al fondo del contenedor
        alignItems: "flex-end", // Alinea el contenido a la derecha del contenedor
    },
    circle2: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        margin: 10, // Espaciado desde los bordes del contenedor
        borderWidth: 0.5, // Grosor del borde
        borderColor: "orange", // Color del borde
    },
    valorationContainer: {
        width: width * 0.86,
        backgroundColor: "#F5F5DC",
        borderRadius: 20,
        justifyContent: "center",
        marginBottom: 10,
        marginVertical: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        alignSelf: "flex-start"
    },
    brand: {
        fontSize: 18,
        color: "#888",
        marginBottom: 10,
        alignSelf: "flex-start"
    },
    brand2: {
        padding: 12,
        color: "#FFF",
        alignSelf: "flex-start"
    },
    alignNew: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%",
        paddingHorizontal: 2,
    },
    priceCategoryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 4,
        marginBottom: 10
    },
    existenciasT: {
        fontSize: 12,
        color: "#000",
        alignSelf: "flex-start"
    },
    existenciasN: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#d82828",
        alignSelf: "flex-start",
        marginLeft: 5
    },
    existenciasRow: {
      display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
        marginBottom: 20,
        backgroundColor: '#fee',
        padding: 8,
        borderRadius: 10
    },
    price: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#7C7979"
    },
    category: {
        fontSize: 14,
        fontWeight: "light",
        backgroundColor: "#F29E20",
        color: "#FFF",
        borderRadius: 10,
        padding: 5
    },
    circle: {
        width: 35,
        height: 35,
        borderRadius: 18, // La mitad del tamaño del ancho/alto para hacerla circular
        backgroundColor: '#fff', // Puedes cambiar el color según tus necesidades
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5,
    },
    descriptionTittle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
        alignSelf: "flex-start"
    },
    description: {
        fontSize: 16,
        color: "#555",
        marginBottom: 10,
        textAlign: "left",
        width: "100%",
        alignSelf: "flex-start"
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        backgroundColor: "#FFF",
        borderRadius: 22,
        borderColor: "#D3D3D3",
        borderWidth: 1,
        padding: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 5
    },
    quantityButton: {
        backgroundColor: "#FFF",
        padding: 7,
        borderRadius: 25
    },
    quantityButtonText: {
        fontSize: 18,
        color: "#F29E20"
    },
    quantityInput: {
        width: 25,
        height: 25,
        textAlign: "center",
        marginHorizontal: 20,
        fontWeight: "bold"
    },
    cuponContent: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%"
    },
    button: {
        backgroundColor: "#F29E20",
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
        width: width * 0.5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%"
    },
    inputContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%"
    },
    icon: {
        width: 44,
        height: 44,
        marginRight: 5
    },
    icon2: {
        width: 44,
        height: 44,
        marginRight: 5
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold"
    },
    boldText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold"
    },
    normalText: {
        fontSize: 14,
        color: "#555"
    },
    align: {
        alignItems: "flex-end",
        marginLeft: 10
    },
    codigoInput: {
        width: width * 0.6,
        height: 35,
        textAlign: "left",
        fontWeight: "semi-bold",
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        borderRadius: 20,
        borderColor: "#D3D3D3",
        borderWidth: 1,
        padding: 5,
        paddingLeft: 10, // Añade esta línea para darle espacio al texto desde la izquierda
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    ratingContainer: {
        alignItems: "center",
        marginBottom: 20
    },
    ratingTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    starsContainer: {
        flexDirection: "row",
        marginBottom: 10
    },
    star: {
        width: 26,
        height: 26,
        marginHorizontal: 2,
    },
    commentInput: {
        width: width * 0.75,
        height: 100,
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 10,
        textAlignVertical: "top",
        borderColor: "#FCA311",
        borderWidth: 2,
        marginBottom: 10,
        marginTop: 20
    },
    submitButton: {
        backgroundColor: "#F29E20",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center"
    },
    submitButtonText: {
        color: "#FFF",
        fontWeight: "bold"
    },
    commentsContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20
    },
    TitleValoration: {
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 10,
        alignSelf: "flex-start",
        marginLeft: 15,
        marginTop: 15
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 16,
    },
});

export default ProductsDetails;
