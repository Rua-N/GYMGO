import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Pressable, Image } from 'react-native';
import { estilos } from '../Styles/estilos';
import { ExerciseContext } from './ExerciseContext';
import { useSQLiteContext } from 'expo-sqlite';
import { saveTreinoVazio, saveSerie, getSeries, saveTreinoTemplate, saveSerieTemplate, getTreinosTemplate } from './database1';

export default function ExerciciosEscolhidosTemplate({ navigation }) {
  const db = useSQLiteContext();
  const { exercises, setExercises } = useContext(ExerciseContext);
  const [localExercises, setLocalExercises] = useState(exercises);
  const today = new Date();
  const [nomeTreino, setNomeTreino] = useState('');

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}-${month}-${year}`;
  }
  const handleNomeChange = (text) => {
    setNomeTreino(text); // Atualiza o estado com o valor do TextInput
  };

  useEffect(() => {
    console.log(getTreinosTemplate(db));
    setLocalExercises(exercises);
  }, [exercises]);

  const addSeries = (exerciseId) => {
    const updatedExercises = localExercises.map(exercise => {
      if (exercise.idExercicio === exerciseId) {
        return { ...exercise, series: [...(exercise.series || []), { kg: '', repetitions: '' }] };
      }
      return exercise;
    });
    setLocalExercises(updatedExercises);
    setExercises(updatedExercises);
  };

  const updateSeries = (exerciseId, seriesIndex, field, value) => {
    const updatedExercises = localExercises.map(exercise => {
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
    setLocalExercises(updatedExercises);
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
    console.log(nomeTreino);
    localExercises.forEach(exercise => {
      console.log('Exercício:', exercise.nome);
      saveTreinoTemplate(db, nomeTreino);
      if (exercise.series) {
        const totalSeries = exercise.series.length; 
        saveSerieTemplate(db, exercise.idExercicio, totalSeries);
        console.log('Número total de séries:', totalSeries);
      }
    });
    // Aqui você pode inserir a lógica para salvar os dados no banco de dados
  };

  return (
    <View style={estilos.container}>
      
      {/*header*/}
      <View style={estilos.header}>  
      <TextInput
        
        value={nomeTreino} // Vincula o valor do TextInput ao estado
        onChangeText={handleNomeChange} // Atualiza o estado quando o texto muda
        placeholder="Nome do treino"
      />
        <Pressable onPress={() => navigation.navigate('TelaHome')}>    
          <View style={estilos.botaoVoltar}>
            <Image style={estilos.botaoFechar} source={require('../Styles/imgs/X.png')}/>
          </View>
        </Pressable>	
      </View>  
      {/*header*/}
      <View style={estilos.body}>
      <FlatList
        data={localExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.idExercicio.toString()}
      />
      <View style={estilos.footer}> 
        <Pressable style={estilos.finalizeButton} onPress={handleFinalizeTraining}>
          <Text style={estilos.bTexto}>Salvar Treino</Text>
        </Pressable>
        
        <Pressable style={estilos.finalizeButton} onPress={() => navigation.navigate('TelaNovoTemplate', { selectedExercises: exercises })}>
          <Text style={estilos.bTexto}>Adicionar Exercício</Text>
        </Pressable>
      </View>
      </View>
    </View>
  );
}
