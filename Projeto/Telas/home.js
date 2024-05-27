import React, { Component, useEffect, useState } from 'react';
import { View, Text,FlatList, Animated, TouchableOpacity, Image, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import { estilos } from '../Styles/estilos';
import { ExerciseContext } from './ExerciseContext';
import { getTreinosTemplate } from './database1';
import { useSQLiteContext } from 'expo-sqlite';
const TelaHome = () => {
  const [treinos, setTreinosTemplate] = useState([]);
  db = useSQLiteContext();

    useEffect(() => {
      loadTreinosTemplate();
    }, []);

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
      const { clearExercises } = this.context;
      clearExercises();
      this.props.navigation.navigate('TelaNovoTreino');
    };
    criarTreinoTemplate = () => {
      const { clearExercises } = this.context;
      clearExercises();
      this.props.navigation.navigate('TelaNovoTemplate');
    };

    const renderItem = ({ item }) => (
      <View>
        <Text>ID: {item.idTreinoTemplate}</Text>
        <Text>Nome: {item.nome}</Text>
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
          <Text>Treinos Salvos</Text>
        </TouchableOpacity>
        
        <Animated.View style={[estilos.listaContainer]}>
          {/* Botão Criar novo Template */}
                <View>
                  <TouchableOpacity  
                onPress={criarTreinoTemplate}
              >
                <Text>+</Text>
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
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaHistorico')}>
              <Image source={require('../Styles/imgs/historico.png')} style={estilos.footerImgs} />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaHome')}>
              <Image source={require('../Styles/imgs/halter.png')} style={estilos.footerImgsAtivado} />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaPerfil')}>
              <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgs} />
            </TouchableHighlight>
          </View>
        </View>
        {/*Footer ^^^*/}
      </View>
    );
  }
  export default TelaHome;