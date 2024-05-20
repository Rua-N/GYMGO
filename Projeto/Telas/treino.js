import { Component } from "react";
import { Text, View,TextInput } from "react-native";
import {estilos} from '../Styles/estilos'

export default class TelaNovoTreino extends Component{
    render(){
    return(   
    <View style={estilos.container}>
        <TextInput style={estilos.txtInput} placeholder="Procurar exercício"></TextInput>
    </View>
    );
}}