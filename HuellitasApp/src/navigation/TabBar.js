import {Image, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopScreen from "../screens/ShopScreen";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LogOut from '../components/LogOut';
import StackNavigator from "./StackNavigator";
import fetchData, {SERVER_URL} from "../../api/components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

const Tab = createBottomTabNavigator();

const TabBar = ({logueado, setLogueado, setLoad, name, picture, setName, setPicture}) =>  {
    const firstName = name.split(" ")[0];

    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{
                // Estilos para el tabBar
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: '#EE964B',
                // Estilos para el header
                headerStyle: styles.header,
                headerTitleAlign: "center",
                headerTintColor: '#fff',
            }}>
                <Tab.Screen
                    name='Cart'
                    options={{
                        title: 'Carrito',
                        tabBarIcon: () => (
                            <Icon name='cart-outline' size={26}/>
                        )
                    }}
                >
                {/*Pasamos como parametro el estado de la variable logueado.*/}
                {props => <CartScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
                </Tab.Screen>
                <Tab.Screen
                    name='Shop'
                    options={{
                        title: 'Tienda',
                        tabBarIcon: () => (
                            <Icon name='shopping-outline' size={26}/>
                        )
                    }}
                >
                {/*Pasamos como parametro el estado de la variable logueado.*/}
                {props => <ShopScreen {...props} setLogueado={setLogueado} logueado={logueado}/>}
                </Tab.Screen>
                <Tab.Screen
                    name='Home'
                    options={{
                        title: 'Inicio',
                        tabBarIcon: () => (
                            <Icon name='home-outline' size={33} color={'#EE964B'}/>
                        )
                }}
                >
                {/*Pasamos como parametro el estado de la variable logueado.*/}
                {props => <HomeScreen {...props} setLogueado={setLogueado} logueado={logueado} name={name} />}
                </Tab.Screen>
                <Tab.Screen
                    name='logOut'
                    options={{
                        headerShown: false,
                        title: 'Cerrar sesión',
                        tabBarIcon: () => (
                            <Icon name='logout' size={26}/>
                        )
                    }}
                >
                {/*Pasamos como parametro el estado de la variable logueado.*/}
                {props => <LogOut {...props} setLogueado={setLogueado} logueado={logueado}  />}
                </Tab.Screen>
                <Tab.Screen
                    name='Profile'
                    options={{
                        title: 'Mi perfil',
                        tabBarLabel: firstName,
                        tabBarIcon: () => (
                            <Image style={{width: 30, height: 30, borderRadius: 100/2}} source={{uri:`${SERVER_URL}images/clientes/${picture}`}}/>
                        )
                    }}
                >
                {/*Pasamos como parametro el estado de la variable logueado.*/}
                {props => <ProfileScreen {...props} setLogueado={setLogueado} logueado={logueado} setLoad={setLoad}  setName={setName} setPicture={setPicture} />}
                </Tab.Screen>

            <Tab.Screen
                    name='StackNavigator'
                    component={StackNavigator}
                    options={({
                        tabBarButton: ()=> null,
                        headerShown: false
                    })}
                />
        </Tab.Navigator>
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
        paddingTop: 10
    },
    header:{
        backgroundColor: '#F4D35E',
    }
});

export default TabBar;