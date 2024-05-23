import React, { useState } from 'react';

import { SafeAreaView, FlatList,TextInput, Text, View, Pressable,ScrollView } from 'react-native';

import {estilos} from '../Styles/estilos'


const ListaExercicios = () => {
    const [exercicios, setExercicios] = useState([
        { id: '1', nome: 'Supino' },
        { id: '2', nome: 'Agachamento' },
        { id: '3', nome: 'Levantamento Terra' },
        { id: '4', nome: 'Rosca Direta' },
        { id: '5', nome: 'Desenvolvimento de Ombros' },
        { id: '6', nome: 'Barra Fixa' },
        { id: '7', nome: 'Leg Press' },
        { id: '8', nome: 'Crucifixo' },
        { id: '9', nome: 'Pulley' },
        { id: '10', nome: 'Tríceps no Corda' }
    ]);


const renderItem = ({ item }) => (
    <View style={estilos.teste}>
        <View style={estilos.dolado}>
            <Text style={estilos.texto}>{item.nome}</Text>
            <Pressable style={estilos.botaoAdicionar}>
              <Text style={estilos.bTexto}>Adicionar</Text>
            </Pressable>
        </View>
    </View>
);



return(
<View>
    <TextInput style={estilos.txtInput} placeholder="Procurar exercício"></TextInput>
    <SafeAreaView>
    <FlatList 
    data={exercicios}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    />
</SafeAreaView>
</View>
);
};
export default ListaExercicios;