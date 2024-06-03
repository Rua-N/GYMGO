import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import { estilos } from '../Styles/estilos';

function TelaInfoHistorico({ navigation,route }) {
  const { treino } = route.params;

  return (
    <View style={estilos.container}>
      {/*header*/}
      <View style={estilos.header}>  
        <Pressable onPress={() => navigation.navigate('TelaHistorico')}>    
          <View style={estilos.botaoVoltar}>
            <Image style={estilos.setaVoltar} source={require('../Styles/imgs/voltar.png')}/>
          </View>
        </Pressable>	
      </View>  
      {/*header*/}
      <View style={estilos.body}> 
      <Text style={estilos.TextoBold}>{treino.treinonome}</Text>
      <Text style={estilos.texto}>Data: {treino.dataTreino}</Text>
      <FlatList
        data={treino.exercicios}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <Text style={estilos.itemText}>{item.nome}</Text>
            {item.series.map((serie, index) => (
              <Text key={index} style={estilos.texto}>{serie.kg} kg x {serie.repetitions} reps</Text>
            ))}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    </View>
  );
}

export default TelaInfoHistorico;
