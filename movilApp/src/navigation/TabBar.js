import {Image, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopScreen from "../screens/ShopScreen";
import HomeScreen from "../screens/HomeScreen";
import homeScreen from "../screens/HomeScreen";
import profileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabBar = () =>  {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                // Estilos para el tabBar
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: 'black',
                // Estilos para el header
                headerStyle: styles.header,
                headerTitleAlign: "center",
                headerTintColor: '#fff',
            }}>
                <Tab.Screen
                    name='Cart'
                    component={HomeScreen}
                    options={{
                        title: 'Carrito',
                        tabBarIcon: () => (
                            <Image source={require('../../assets/TabBarIcons/shoppingCart.png')}/>
                        )
                    }}
                />
                <Tab.Screen
                    name='Shop'
                    component={ShopScreen}
                    options={{
                        title: 'Tienda',
                        tabBarIcon: () => (
                            <Image source={require('../../assets/TabBarIcons/shop.png')}/>
                        )
                    }}
                />
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        title: 'Inicio',
                        tabBarIcon: () => (
                            <Image source={require('../../assets/TabBarIcons/home.png')}/>
                        )
                }}
                />
                <Tab.Screen
                    name='logOut'
                    component={homeScreen}
                    options={{
                        title: 'Cerrar sesión',
                        tabBarIcon: () => (
                            <Image source={require('../../assets/TabBarIcons/logOut.png')}/>
                        )
                    }}
                />
                <Tab.Screen
                    name='Profile'
                    component={profileScreen}
                    options={{
                        title: 'Mi perfil',
                        tabBarIcon: () => (
                            <Image source={require('../../assets/TabBarIcons/profile.png')}/>
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBar: {
        backgroundColor: '#FAF0CA',
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    header:{
        backgroundColor: '#F4D35E',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25
    }
});

export default TabBar;