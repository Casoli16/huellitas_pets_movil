import {useEffect, useState, useRef} from "react";
import Fonts from "../../fonts/fonts";
import {ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import {Chip, Searchbar} from "react-native-paper";
import ProductsCards from "../components/ShopComponents/ProductsCards";
import {useNavigation, useRoute} from "@react-navigation/native";


const ShopScreen = ()=>{

    const scrollViewRef = useRef(null);
    //Usamos la navegacion que se ha creado - ver archivo navigation/StackNavigator.
    const navigation = useNavigation();
    //Recibimos los parametros que vienen de homeScreen
    const route = useRoute();
    const { pet } = route.params || '';

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
            setActiveSection('Perros');
            setActiveChip('Perros');
        }

        //MANEJO DE SCROLL (Para que cuando se vuelva a ver la pantalla, vuelva al inicio)
        //Funcion que manda al scroll a su posicion inicial
        const scrollToTop = () => {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }

        //Evento que se activa cuando se abre la pantalla de HomeScreen(Esta pantalla)
        navigation.addListener('focus', scrollToTop);

    }, [pet, navigation]); // Le pasamos la navegacion para que pueda identificar los cambios de pantalla

    //Para manejar el search input
    const [search, setSearch] = useState('');

    //Funcion que permite el cambio de pantallas, recibe un parametro (opciones de los botones (informacion, rendimiento o asistencias))
    const changeScreen = (section) => {
        //Manejo para el cambio de pantalla
        setActiveSection(section);
        //Manejo para el estilo de los chips
        setActiveChip(section);
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
            contentComponent = <ProductsCards pet={'Perro'} search={search}/>;
            image = require('../../assets/shopImages/dogs.jpg');
            title = 'Perros';
            break;
        case 'Gatos':
            contentComponent = <ProductsCards pet={'Gato'} search={search}/>;
            image = require('../../assets/shopImages/cats.jpg');
            title = 'Gatos';
            break;
        default:
            contentComponent = null;
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

});

export default ShopScreen;