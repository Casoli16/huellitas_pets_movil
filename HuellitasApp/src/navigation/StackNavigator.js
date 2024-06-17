import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return(
        <NavigationContainer>
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
                    component={LoginScreen}
                    options={{
                        title: 'Login'
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;