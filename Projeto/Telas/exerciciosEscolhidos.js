import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { estilos } from '../Styles/estilos';

export default function ExerciciosEscolhidos({ route, navigation }) {
  const { selectedExercises } = route.params;
  const [exercises, setExercises] = useState(selectedExercises);

  const addSeries = (exerciseId) => {
    const updatedExercises = exercises.map(exercise => {
      if (exercise.idExercicio === exerciseId) {
        return { ...exercise, series: [...(exercise.series || []), { kg: '', repetitions: '' }] };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const updateSeries = (exerciseId, seriesIndex, field, value) => {
    const updatedExercises = exercises.map(exercise => {
      if (exercise.idExercicio === exerciseId) {
        const updatedSeries = exercise.series.map((series, index) => {
          if (index === seriesIndex) {
            return { ...series, [field]: value };
          }
          return series;
        });
        return { ...exercise, series: updatedSeries };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseTitle}>{item.nome}</Text>
      {item.series && item.series.map((series, index) => (
        <View key={index} style={styles.seriesContainer}>
          <Text style={styles.seriesText}>Série {index + 1}</Text>
          <TextInput
            style={styles.seriesInput}
            placeholder="KG"
            value={series.kg}
            onChangeText={(text) => updateSeries(item.idExercicio, index, 'kg', text)}
          />
          <TextInput
            style={styles.seriesInput}
            placeholder="Repetições"
            value={series.repetitions}
            onChangeText={(text) => updateSeries(item.idExercicio, index, 'repetitions', text)}
          />
        </View>
      ))}
      <TouchableOpacity onPress={() => addSeries(item.idExercicio)}>
        <Text style={styles.addSeriesButton}>Adicionar Série</Text>
      </TouchableOpacity>
    </View>
  );

  const handleFinalizeTraining = () => {
    console.log('Treino Finalizado:');
    exercises.forEach(exercise => {
      console.log('Exercício:', exercise.nome);
      if (exercise.series) {
        exercise.series.forEach((series, index) => {
          console.log(`Série ${index + 1}: Peso = ${series.kg}, Repetições = ${series.repetitions}`);
        });
      }
    });
    // Aqui você pode inserir a lógica para salvar os dados no banco de dados
  };

  return (
    <View style={estilos.container}>
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.idExercicio.toString()}
      />
      <TouchableOpacity 
        style={styles.finalizeButton}
        onPress={handleFinalizeTraining}
      >
    
        <Text style={styles.finalizeButtonText}>Finalizar Treino</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.addExerciseButton}
        onPress={() => navigation.navigate('TelaNovoTreino', { selectedExercises: exercises })}
      >
        <Text style={styles.addExerciseButtonText}>Adicionar Exercício</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  seriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  seriesText: {
    color: '#fff',
  },
  seriesInput: {
    flex: 1,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    color: '#fff',
  },
  addSeriesButton: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
  addExerciseButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },

  finalizeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  finalizeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
