import { Component, useEffect, useState, } from "react";
import {View, Text, FlatList, TouchableHighlight,Image, StyleSheet, TouchableOpacity} from 'react-native'
import {estilos} from '../Styles/estilos'
import { getSeries, getTreinos, getTreinosTemplate } from './database1';
import { useSQLiteContext } from 'expo-sqlite';

function TelaHistorico({ navigation }) {
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
        


          // Agrupar os exercícios pelo ID do treino e contar as séries
      const treinosComExercicios = {};
      results.forEach(item => {
        if (!treinosComExercicios[item.idTreino]) {
          treinosComExercicios[item.idTreino] = {
            idTreino: item.idTreino,
            treinonome: item.treinonome,
            dataTreino: item.dataTreino,
            exercicios: {}
          };
        }

        if (!treinosComExercicios[item.idTreino].exercicios[item.exercicionome]) {
          treinosComExercicios[item.idTreino].exercicios[item.exercicionome] = {
            nome: item.exercicionome,
            qntSeries: 0
          };
        }

        treinosComExercicios[item.idTreino].exercicios[item.exercicionome].qntSeries++;
      });

      // Converter o objeto em uma matriz para fins de renderização
      const treinosArray = Object.values(treinosComExercicios).map(treino => ({
        ...treino,
        exercicios: Object.values(treino.exercicios)
      }));

      setTreinos(treinosArray);
        
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
      
      <View style={estilos.unselectedItemContainer}>
        <TouchableOpacity>
        <Text style={estilos.bTexto}>{item.dataTreino}</Text>
        <Text >Nome: {item.treinonome}</Text>
        <Text style={estilos.texto}>Exercícios:</Text>
        <FlatList
          data={item.exercicios}
          renderItem={({ item: exercicio }) => (
            <View>
            <Text style={estilos.texto}>{exercicio.qntSeries} x </Text>
            <Text style={estilos.texto}>{exercicio.nome}</Text>
          </View>
          )}
          keyExtractor={(exercicio, index) => index.toString()}
        />
        </TouchableOpacity>
      </View>
      
    );
    
      return (
        <View style={styles.container}>
          <FlatList
            data={treinos}
            renderItem={renderItem}
            keyExtractor={(item) => item.idTreino.toString()}
          />
          {/*Footer vvv*/}
        <View style={estilos.footer}>
        <View>
            <TouchableHighlight onPress={() => navigation.navigate('TelaHistorico')}>
              <Image source={require('../Styles/imgs/historico.png')} style={estilos.footerImgs} />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => navigation.navigate('TelaHome')}>
              <Image source={require('../Styles/imgs/halter.png')} style={estilos.footerImgsAtivado} />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => navigation.navigate('TelaPerfil')}>
              <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgs} />
            </TouchableHighlight>
          </View>
        </View>
        {/*Footer ^^^*/}
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