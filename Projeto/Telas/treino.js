import { Component, useState, useEffect,  } from 'react';
import { View, Text, TextInput,FlatList ,TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { estilos } from '../Styles/estilos';
import { createTables, insertValues, getValues, dropTable } from './database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getExercicios, migrateDbIfNeeded } from './database1';
export default function TelaNovoTreino(){
    const [exercicios, setExercicios] = useState([]);
    const db = useSQLiteContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercicios, setFilteredExercicios] = useState([]);


    useEffect(() => {
        loadExercicios();
  }, []);

  //Quando aperta no exercicio
  const handleItemPress = (item) => {
    console.log('Item escolhido:', item.nome.toString());
    // Handle item press logic here
  };

  //Método de renderização da lista de exercicios
  const renderItem = ({ item }) => (
    <View>
      
      <View style={estilos.teste}>
        <View style={estilos.dolado}>
        
          <Text style={estilos.texto}>{item.idexercicio} {item.nome}</Text>
          <TouchableOpacity style={estilos.botaoAdicionar} onPress={() => handleItemPress(item)}>
            <Text style={estilos.bTexto}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>  
    </View>
);

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

    return(  
        <View style={estilos.container}>
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
      </View>
    );
}