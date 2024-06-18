import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = ({logueado, setLogueado}) => {
    return(
        <Stack.Navigator
                initialRouteName='WelcomeScreen'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    navigationBarColor: '#FAF0CA'
            }}>
                <Stack.Screen
                    name='WelcomeScreen'
                    component={WelcomeScreen}
                    options={{
                        title: 'Pantalla de bienvenida'
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
        </Stack.Navigator>
    )
}

export default StackNavigator;