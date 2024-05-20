import { Component } from 'react';
import { View, Text, TextInput,Pressable,Image, TouchableHighlight } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { estilos } from '../Styles/estilos';

export default class TelaHome extends Component {
   
render(){

    return(
    <View style={estilos.container}>  
      <Pressable style={estilos.butao} onPress={()=>this.props.navigation.navigate('TelaNovoTreino')}> 
      <Text style={estilos.bTexto}>Iniciar novo treino</Text>
    </Pressable>
      {/*Footer vvv*/}
      <View style={estilos.footer}>
        <View>
          <TouchableHighlight onPress={()=>this.props.navigation.navigate('TelaHome')}>
            <Image source={require('../Styles/imgs/halter.png')} style={estilos.footerImgsAtivado}/>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={()=>this.props.navigation.navigate('TelaPerfil')}>
            <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgs} />
          </TouchableHighlight>
        </View>
      </View>
      {/*Footer ^^^*/}
    </View>
    );
  }
}


