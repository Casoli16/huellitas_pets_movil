import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SingUpScreen from "../screens/SingUpScreen";
import ProductsDetails from "../screens/ProductsDetails";
import EditProfileScreen from "../screens/EditProfileScreen";
import History from "../screens/History";
import {StyleSheet} from "react-native";

const Stack = createNativeStackNavigator();

const StackNavigator = ({logueado, setLogueado}) => {
    return(
        <Stack.Navigator
                initialRouteName='WelcomeScreen'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    // Estilos para el header
                    headerStyle: styles.header,
                    headerTitleAlign: "center",
                    headerTintColor: '#fff',
            }}>
                <Stack.Screen
                    name='WelcomeScreen'
                    component={WelcomeScreen}
                    options={{
                        title: 'Pantalla de bienvenida'
                }}
                />
                <Stack.Screen
                    name='SingUpScreen'
                    component={SingUpScreen}
                    options={{
                        title: 'Sing Up'
                }}
                />
                <Stack.Screen
                    name='LoginScreen'
                    options={{
                        title: 'Login'
                }}
                >
                {/*Pasamos como parametro el estado de la variable logueado.*/}
                {props => <LoginScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
                </Stack.Screen>
                <Stack.Screen
                    name='productsDetails'
                    component={ProductsDetails}
                    options={{
                        title: 'Producto',
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='EditProfileScreen'
                    component={EditProfileScreen}
                    options={{
                        title: 'Editar perfil',
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='History'
                    component={History}
                    options={{
                        title: 'Historial',
                        headerShown: true
                    }}
                />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#F4D35E',
    }
});


export default StackNavigator;