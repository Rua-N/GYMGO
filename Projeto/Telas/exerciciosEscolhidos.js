import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Pressable, Image } from 'react-native';
import { estilos } from '../Styles/estilos';
import { ExerciseContext } from './ExerciseContext';
import { useSQLiteContext } from 'expo-sqlite';
import { saveTreinoVazio, saveSerie, getSeries } from './database1';

export default function ExerciciosEscolhidos({ navigation }) {
  const db = useSQLiteContext();
  const { exercises, setExercises } = useContext(ExerciseContext);
  const [localExercises, setLocalExercises] = useState([]);

  useEffect(() => {
    // Inicializar localExercises com as séries vazias baseadas em qntSeries
    const initializeExercises = exercises.map(exercise => {
      if (exercise.qntSeries) {
        const series = Array.from({ length: exercise.qntSeries }, () => ({ kg: '', repetitions: '' }));
        return { ...exercise, series };
      }
      return exercise;
    });
    setLocalExercises(initializeExercises);
  }, [exercises]); // <-- Linha modificada/adicionada

  const today = new Date();
  
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}-${month}-${year}`;
  }

  const addSeries = (exerciseId) => {
    const updatedExercises = localExercises.map(exercise => {
      if (exercise.idExercicio === exerciseId) {
        return { ...exercise, series: [...(exercise.series || []), { kg: '', repetitions: '' }] };
      }
      return exercise;
    });
    setLocalExercises(updatedExercises);
    setExercises(updatedExercises); // <-- Linha modificada/adicionada
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
    setExercises(updatedExercises); // <-- Linha modificada/adicionada
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
            onChangeText={(text) => updateSeries(item.idExercicio, index, 'kg', text)} // <-- Linha modificada/adicionada
          />
          <TextInput
            style={estilos.seriesInput}
            placeholder="Repetições"
            value={series.repetitions}
            onChangeText={(text) => updateSeries(item.idExercicio, index, 'repetitions', text)} // <-- Linha modificada/adicionada
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
    saveTreinoVazio(db, getDate());
    localExercises.forEach(exercise => {
      console.log('Exercício:', exercise.nome);
      
      if (exercise.series) {
        exercise.series.forEach((series, index) => {
          saveSerie(db, exercise.idExercicio, series.kg, series.repetitions);
          console.log('salvando: ' + exercise.idExercicio, series.kg, series.repetitions)
          //console.log(`Série ${index + 1}: Peso = ${series.kg}, Repetições = ${series.repetitions}`);
        });
      }
      console.log(getSeries(db))
    });
    navigation.navigate('TelaHome');
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
        data={localExercises}
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
