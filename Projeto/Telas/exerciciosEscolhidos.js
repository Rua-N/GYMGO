import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput,Image} from 'react-native';
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
    <View style={estilos.exerciseContainer}>
      <Text style={estilos.exerciseTitle}>{item.nome}</Text>
      {item.series && item.series.map((series, index) => (
        <View key={index} style={estilos.seriesContainer}>
          <Text style={estilos.seriesText}>Série {index + 1}</Text>
          <TextInput
            style={estilos.seriesInput}
            placeholder="KG"
            value={series.kg}
            onChangeText={(text) => updateSeries(item.idExercicio, index, 'kg', text)}
          />
          <TextInput
            style={estilos.seriesInput}
            placeholder="Repetições"
            value={series.repetitions}
            onChangeText={(text) => updateSeries(item.idExercicio, index, 'repetitions', text)}
          />
        </View>
      ))}
      <Pressable onPress={() => addSeries(item.idExercicio)}>
        <Text style={estilos.addSeriesButton}>Adicionar Série</Text>
      </Pressable>
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
      {/*header*/}
      <View style={estilos.header}>  
        <Pressable onPress={() => navigation.navigate('TelaHome')}>    
          <View style={estilos.botaoVoltar}>
            <Image style={estilos.botaoFechar} source={require('../Styles/imgs/X.png')}/>
          </View>
        </Pressable>	
      </View>  
      {/*header*/}
      <View style={estilos.body}>
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.idExercicio.toString()}
      />
      <View style={estilos.footer}> 
        <Pressable style={estilos.finalizeButton} onPress={handleFinalizeTraining}>
          <Text style={estilos.bTexto}>Finalizar Treino</Text>
        </Pressable>
        
        <Pressable style={estilos.finalizeButton} onPress={() => navigation.navigate('TelaNovoTreino', { selectedExercises: exercises })}>
          <Text style={estilos.bTexto}>Adicionar Exercício</Text>
        </Pressable>
      </View>
      </View>
    </View>
  );
}

