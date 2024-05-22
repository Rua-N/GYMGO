import {useState, useEffect, startTransition, Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from './Projeto/Telas/database1';
//telas
import TelaInicial from './Projeto/Telas/home'
import TelaPerfil from './Projeto/Telas/perfil'
import TelaNovoTreino from './Projeto/Telas/treino';

const Stack = createStackNavigator();


function Home(){

  return(
    <Stack.Navigator initialRouteName='TelaHome'
    screenOptions={{
      StackBarActiveTintColor: 'white',
      StackBarInactiveTintColor: 'white',
      StackBarStyle: {
      padding: 10,
      backgroundColor: '#222831',
      borderTopWidth: 0,
      borderTopColor: "transparent"
      },
      cardStyle:{
        backgroundColor: '#222831',
        shadowColor: 'transparent'
      },
      headerStyle:{
        backgroundColor:'#222831',
        shadowColor: '#222831',
        elevation: 0,
        borderBottomWidth: 0
      },
      headerTintColor: '#eeeeee'
    }}>
    <Stack.Screen name='TelaHome' component={TelaInicial} options={{title:""}}/>
    <Stack.Screen name='TelaPerfil' component={TelaPerfil} options={{title:""}}/>
    <Stack.Screen name='TelaNovoTreino' component={TelaNovoTreino} options={{title:""}}/>
    </Stack.Navigator>
  )
}
//

//
export default  function App(){
return(
  <SQLiteProvider databaseName='treinoapp.db' onInit={migrateDbIfNeeded}>
      <NavigationContainer >
        <Home/>
      </NavigationContainer>
</SQLiteProvider>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})
