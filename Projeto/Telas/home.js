import React, { Component, useEffect, useState, useContext } from 'react';
import { View, Text,FlatList, Animated, TouchableOpacity, Image, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import { estilos } from '../Styles/estilos';
import { ExerciseContext } from './ExerciseContext';
import { deleteTreinosTemplate, getTreinosTemplate } from './database1';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';

export default function TelaNovoTreino({ navigation }){

  const { exercises, setExercises, clearExercises } = useContext(ExerciseContext);
  const [treinos, setTreinosTemplate] = useState([]);
  db = useSQLiteContext();

    useEffect(() => {
      loadTreinosTemplate();
    }, []);


    useFocusEffect(
      React.useCallback(() => {
        loadTreinosTemplate();
        console.log('Tela ganhou foco');
        // Perform any other actions when the screen is focused
      }, [])
    );
  

    const loadTreinosTemplate = async () =>{
      console.log('carregando treinos');
      try {
          const results = await getTreinosTemplate(db);
          console.log('treinos carregados', results);
          setTreinosTemplate(results);
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
        <Text style={estilos.bTexto}>ID: {item.idTreinoTemplate}</Text>
        <Text style={estilos.texto}>Nome: {item.nome}</Text>
        <Text style={estilos.texto}>EXERCICIOS...</Text>
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