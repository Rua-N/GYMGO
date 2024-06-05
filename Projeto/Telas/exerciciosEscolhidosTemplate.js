import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Pressable, Image } from 'react-native';
import { estilos } from '../Styles/estilos';
import { ExerciseContext } from './ExerciseContext';
import { useSQLiteContext } from 'expo-sqlite';
import { saveTreinoVazio, saveSerie, getSeries, saveTreinoTemplate, saveSerieTemplate, getTreinosTemplate, getLastTreinoTemplate } from './database1';
import { ScrollView } from 'react-native-gesture-handler';

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

  const removeSeries = (exerciseId) => {
    const updatedExercises = localExercises.map(exercise => {
      if (exercise.idExercicio === exerciseId && exercise.series.length > 0) {
        const newSeries = exercise.series.slice(0, -1); // Remove a última série
        return { ...exercise, series: newSeries };
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
            placeholderTextColor='#eeeeee80'
            keyboardType='numeric'
            value={series.kg}
            editable={false} 
          />
          <TextInput
            style={estilos.seriesInput}
            placeholder="Repetições"
            placeholderTextColor='#eeeeee80'
            keyboardType='numeric'
            value={series.repetitions}
            editable={false} 
          />
        </View>
      ))}
      <View style={estilos.seriesButtonsContainer}>
        <Pressable onPress={() => addSeries(item.idExercicio)}>
        <Text style={estilos.addSeriesButton}>Adicionar Série</Text>
        </Pressable>
        {item.series && item.series.length > 0 && (
          <Pressable onPress={() => removeSeries(item.idExercicio)}>
            <Text style={estilos.removeSeriesButton}>Remover Série</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  const handleFinalizeTraining = () => {
    console.log('Treino Finalizado:');
    console.log(nomeTreino);
    saveTreinoTemplate(db, nomeTreino);
    localExercises.forEach(exercise => {
      console.log('Exercício:', exercise.nome);
      
      if (exercise.series) {
        const totalSeries = exercise.series.length; 
        
        saveSerieTemplate(db, exercise.idExercicio, totalSeries);
        console.log('Número total de séries:', totalSeries);
      }
    });
    navigation.navigate('TelaHome');
    // Aqui você pode inserir a lógica para salvar os dados no banco de dados
  };

  return (
    <View style={estilos.container}>
      
      {/*header*/}
      <View style={estilos.doladoHeader}>  
      
        <Pressable onPress={() => navigation.navigate('TelaHome')}>    
          <View style={estilos.botaoVoltar}>
            <Image style={estilos.botaoFechar} source={require('../Styles/imgs/X.png')}/>
          </View>
        </Pressable>
        <TextInput
          style={estilos.input}
          value={nomeTreino} // Vincula o valor do TextInput ao estado
          onChangeText={handleNomeChange} // Atualiza o estado quando o texto muda
          placeholder="Nome do treino"
          placeholderTextColor='#eeeeee80'
        />	
      </View>  
      {/*header*/}
      <View style={estilos.body}>
        <FlatList 
          data={localExercises}
          renderItem={renderExercise}
          keyExtractor={(item) => item.idExercicio.toString()}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      </View>
      <View style={estilos.footer}> 
        <Pressable style={estilos.finalizeButton} onPress={handleFinalizeTraining}>
          <Text style={estilos.bTexto}>Salvar Treino</Text>
        </Pressable>
        
        <Pressable style={estilos.finalizeButton} onPress={() => navigation.navigate('TelaNovoTemplate', { selectedExercises: exercises })}>
          <Text style={estilos.bTexto}>Mudar Exercícios</Text>
        </Pressable>
      </View>
    </View>
  );
}
