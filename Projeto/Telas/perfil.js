import React, { Component, useState } from 'react';
import { View, Text, TouchableHighlight, Image, TextInput, Pressable, ScrollView } from 'react-native';
import { estilos } from '../Styles/estilos';

const EditPesoPadrao = ({ toggleEditing }) => {
  const [peso, setPeso] = useState('70');
  const [cintura, setCintura] = useState('80');
  const [quadril, setQuadril] = useState('90');
  const [abdomen, setAbdomen] = useState('85');
  const [bracoEsqRelax, setBracoEsqRelax] = useState('30');
  const [bracoDirRelax, setBracoDirRelax] = useState('31');
  const [bracoEsqContraido, setBracoEsqContraido] = useState('32');
  const [bracoDirContraido, setBracoDirContraido] = useState('33');
  const [coxaEsq, setCoxaEsq] = useState('50');
  const [coxaDir, setCoxaDir] = useState('51');
  const [panturrilhaEsq, setPanturrilhaEsq] = useState('40');
  const [panturrilhaDir, setPanturrilhaDir] = useState('41');
  const [isEditingPeso, setIsEditingPeso] = useState(false);

  //faz o 'footer' sumir
  const editando = () => {
    setIsEditingPeso(!isEditingPeso);
    toggleEditing(!isEditingPeso);
  };

  return (
    <View style={estilos.body}>
      <View>
        <Pressable style={estilos.butao} onPress={editando}>
          <Text style={estilos.texto}>{isEditingPeso ? 'Salvar' : 'Editar'}</Text>
        </Pressable>
      </View>
      <ScrollView>
        <Text style={estilos.texto}>Peso(kg): </Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={peso}
            onChangeText={setPeso}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{peso}</Text>
        )}
        <Text style={estilos.texto}>Circunferência da Cintura(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={cintura}
            onChangeText={setCintura}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{cintura}</Text>
        )}
        <Text style={estilos.texto}>Circunferência de Quadril(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={quadril}
            onChangeText={setQuadril}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{quadril}</Text>
        )}
        <Text style={estilos.texto}>Circunferência de Abdomen(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={abdomen}
            onChangeText={setAbdomen}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{abdomen}</Text>
        )}
        <Text style={estilos.texto}>Circunferência do Braço Esq. Relaxado(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={bracoEsqRelax}
            onChangeText={setBracoEsqRelax}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{bracoEsqRelax}</Text>
        )}
        <Text style={estilos.texto}>Circunferência do Braço Direito Relaxado(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={bracoDirRelax}
            onChangeText={setBracoDirRelax}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{bracoDirRelax}</Text>
        )}
        <Text style={estilos.texto}>Circunferência do Braço Esq. Contraído(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={bracoEsqContraido}
            onChangeText={setBracoEsqContraido}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{bracoEsqContraido}</Text>
        )}
        <Text style={estilos.texto}>Circunferência do Braço Direito Contraído(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={bracoDirContraido}
            onChangeText={setBracoDirContraido}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{bracoDirContraido}</Text>
        )}
        <Text style={estilos.texto}>Circunferência Medial da Coxa Esquerda(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={coxaEsq}
            onChangeText={setCoxaEsq}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{coxaEsq}</Text>
        )}
        <Text style={estilos.texto}>Circunferência Medial da Coxa Direito(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={coxaDir}
            onChangeText={setCoxaDir}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{coxaDir}</Text>
        )}
        <Text style={estilos.texto}>Circunferência da Panturrilha Esquerda(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={panturrilhaEsq}
            onChangeText={setPanturrilhaEsq}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{panturrilhaEsq}</Text>
        )}
        <Text style={estilos.texto}>Circunferência da Panturrilha Direita(cm):</Text>
        {isEditingPeso ? (
          <TextInput
            style={estilos.txtInput}
            value={panturrilhaDir}
            onChangeText={setPanturrilhaDir}
            keyboardType='numeric'
          />
        ) : (
          <Text style={estilos.texto}>{panturrilhaDir}</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default class TelaPerfil extends Component {
  state = {
    isEditing: false
  };

  toggleEditing = (isEditing) => {
    this.setState({ isEditing });
  };

  render() {
    return (
      <View style={estilos.container}>
        {/*header*/}
        <View style={estilos.header}>
        </View>
        {/*header*/}
        <View style={estilos.body}>
          <EditPesoPadrao toggleEditing={this.toggleEditing} />
        </View>
        {/*Footer vvv*/}
        {!this.state.isEditing && (
          <View style={estilos.footer}>
            <View>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaHistorico')}>
                <Image source={require('../Styles/imgs/historico.png')} style={estilos.footerImgs} />
              </TouchableHighlight>
            </View>
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
        )}
        {/*Footer ^^^*/}
      </View>
    );
  }
}