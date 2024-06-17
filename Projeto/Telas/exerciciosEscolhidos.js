import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Pressable, Image, Alert } from 'react-native';
import { estilos } from '../Styles/estilos';
import { ExerciseContext } from './ExerciseContext';
import { useSQLiteContext } from 'expo-sqlite';
import { saveTreinoVazio, saveSerie, getLastSeriesByExercise } from './database1';

export default function ExerciciosEscolhidos({ navigation }) {
  const db = useSQLiteContext();
  const { exercises, setExercises, nomeTreino: nomeTreinoContext, setNomeTreino } = useContext(ExerciseContext);
  const [localExercises, setLocalExercises] = useState([]);
  const [nomeTreino, setNomeTreinoState] = useState(nomeTreinoContext || 'Treino Vazio');

  useEffect(() => {
    initializeExercises();
  }, [exercises]);

  useEffect(() => {
    setNomeTreinoState(nomeTreinoContext);
  }, [nomeTreinoContext]);

  const initializeExercises = async () => {
    const initializedExercises = await Promise.all(exercises.map(async (exercise) => {
      let series = exercise.series || [];
      let initializedAutomatically = false;
      if (series.length === 0 && exercise.qntSeries) {
        series = Array.from({ length: exercise.qntSeries }, () => ({ kg: '', repetitions: '' }));
        initializedAutomatically = true;
      }
      const previousSeries = await getLastSeriesByExercise(db, exercise.idExercicio);
      return { ...exercise, series, previousSeries, initializedAutomatically };
    }));
    setLocalExercises(initializedExercises);
  };

  const addSeries = (exerciseId) => {
    const updatedExercises = localExercises.map(exercise => {
      if (exercise.idExercicio === exerciseId) {
        const newSeries = [...(exercise.series || []), { kg: '', repetitions: '' }];
        return { ...exercise, series: newSeries };
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
    if (field === 'kg') {
      // Remover caracteres inválidos, permitindo apenas números, ponto e vírgula
      value = value.replace(/[^0-9.,]/g, '');
  
      // Substituir vírgulas por pontos
      value = value.replace(',', '.');
  
      // Permitir apenas um único ponto decimal
      if ((value.match(/\./g) || []).length > 1) {
        return;
      }
    } else if (field === 'repetitions') {
      // Permitir apenas números inteiros
      value = value.replace(/[^0-9]/g, '');
    }
  
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
          <Text style={estilos.seriesText}> Anterior: 
            {item.previousSeries && item.previousSeries[index] 
              ? `${item.previousSeries[index].kg} kg x ${item.previousSeries[index].repetitions}` 
              : '-'}
          </Text>
          <TextInput
            style={estilos.seriesInput}
            placeholder="KG"
            placeholderTextColor='#eeeeee80'
            keyboardType='numeric'
            value={series.kg}
            onChangeText={(text) => updateSeries(item.idExercicio, index, 'kg', text)}
          />
          <TextInput
            style={estilos.seriesInput}
            placeholder="Reps"
            placeholderTextColor='#eeeeee80'
            keyboardType='numeric'
            value={series.repetitions}
            onChangeText={(text) => updateSeries(item.idExercicio, index, 'repetitions', text)}
          />
        </View>
      ))}
      {!item.initializedAutomatically && (
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
      )}
    </View>
  );

  const handleFinalizeTraining = () => {
    Alert.alert(
      'Deseja finalizar o treino?',
      '',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => finalizeTraining() }
      ]
    );
  };

  const finalizeTraining = () => {
    console.log('Treino Finalizado:');
    saveTreinoVazio(db, getDate(), nomeTreino);

    localExercises.forEach(exercise => {
      console.log('Exercício:', exercise.nome);

      if (exercise.series) {
        exercise.series.forEach((series, index) => {
          if (series.kg && series.repetitions) { // Verificação para garantir que a série tenha valores
            saveSerie(db, exercise.idExercicio, series.kg, series.repetitions);
            console.log('Salvando:', exercise.idExercicio, series.kg, series.repetitions);
          } else {
            console.log('Série ignorada por falta de valores:', series);
          }
        });
      }
    });

    navigation.navigate('TelaHome');
  };

  const handleBackToHome = () => {
    Alert.alert(
      'Realmente deseja sair?',
      'O progresso será perdido',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => navigation.navigate('TelaHome') }
      ]
    );
  };

  const handleNomeChange = (text) => {
    setNomeTreinoState(text);
    setNomeTreino(text); // Atualiza o nome no contexto também
  };

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}-${month}-${year}`;
  };

  const allSeriesInitializedAutomatically = localExercises.every(exercise => exercise.initializedAutomatically);

  return (
    <View style={estilos.container}>
      <View style={estilos.doladoHeader}> 
        <Pressable onPress={handleBackToHome}>    
          <View style={estilos.botaoVoltar}>
            <Image style={estilos.botaoFechar} source={require('../Styles/imgs/X.png')}/>
          </View>
        </Pressable>
        <TextInput 
          style={estilos.input}
          value={nomeTreino}
          onChangeText={handleNomeChange}
          placeholder="Nome do treino"
          placeholderTextColor='#eeeeee80'
        />  
      </View>
      
      <View style={estilos.body}>
        <FlatList
          data={localExercises}
          renderItem={renderExercise}
          contentContainerStyle={{ paddingBottom: 70 }}
          keyExtractor={(item) => item.idExercicio.toString()}
        />
        <View style={estilos.footer}> 
          <Pressable style={estilos.finalizeButton} onPress={handleFinalizeTraining}>
            <Text style={estilos.bTexto}>Finalizar Treino</Text>
          </Pressable>
          {!allSeriesInitializedAutomatically && (
            <Pressable style={estilos.finalizeButton} onPress={() => navigation.navigate('TelaNovoTreino', { selectedExercises: exercises })}>
              <Text style={estilos.bTexto}>Mudar Exercícios</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
