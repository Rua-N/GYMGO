import { Component, useState, useEffect,  } from 'react';
import { View, Text, TextInput,FlatList ,TouchableOpacity,Image,Pressable } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { estilos } from '../Styles/estilos';
import { createTables, insertValues, getValues, dropTable } from './database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getExercicios, migrateDbIfNeeded } from './database1';




export default function TelaNovoTreino({ navigation }){
    const [exercicios, setExercicios] = useState([]);
    const db = useSQLiteContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercicios, setFilteredExercicios] = useState([]);
    const [selectedExercicios, setSelectedExercicios] = useState([]);



    useEffect(() => {
        loadExercicios();
  }, []);

  /*||DESATUALIZADO||
  Quando aperta no exercicio
  const handleItemPress = (item) => {
    console.log('Item escolhido:', item.nome.toString());
    // Handle item press logic here
  };*/

  const toggleSelection = (item) => {
    setSelectedExercicios(prevSelected => {
      if (prevSelected.includes(item.idExercicio)) {
        return prevSelected.filter(id => id !== item.idExercicio);
      } else {
        return [...prevSelected, item.idExercicio];
      }
    });
  };
  const handleFinalizeSelection = () => {
    const selectedItems = exercicios.filter(item => selectedExercicios.includes(item.idExercicio));
    console.log('Selected exercises:', selectedItems);
    navigation.navigate('ExerciciosEscolhidos', { selectedExercises: selectedItems });
  };


//Método de filtragem de exercicios
const handleSearch = (query) => {
  setSearchQuery(query);
  if (query === '') {
    setFilteredExercicios(exercicios);  // Reseta os exercicios se a pesquisa for vazia
  } 
  else {
    const filtered = exercicios.filter(item => 
      item.nome.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredExercicios(filtered);
  }
};

//Carrega os exercicios do banco de dados
const loadExercicios = async () =>{
    console.log('carregando exercicios');
    const results = await getExercicios(db);
    console.log('exercicios carregados', results);
    setExercicios(results);
    setFilteredExercicios(results);  
};
  //Método de renderização da lista de exercicios
  const renderItem = ({ item }) => {
    const isSelected = selectedExercicios.includes(item.idExercicio);
    return(
    <View>
      <TouchableOpacity onPress={() => toggleSelection(item)}> 
      <View style={[estilos.unselectedItemContainer, isSelected && estilos.selectedItemContainer]}>
        <View style={estilos.dolado}>
          <Text style={estilos.texto}>{item.idexercicio} {item.nome}</Text> 
        </View>
      </View>  
      </TouchableOpacity>
    </View>
    );
  };
    return(  
    <View style={estilos.container}>
        {/*header*/}
      <View style={estilos.header}>  
        <Pressable onPress={() => navigation.navigate('TelaHome')}>    
          <View style={estilos.botaoVoltar}>
            <Image style={estilos.setaVoltar} source={require('../Styles/imgs/voltar.png')}/>
          </View>
        </Pressable>	
      </View>  
      {/*header*/}
      <View style={estilos.body}>
        <TextInput 
        style={estilos.txtInput} 
        placeholder="Procurar exercício"
        value={searchQuery}
        onChangeText={handleSearch}
      />
        <FlatList
          data={filteredExercicios}
          renderItem={renderItem}
          keyExtractor={(item) => item.idExercicio.toString()}
        />
        <TouchableOpacity onPress={handleFinalizeSelection}
        style={estilos.butao}>
          <Text style={estilos.bTexto}>Escolher Exercícios</Text>
        </TouchableOpacity>
      </View>
      </View>     
    );
}