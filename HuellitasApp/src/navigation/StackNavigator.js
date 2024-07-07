import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SingUpScreen from "../screens/SingUpScreen";
import ProductsDetails from "../screens/ProductsDetails";
import EditProfileScreen from "../screens/EditProfileScreen";
import History from "../screens/History";
import {StyleSheet} from "react-native";
import DeliveryScreen1 from "../screens/DeliveryScreen1";
import DeliveryScreen2 from "../screens/DeliveryScreen2";
import RecoveryPass1 from "../screens/RecoveryPass1";
import RecoveryPass2 from "../screens/RecoveryPass2";
import RecoveryPass3 from "../screens/RecoveryPass3";

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
                    name='RecoveryPass1'
                    component={RecoveryPass1}
                    options={{
                        title: 'Recuperación de contraseña- email'
                }}
                />
                <Stack.Screen
                    name='RecoveryPass2'
                    component={RecoveryPass2}
                    options={{
                        title: 'Recuperación de contraseña- código'
                }}
                />
                <Stack.Screen
                    name='RecoveryPass3'
                    component={RecoveryPass3}
                    options={{
                        title: 'Recuperación de contraseña- nueva contraseña'
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
                <Stack.Screen
                    name='Delivery1'
                    component={DeliveryScreen1}
                    options={{
                        title: 'Pedido',
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='Delivery2'
                    component={DeliveryScreen2}
                    options={{
                        title: 'Pedido',
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