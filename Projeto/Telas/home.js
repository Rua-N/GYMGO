import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Pressable, ScrollView,TouchableHighlight } from 'react-native';
import { estilos } from '../Styles/estilos';
import { ExerciseContext } from './ExerciseContext';
import { deleteSeriesTemplate, deleteTreinosTemplate, getTreinosTemplateById, getTreinosTemplate } from './database1';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';

export default function TelaNovoTreino({ navigation }) {
  const { exercises, setExercises, clearExercises, setNomeTreino } = useContext(ExerciseContext);
  const [treinos, setTreinosTemplate] = useState([]);
  const [refresh, setRefresh] = useState(false);
  db = useSQLiteContext();

  useEffect(() => {
    loadTreinosTemplate();
  }, [refresh]);

  useFocusEffect(
    React.useCallback(() => {
      loadTreinosTemplate();
      setRefresh(!refresh);
    }, [])
  );

  const iniciarTreinoTemplate = async (item) => {
    const result = getTreinosTemplateById(db, item.idTreinoTemplate);
    setExercises(result);
    setNomeTreino(item.treinonome);
    navigation.navigate('ExerciciosEscolhidos');
  };

  const loadTreinosTemplate = async () => {
    try {
      const results = await getTreinosTemplate(db);
      const treinosComExercicios = {};
      results.forEach(item => {
        if (!treinosComExercicios[item.idTreinoTemplate]) {
          treinosComExercicios[item.idTreinoTemplate] = {
            idTreinoTemplate: item.idTreinoTemplate,
            treinonome: item.treinonome,
            exercicios: []
          };
        }
        treinosComExercicios[item.idTreinoTemplate].exercicios.push({
          nome: item.exercicionome,
          qntSeries: item.qntSeries
        });
      });

      const treinosArray = Object.values(treinosComExercicios);
      setTreinosTemplate(treinosArray);
    } catch (error) {
      console.error('Erro ao carregar treinosTemplate', error);
    }
  };

  const iniciarTreinoVazio = () => {
    clearExercises();
    navigation.navigate('TelaNovoTreino');
  };

  const criarTreinoTemplate = () => {
    clearExercises();
    navigation.navigate('TelaNovoTemplate');
  };

  const renderItem = ({ item }) => (
    <View style={estilos.ItemContainer}>
      <TouchableOpacity onPress={() => iniciarTreinoTemplate(item)}>
        <Text style={estilos.TextoBold}>Nome: {item.treinonome}</Text>
        <Text style={estilos.texto}>Exercícios:</Text>
        <FlatList
          data={item.exercicios}
          renderItem={({ item: exercicio }) => (
            <View style={estilos.doladoExercicio}>
              <Text style={estilos.texto}>{exercicio.qntSeries} x </Text>
              <Text style={estilos.texto}>{exercicio.nome}</Text>
            </View>
          )}
          keyExtractor={(exercicio, index) => index.toString()}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={estilos.container}>
      {/*header*/}
      <View style={estilos.header}>
        <Image style={estilos.logo} source={require('../Styles/imgs/Logo.png')} />
      </View>
      {/*header*/}
      <View style={estilos.body}>
        <Pressable style={estilos.butao} onPress={iniciarTreinoVazio}>
          <Text style={estilos.bTexto}>Iniciar treino vazio</Text>
        </Pressable>
        <Text style={estilos.bTexto}>Treinos Salvos</Text>
        <ScrollView>
          <View style={[estilos.listaContainer]}>
            
            <View style={estilos.botaoVoltar}>
              <TouchableOpacity onPress={criarTreinoTemplate}>
                <Image source={require('../Styles/imgs/X.png')} style={estilos.botaoAdd} />
              </TouchableOpacity>
            </View>
            <View estilos={estilos.itens}>
              <FlatList
                data={treinos}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 70 }}
                keyExtractor={(item) => item.idTreinoTemplate.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      {/*Footer vvv*/}
      <View style={estilos.footer}>
        <View>
          <TouchableHighlight onPress={() => navigation.navigate('TelaHistorico')}>
            <Image source={require('../Styles/imgs/historico.png')} style={estilos.footerImgs} />
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={() => navigation.navigate('TelaHome')}>
            <Image source={require('../Styles/imgs/halter.png')} style={estilos.footerImgsAtivado} />
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={() => navigation.navigate('TelaPerfil')}>
            <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgs} />
          </TouchableHighlight>
        </View>
      </View>
      {/*Footer ^^^*/}
    </View>
  );
}
