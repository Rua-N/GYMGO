import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableHighlight, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { estilos } from '../Styles/estilos';
import { getTreinos } from './database1';
import { useSQLiteContext } from 'expo-sqlite';

function TelaHistorico({ navigation }) {
  const [treinos, setTreinos] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    loadTreinos();
  }, []);

  const loadTreinos = async () => {
    console.log('carregando treinos');
    try {
      const results = await getTreinos(db);
      console.log('treinos carregados', results);

      const treinosComExercicios = {};
      results.forEach(item => {
        if (!treinosComExercicios[item.idTreino]) {
          treinosComExercicios[item.idTreino] = {
            idTreino: item.idTreino,
            treinonome: item.treinonome,
            dataTreino: item.dataTreino,
            exercicios: {}
          };
        }

        if (!treinosComExercicios[item.idTreino].exercicios[item.exercicionome]) {
          treinosComExercicios[item.idTreino].exercicios[item.exercicionome] = {
            nome: item.exercicionome,
            qntSeries: 0,
            series: []
          };
        }

        treinosComExercicios[item.idTreino].exercicios[item.exercicionome].qntSeries++;
        treinosComExercicios[item.idTreino].exercicios[item.exercicionome].series.push({
          kg: item.kg,
          repetitions: item.repetitions
        });
      });

      const treinosArray = Object.values(treinosComExercicios).map(treino => ({
        ...treino,
        exercicios: Object.values(treino.exercicios)
      }));

      setTreinos(treinosArray);
    } catch (error) {
      console.error('Erro ao carregar treinos', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={estilos.ItemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('TelaInfoHistorico', { treino: item })}>
        <Text style={estilos.TextoBold}>{item.dataTreino}</Text>
        <Text style={estilos.TextoBold}>Nome: {item.treinonome}</Text>
        <Text style={estilos.texto}>Exercícios:</Text>
        <FlatList
          data={item.exercicios}
          renderItem={({ item: exercicio }) => (
            <View>
              <Text style={estilos.texto}>{exercicio.qntSeries} x {exercicio.nome}</Text>
            </View>
          )}
          keyExtractor={(exercicio, index) => index.toString()}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={treinos}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyExtractor={(item) => item.idTreino.toString()}
      />
      <View style={estilos.footer}>
        <View>
          <TouchableHighlight onPress={() => navigation.navigate('TelaHistorico')}>
            <Image source={require('../Styles/imgs/historico.png')} style={estilos.footerImgsAtivado} />
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={() => navigation.navigate('TelaHome')}>
            <Image source={require('../Styles/imgs/halter.png')} style={estilos.footerImgs} />
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={() => navigation.navigate('TelaPerfil')}>
            <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgs} />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaHistorico;