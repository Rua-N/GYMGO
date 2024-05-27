import { Component, useState, useEffect,  useContext} from 'react';
import { View, Text, TextInput,FlatList ,TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { estilos } from '../Styles/estilos';
import { createTables, insertValues, getValues, dropTable } from './database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getExercicios, migrateDbIfNeeded } from './database1';
import { ExerciseContext } from './ExerciseContext';



export default function TelaNovoTreino({ navigation }){
    const [exercicios, setExercicios] = useState([]);
    const db = useSQLiteContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercicios, setFilteredExercicios] = useState([]);
    const { exercises, setExercises } = useContext(ExerciseContext);
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
        removeExercise(item.idExercicio);
        return prevSelected.filter(id => id !== item.idExercicio);
      } else {
        return [...prevSelected, item.idExercicio];
      }
    });
  };
  const handleFinalizeSelection = () => {
    const selectedItems = exercicios.filter(item => selectedExercicios.includes(item.idExercicio));
    
    // Adiciona apenas novos exercícios, sem duplicar os já existentes
    const updatedExercises = [...exercises];
    selectedItems.forEach(selectedItem => {
      if (!updatedExercises.some(exercise => exercise.idExercicio === selectedItem.idExercicio)) {
        updatedExercises.push(selectedItem);
      }
    });

    setExercises(updatedExercises);
    navigation.navigate('ExerciciosEscolhidos');
  };


  const removeExercise = (exerciseId) => {
    const updatedExercises = exercises.filter(exercise => exercise.idExercicio !== exerciseId);
    setExercises(updatedExercises);
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
        style={estilos.buttonGeneric}>
          <Text>Escolher Exercícios</Text>
        </TouchableOpacity>
      </View>
      
    );
}