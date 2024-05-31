import React, { Component, useState, useEffect} from 'react';
import { View, Text, TouchableHighlight, Image, TextInput, Pressable, ScrollView } from 'react-native';
import { estilos } from '../Styles/estilos';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getExercicios, getInformacoes, migrateDbIfNeeded, saveInformacoes } from './database1';


const EditPesoPadrao = ({ toggleEditing }) => {
  const [peso, setPeso] = useState('');
  const [cintura, setCintura] = useState('');
  const [quadril, setQuadril] = useState('');
  const [abdomen, setAbdomen] = useState('');
  const [bracoEsqRelax, setBracoEsqRelax] = useState('');
  const [bracoDirRelax, setBracoDirRelax] = useState('');
  const [bracoEsqContraido, setBracoEsqContraido] = useState('');
  const [bracoDirContraido, setBracoDirContraido] = useState('');
  const [coxaEsq, setCoxaEsq] = useState('');
  const [coxaDir, setCoxaDir] = useState('');
  const [panturrilhaEsq, setPanturrilhaEsq] = useState('');
  const [panturrilhaDir, setPanturrilhaDir] = useState('');
  const [isEditingPeso, setIsEditingPeso] = useState(false);
  const db = useSQLiteContext();

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}-${month}-${year}`;
  }

  const editando = () => {
    if (isEditingPeso) {
      saveInformacoes(db,
        peso, cintura, quadril, abdomen, bracoEsqRelax, bracoDirRelax,
        bracoEsqContraido, bracoDirContraido, coxaEsq, coxaDir,
        panturrilhaEsq, panturrilhaDir, getDate()
      )
    }
    setIsEditingPeso(!isEditingPeso);
    toggleEditing(!isEditingPeso);
  };

  useEffect(() => {
    loadInformacoes();
  }, []);

  const loadInformacoes = () =>{
    const infos = getInformacoes(db)
  if (infos) {
    setPeso(infos.Peso !== undefined ? infos.Peso.toString() : '');
    setCintura(infos.CircunferenciaCintura !== undefined ? infos.CircunferenciaCintura.toString() : '');
    setQuadril(infos.CircunferenciaQuadril !== undefined ? infos.CircunferenciaQuadril.toString() : '');
    setAbdomen(infos.CircunferenciaAbdomen !== undefined ? infos.CircunferenciaAbdomen.toString() : '');
    setBracoEsqRelax(infos.CircunferenciaBracoEsqRelax !== undefined ? infos.CircunferenciaBracoEsqRelax.toString() : '');
    setBracoDirRelax(infos.CircunferenciaBracoDirRelax !== undefined ? infos.CircunferenciaBracoDirRelax.toString() : '');
    setBracoEsqContraido(infos.CircunferenciaBracoEsqContraido !== undefined ? infos.CircunferenciaBracoEsqContraido.toString() : '');
    setBracoDirContraido(infos.CircunferenciaBracoDirContraido !== undefined ? infos.CircunferenciaBracoDirContraido.toString() : '');
    setCoxaEsq(infos.CircunferenciaCoxaEsq !== undefined ? infos.CircunferenciaCoxaEsq.toString() : '');
    setCoxaDir(infos.CircunferenciaCoxaDir !== undefined ? infos.CircunferenciaCoxaDir.toString() : '');
    setPanturrilhaEsq(infos.CircunferenciaPanturrilhaEsq !== undefined ? infos.CircunferenciaPanturrilhaEsq.toString() : '');
    setPanturrilhaDir(infos.CircunferenciaPanturrilhaDir !== undefined ? infos.CircunferenciaPanturrilhaDir.toString() : '');
  }
  console.log(infos);
  }
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
        <View style={estilos.header}></View>
        <View style={estilos.body}>
          <EditPesoPadrao toggleEditing={this.toggleEditing} />
        </View>
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
      </View>
    );
  }
}
