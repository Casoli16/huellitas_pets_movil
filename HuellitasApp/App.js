import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabBar from "./src/navigation/TabBar";
import StackNavigator from "./src/navigation/StackNavigator";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
    <StackNavigator/>
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
