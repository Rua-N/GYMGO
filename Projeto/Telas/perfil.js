import { Component } from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import { estilos } from '../Styles/estilos';

export default class TelaPerfil extends Component {
  render(){
  return (
  <View style={estilos.container}>
      <Text>Perfil</Text>
      {/*Footer vvv*/}
      <View style={estilos.footer}>
        <View>
          <TouchableHighlight onPress={()=>this.props.navigation.navigate('TelaHome')}>
            <Image source={require('../Styles/imgs/halter.png')} style={estilos.footerImgs}/>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={()=>this.props.navigation.navigate('TelaPerfil')}>
            <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgsAtivado} />
          </TouchableHighlight>
        </View>
      </View>
      {/*Footer ^^^*/}
  </View>
  );
}}