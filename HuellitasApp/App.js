import { StyleSheet, Text, View} from 'react-native';
import fetchData from './api/components';
import TabBar from "./src/navigation/TabBar";
import StackNavigator from "./src/navigation/StackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {useState, useEffect} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import LoadingScreen from "./src/screens/LoadingScreen";
import Fonts from "./fonts/fonts";

export default function App() {
  Fonts();

  //API
  const API = 'services/public/clientes.php';
  //Declaramos la variable para guardar si hay un usuario logueado.
  const [logueado, setLogueado] = useState(false);
  const [load, setLoad] = useState();
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');

  //Verificamos si ya habia una sesion activa - usuario logueado
  const sessionActive = async () => {
    setLoad(true)
    const data = await fetchData(API, 'getUser');
    if(data.session){
      //Si hay un usuario logueado entonces mandamos true a la variable logueado
      setLogueado(true);
      setName(data.name);
      setPicture(data.picture);
      setTimeout(()=>{
        setLoad(false)
      }, 1500)
    } else {
      //Si no hay un usuario logueado entonces mandamos false a la variable logueado
      setLogueado(false);
      setTimeout(()=>{
        setLoad(false)
      }, 2000)
    }
  }

  //Llama la funcion luego de que se haya cargado la pantalla
  useEffect(() => {
    sessionActive();
  }, [logueado, name, picture]);

  //Verifica si load esta en true, de ser asi entonces moestrar la pantalla de carga
  if(load) {
    return <LoadingScreen/>
  }

  return(
   //No ayuda a implementar gestos a la app
   <GestureHandlerRootView style={{flex: 1}}>
     <NavigationContainer>
       {/*Verificamos con un if else si hay un usuario logeado, de ser asi entonces*/}
       {/*se le mostrara el TabBar pero si no, el StackNavigatior(Contiene la pantalla de bienvenidda y login)*/}
       {logueado ?
           <TabBar logueado={logueado} setLogueado={setLogueado} setLoad={setLoad} name={name} picture={picture} setName={setName} setPicture={setPicture}/>
           :
           <StackNavigator logueado={logueado} setLogueado={setLogueado}/>
       }
     </NavigationContainer >
   </GestureHandlerRootView>
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
