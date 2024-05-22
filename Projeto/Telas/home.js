import { Component, useState, useEffect } from 'react';
import { View, Text, TextInput,Pressable } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { estilos } from '../Styles/estilos';
import { createTables, insertValues, getValues } from './database';
export default class TelaInicial extends Component {
   
render(){
    return(
    <View style={estilos.container}>  
      <Pressable style={estilos.butao} onPress={()=>this.props.navigation.navigate('TelaNovoTreino')}> 
      <Text style={estilos.bTexto}>Iniciar novo treino</Text>
    </Pressable>
    
      <View style={estilos.footer}>
        <View>
          <Pressable style={estilos.butao} onPress={()=>this.props.navigation.navigate('TelaInicial')}> 
          <Text style={estilos.bTexto}>Home</Text>
          </Pressable>
        </View>
        <View>
          <Pressable style={estilos.butao} onPress={()=>this.props.navigation.navigate('TelaPerfil')}> 
          <Text style={estilos.bTexto}>Perfil</Text>
          </Pressable>
        </View>
      </View>
    </View>
    );
  }
}


