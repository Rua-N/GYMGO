import { Component, useState, useEffect } from 'react';
import { View, Text, TextInput,FlatList  } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { estilos } from '../Styles/estilos';
import { createTables, insertValues, getValues, dropTable } from './database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getExercicios, migrateDbIfNeeded } from './database1';
export default function TelaNovoTreino(){
    const [exercicios, setExercicios] = useState([]);
    const db = useSQLiteContext();
    useEffect(() => {
        loadExercicios();
    
  }, []);

  const renderItem = ({ item }) => (
    <View>
        <Text style={estilos.texto}>{item.idexercicio} {item.nome}</Text>
    </View>


);
    const loadExercicios = async () =>{
        console.log('carregando exercicios');
        const results = await getExercicios(db);
        console.log('exercicios carregados', results);
        setExercicios(results);
    };

    return(  
        <View style={estilos.container}>
        <TextInput style={estilos.txtInput} placeholder="Procurar exercício" />
        <FlatList
          data={exercicios}
          renderItem={renderItem}
          keyExtractor={(item) => item.idExercicio.toString()}
        />
      </View>
    );
}