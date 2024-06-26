import {useState, useEffect, startTransition, Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from './Projeto/Telas/database1';
import { ExerciseProvider } from './Projeto/Telas/ExerciseContext';
//telas
import TelaHome from './Projeto/Telas/home'
import TelaPerfil from './Projeto/Telas/perfil'
import TelaNovoTreino from './Projeto/Telas/treino';
import ExerciciosEscolhidos from './Projeto/Telas/exerciciosEscolhidos';
import TelaTodosTreinos from './Projeto/Telas/infoHistorico';
import TelaHistorico from './Projeto/Telas/historico';
import TelaNovoTemplate from './Projeto/Telas/addNovoTemplate';
import ExerciciosEscolhidosTemplate from './Projeto/Telas/exerciciosEscolhidosTemplate';
import TelaInfoHistorico from './Projeto/Telas/infoHistorico';
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
      },headerShown: false,
      headerTintColor: '#eeeeee'
    }}>
    <Stack.Screen name='TelaHome' component={TelaHome} options={{title:""}}/>
    <Stack.Screen name='TelaPerfil' component={TelaPerfil} options={{title:""}}/>
    <Stack.Screen name='TelaHistorico' component={TelaHistorico} options={{title:""}}/>
    <Stack.Screen name='TelaNovoTreino' component={TelaNovoTreino} options={{title:""}}/>
    <Stack.Screen name="ExerciciosEscolhidos" component={ExerciciosEscolhidos} options={{title:""}} />
    <Stack.Screen name="TelaTodosTreinos" component={TelaTodosTreinos} options={{title:""}} />
    <Stack.Screen name="TelaNovoTemplate" component={TelaNovoTemplate} options={{title:""}} />
    <Stack.Screen name="ExerciciosEscolhidosTemplate" component={ExerciciosEscolhidosTemplate} options={{title:""}} />
    <Stack.Screen name="TelaInfoHistorico" component={TelaInfoHistorico} options={{title:""}} />
    </Stack.Navigator>
  )
}
//

//
export default  function App(){
return(
  <ExerciseProvider>
  <SQLiteProvider databaseName='treinoapp.db' onInit={migrateDbIfNeeded}>
      <NavigationContainer >
        <Home/>
      </NavigationContainer>
</SQLiteProvider>
</ExerciseProvider>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})
