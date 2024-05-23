import React, { Component, useState } from 'react';
import { View, Text, TouchableHighlight, Image, TextInput, Button,Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { estilos } from '../Styles/estilos';



const EditPesoPadrao = () => {
  const [peso, setPeso] = useState('70');
  const [padrao, setPadrao] = useState('kg');
  const [isEditingPeso, setIsEditingPeso] = useState(false);
  const [isEditingPadrao, setIsEditingPadrao] = useState(false);

  const handlePesoChange = (text) => {
    setPeso(text);
  };

  const handlePadraoChange = (itemValue) => {
    setPadrao(itemValue);
  };

  return (
    <View>
      <Text style={estilos.bTexto}>Peso: </Text>
      {isEditingPeso ? (
        <TextInput
          style={estilos.input}
          value={peso}
          onChangeText={handlePesoChange}
          keyboardType='numeric'
        />
      ) : (
        <Text style={estilos.bTexto}>{peso}</Text>
      )}
      <Pressable style={estilos.butao} onPress={() => setIsEditingPeso(!isEditingPeso)}><Text style={estilos.bTexto}>{isEditingPeso ? 'Salvar' : 'Editar'}</Text></Pressable>

      <Text style={estilos.bTexto}>Padrão: </Text>
      {isEditingPadrao ? (
        <Picker
          selectedValue={padrao}
          style={estilos.picker}
          onValueChange={handlePadraoChange}
        >
          <Picker.Item label="kg" value="kg" />
          <Picker.Item label="lbs" value="lbs" />
          <Picker.Item label="placas" value="placas" />
        </Picker>
      ) : (
        <Text style={estilos.bTexto}>{padrao}</Text>
      )}
      <Pressable style={estilos.butao} onPress={() => setIsEditingPadrao(!isEditingPadrao)}><Text style={estilos.bTexto}>{isEditingPadrao ? 'Salvar' : 'Editar'}</Text></Pressable>
    </View>
  );
};

export default class TelaPerfil extends Component {
  render() {
    return (
      <View style={estilos.container}>
        <View style={estilos.Frame}>
          <EditPesoPadrao />
        </View>
        {/*Footer vvv*/}
        <View style={estilos.footer}>
          <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaHome')}>
              <Image source={require('../Styles/imgs/halter.png')} style={estilos.footerImgs} />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaPerfil')}>
              <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgsAtivado} />
            </TouchableHighlight>
          </View>
        </View>
        {/*Footer ^^^*/}
      </View>
    );
  }
}