import { Component, useEffect, useState, } from "react";
import {View, Text, FlatList, TouchableHighlight,Image, StyleSheet} from 'react-native'
import {estilos} from '../Styles/estilos'
import { getSeries, getTreinos, getTreinosTemplate } from './database1';
import { useSQLiteContext } from 'expo-sqlite';

function TelaHistorico() {
  const [treinos, setTreinos] = useState([]);
  db = useSQLiteContext();

  useEffect(() => {
    loadTreinos();
  }, []);

  const loadTreinos = async () =>{
    console.log('carregando treinos');
    try {
        const results = await getTreinos(db);
        console.log('treinos carregados', results);
        setTreinos(results);
      } catch (error) {
        console.error('Erro ao carregar treinos', error);
      }
    };

    const loadSeries = async () =>{
        console.log('carregando series');
        const results = await getSeries(db);
        console.log('series carregadas', results);
        setTreinos(results);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>ID: {item.idTreino}</Text>
          <Text>Data: {item.dataTreino}</Text>
        </View>
      );
    
      return (
        <View style={styles.container}>
          <FlatList
            data={treinos}
            renderItem={renderItem}
            keyExtractor={(item) => item.idTreino.toString()}
          />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
      },
      item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    });
    
    export default TelaHistorico;

/*export default class TelaHistorico extends Component{
  render(){  
    return(
    //Footer v v v 
    <View style={estilos.footer}>
          <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaHistorico')}>
              <Image source={require('../Styles/imgs/historico.png')} style={estilos.footerImgsAtivado} />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaHome')}>
              <Image source={require('../Styles/imgs/halter.png')} style={estilos.footerImgs} />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaPerfil')}>
              <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgs} />
            </TouchableHighlight>
          </View>
        </View>
    //Footer ^^^
  );}}*/