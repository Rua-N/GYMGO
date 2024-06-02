import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { estilos } from '../Styles/estilos';

function TelaInfoHistorico({ route }) {
  const { treino } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{treino.treinonome}</Text>
      <Text style={styles.subtitle}>Data: {treino.dataTreino}</Text>
      <FlatList
        data={treino.exercicios}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.nome}</Text>
            {item.series.map((serie, index) => (
              <Text key={index} style={styles.seriesText}>{serie.kg} kg x {serie.repetitions} reps</Text>
            ))}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  seriesText: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default TelaInfoHistorico;
