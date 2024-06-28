import { StyleSheet, Text, View} from 'react-native';
import fetchData from './api/components';
import TabBar from "./src/navigation/TabBar";
import StackNavigator from "./src/navigation/StackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {useState, useEffect} from "react";

export default function App() {
  //API
  const API = 'services/public/clientes.php';
  //Declaramos la variable para guardar si hay un usuario logueado.
  const [logueado, setLogueado] = useState(false);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');

  //Verificamos si ya habia una sesion activa - usuario logueado
  const sessionActive = async () => {
    const data = await fetchData(API, 'getUser');
    if(data.session){
      //Si hay un usuario logueado entonces mandamos true a la variable logueado
      setLogueado(true);
      setName(data.name);
      setPicture(data.picture);
    } else {
      //Si no hay un usuario logueado entonces mandamos false a la variable logueado
      setLogueado(false);
    }
  }

  //Llama la funcion luego de que se haya cargado la pantalla
  useEffect(() => {
    sessionActive();
  }, [logueado, name, picture]);

  return(
    <NavigationContainer>
      {/*Verificamos con un if else si hay un usuario logeado, de ser asi entonces*/}
      {/*se le mostrara el TabBar pero si no, el StackNavigatior(Contiene la pantalla de bienvenidda y login)*/}
      {logueado ?
        <TabBar logueado={logueado} setLogueado={setLogueado} name={name} picture={picture}/>
          :
        <StackNavigator logueado={logueado} setLogueado={setLogueado}/>
      }
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
