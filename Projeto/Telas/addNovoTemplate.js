import { Component, useState, useEffect,  useContext} from 'react';
import { Alert, View, Text, TextInput,FlatList ,TouchableOpacity, Image,Pressable } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { estilos } from '../Styles/estilos';
import { createTables, insertValues, getValues, dropTable } from './database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getExercicios, migrateDbIfNeeded } from './database1';
import { ExerciseContext } from './ExerciseContext';



export default function TelaNovoTemplate({ navigation }){
    const [exercicios, setExercicios] = useState([]);
    const db = useSQLiteContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercicios, setFilteredExercicios] = useState([]);
    const { exercises, setExercises } = useContext(ExerciseContext);
    const [selectedExercicios, setSelectedExercicios] = useState([]);



    useEffect(() => {
        loadExercicios();
  }, []);

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
    navigation.navigate('ExerciciosEscolhidosTemplate');
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
        {/*header*/}
      <View style={estilos.header}>  
        <Pressable onPress={handleBackToHome}>    
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
        placeholderTextColor='#eeeeee80'
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