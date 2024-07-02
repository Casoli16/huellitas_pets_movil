import {useEffect, useState, useRef} from "react";
import Fonts from "../../fonts/fonts";
import {ImageBackground, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import {Chip, Searchbar} from "react-native-paper";
import ProductsCards from "../components/ShopComponents/ProductsCards";
import {useNavigation, useRoute} from "@react-navigation/native";
import fetchData, {SERVER_URL}  from "../../api/components";

const ShopScreen = ()=>{

    const scrollViewRef = useRef(null);
    //Usamos la navegacion que se ha creado - ver archivo navigation/StackNavigator.
    const navigation = useNavigation();
    //Recibimos los parametros que vienen de homeScreen
    const route = useRoute();
    const { pet } = route.params || '';
    const API = 'services/public/productos.php';

    const [category, setCategory] =  useState('');
    const [categoriesData, setCategoriesData] = useState([]);
    //Para manejar el search input
    const [search, setSearch] = useState('');

    Fonts();

    // Manejo del cambio de pantallas.
    const [activeSection, setActiveSection] = useState('');
    //Manejo para el estilo de los botones.
    const [activeChip, setActiveChip] = useState('');


    useEffect(() => {
        // Revisa si viene pet, de ser asi entonces se van a mostrar los productos dependiendo de la mascota que venga.
        if (pet) {
            setActiveSection(pet);
            setActiveChip(pet);
            // Si no viene nada entonces se van a cargar los productos para perros.
        } else {
            setActiveSection("Perros");
            setActiveChip("Perros");
        }
    }, [pet]);

    //Mostramos la categorias.
    useEffect(() => {
        if (activeSection) {
            fillCategories();
        }
    }, [activeSection]); // Se manda la petición cada vez que se selecciona una mascota en específico

    useEffect(() => {

        //MANEJO DE SCROLL (Para que cuando se vuelva a ver la pantalla, vuelva al inicio)
        //Funcion que manda al scroll a su posicion inicial
        const scrollToTop = () => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
            }
        };

        //Evento que se activa cuando se abre la pantalla de HomeScreen(Esta pantalla)
        navigation.addListener("focus", scrollToTop);
    }, [navigation]); // Le pasamos la navegacion para que pueda identificar los cambios de pantalla


    //Funcion que permite el cambio de pantallas, recibe un parametro (opciones de los botones (informacion, rendimiento o asistencias))
    const changeScreen = (section) => {
        //Manejo para el cambio de pantalla
        setActiveSection(section);
        //Manejo para el estilo de los chips
        setActiveChip(section);
    };

    const changeCategory = (category) => {
        setCategory(category);
    };

    //Variable que guardara el contenido que se mostrara en la pantalla
    let contentComponent;
    //Variables que ayudaran con el cambio de imagen y titulo de la pantalla
    let image;
    let title;

    //Evaluamos la opcion que se ha elegido y dependiendo de ello injectara el componente de la informacion requerida a contentComponent.
    switch (activeSection){
        //Dependiendo de la opcion seleccionada asi se cambiara el fondo y titulo de la pantalla, ademas
        //enviara los parametros solicitados como la mascota y search
        case 'Perros':
            contentComponent = <ProductsCards pet={'Perro'} search={search} category={category}/>;
            image = require('../../assets/shopImages/dogs.jpg');
            title = 'Perros';
            break;
        case 'Gatos':
            contentComponent = <ProductsCards pet={'Gato'} search={search} category={category}/>;
            image = require('../../assets/shopImages/cats.jpg');
            title = 'Gatos';
            break;
        default:
            contentComponent = null;
    }


    //Funcion que permite mostrar las categorias.
    const fillCategories = async ()=> {
        let FORM = new FormData();
        FORM.append('mascota', activeSection)

        const DATA = await fetchData(API, 'readCategorias', FORM);

        if(DATA.status){
            let data = DATA.dataset;
            //Se guarda la data de la api en la variable products.
            setCategoriesData(data);
        } else{
            console.log(DATA.error)
        }
    }

    return(
        <ScrollView ref={scrollViewRef}>
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover">
                    <Text style={styles.title}>{title}</Text>
                </ImageBackground>

                <View style={styles.row}>
                    <Chip
                        style={{backgroundColor: activeChip === 'Perros' ? '#F95738' : '#fff', marginHorizontal: 5}}
                        onPress={() => changeScreen('Perros')}
                        textStyle={{color: activeChip === 'Perros' ? 'white' : '#000000'}}>Perros
                    </Chip>
                    <Chip
                        style={{backgroundColor: activeChip === 'Gatos' ? '#F95738' : '#fff', marginHorizontal: 5}}
                        onPress={() => changeScreen('Gatos')}
                        textStyle={{color: activeChip === 'Gatos' ? 'white' : '#000000'}}>Gatos
                    </Chip>
                </View>

                <View style={styles.boxText}>
                    <Image style={{width: 30, height: 30}} source={require('../../assets/shopImages/salud.png')}/>
                    <Text style={styles.titleCategory}>Elige la categoría</Text>
                </View>
                <View style={styles.boxHorizontal}>
                    <ScrollView horizontal={true}>
                        <TouchableOpacity style={styles.boxCategory2} onPress={()=>{changeCategory('')}}>
                            <Text style={styles.textCategory}>Todas</Text>
                        </TouchableOpacity>
                        {categoriesData.map((categoriesData, index) => (
                            <TouchableOpacity key={index} style={styles.boxCategory} onPress={()=>{changeCategory(categoriesData.idCategoria)}}>
                                <Text style={styles.textCategory}>{categoriesData.categoria}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.inputSearch}>
                    <Searchbar
                        style={{backgroundColor: '#f4f2f2'}}
                        placeholder="Buscar productos"
                        onChangeText={setSearch}
                        value={search}
                    />
                </View>

                {/*Se cargan los productos*/}
                {contentComponent}
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontFamily: 'Jost_600SemiBold',
        fontSize: 40,
        textAlign: "center",
        padding: 45,
        color: 'white'
    },
    row: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "center",
    },
    inputSearch: {
        marginHorizontal: 20,
        marginVertical: 5,
    },
    img: {
        width: 40,
        height: 40
    },
    boxCategory: {
        backgroundColor: '#f4d13f',
        padding: 12,
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 8
    },
    boxCategory2: {
        backgroundColor: '#EE964B',
        padding: 12,
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 8
    },
    textCategory: {
        color: 'white',
        fontFamily: 'Jost_600SemiBold',
    },
    boxHorizontal: {
        marginTop: 10,
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 15,
        marginHorizontal: 15
    },
    titleCategory: {
        fontFamily: 'Jost_600SemiBold',
        marginHorizontal: 10
    },
    boxText: {
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    }

});

export default ShopScreen;