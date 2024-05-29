import React, { Component, useEffect, useState, useContext } from 'react';
import { View, Text,FlatList, Animated, TouchableOpacity, Image, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import { estilos } from '../Styles/estilos';
import { ExerciseContext } from './ExerciseContext';
import { deleteSeriesTemplate, deleteTreinosTemplate, getAllExercicios, getLastTreinoTemplate, getSeriesTemplate, getTreinosTemplate, getTreinosTemplateById, getTreinosTemplateFull } from './database1';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';

export default function TelaNovoTreino({ navigation }){

  const { exercises, setExercises, clearExercises } = useContext(ExerciseContext);
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
        // Perform any other actions when the screen is focused
      }, [])
    );
    
    const iniciarTreinoTemplate = async ( item ) =>{
      console.log(item.idTreinoTemplate);
      const result = getTreinosTemplateById(db, item.idTreinoTemplate);
//      console.log(result);
      setExercises(result);
      console.log(exercises);
      navigation.navigate('ExerciciosEscolhidos');
    };

    const loadTreinosTemplate = async () =>{
      console.log('carregando treinos');
      try {
          const results = await getTreinosTemplate(db);
          //console.log('treinos carregados', results);
          // Agrupar os exercícios pelo ID do treino
      const treinosComExercicios = {};
      results.forEach(item => {
        if (!treinosComExercicios[item.idTreinoTemplate]) {
          treinosComExercicios[item.idTreinoTemplate] = {
            idTreinoTemplate: item.idTreinoTemplate,
            treinonome: item.treinonome,
            exercicios: []
          };
        }
        treinosComExercicios[item.idTreinoTemplate].exercicios.push(item.exercicionome);
      });

      // Converter o objeto em uma matriz para fins de renderização
      const treinosArray = Object.values(treinosComExercicios);

      setTreinosTemplate(treinosArray);

        } catch (error) {
          console.error('Erro ao carregar treinosTemplate', error);
        }
      };
   
    
    iniciarTreinoVazio = () => {
      clearExercises();
      navigation.navigate('TelaNovoTreino');
    };
    criarTreinoTemplate = () => {
      clearExercises();
      navigation.navigate('TelaNovoTemplate');
    };

    const renderItem = ({ item }) => (
      
      <View style={estilos.unselectedItemContainer}>
        <TouchableOpacity onPress={() => iniciarTreinoTemplate(item)}>
        <Text style={estilos.bTexto}>ID: {item.idTreinoTemplate}</Text>
        <Text >Nome: {item.treinonome}</Text>
        <Text style={estilos.texto}>Exercícios:</Text>
        <FlatList
          data={item.exercicios}
          renderItem={({ item: exercicio }) => (
            <Text style={estilos.texto}>{exercicio}</Text>
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
        <Image style={estilos.logo}source={require('../Styles/imgs/Logo.png')}/>
      </View>  
      {/*header*/}
       <View style={estilos.body}> 
        <Pressable style={estilos.butao} onPress={iniciarTreinoVazio}>
          <Text style={estilos.bTexto}>Iniciar treino vazio</Text>
        </Pressable>
        
        <TouchableOpacity onPress={this.toggleList1}>
          <Text style={estilos.bTexto}>Treinos Salvos</Text>
        </TouchableOpacity>
        
        <Animated.View style={[estilos.listaContainer]}>
          {/* Botão Criar novo Template */}
                <View>
                  <TouchableOpacity  
                onPress={criarTreinoTemplate}
              >
                <Image source={require('../Styles/imgs/X.png')} style={estilos.botaoAdd} />
              </TouchableOpacity>
                </View>
          <View estilos={estilos.itens}>
          <FlatList
            data={treinos}
            renderItem={renderItem}
            keyExtractor={(item) => item.idTreinoTemplate.toString()}
          />
          </View>
          {/* Adicione mais itens conforme necessário */}
        </Animated.View>
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