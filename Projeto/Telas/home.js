import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity, Image, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import { estilos } from '../Styles/estilos';
import { ExerciseContext } from './ExerciseContext';

export default class TelaHome extends Component {

  static contextType = ExerciseContext; 
  constructor(props) {
    super(props);
    this.state = {
      isExpanded1: false,
      isExpanded2: false,
      animation1: new Animated.Value(0),
      animation2: new Animated.Value(0)
    };
  }

  toggleList1 = () => {
    const { isExpanded1, animation1 } = this.state;
    Animated.timing(animation1, {
      toValue: isExpanded1 ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
    this.setState({ isExpanded1: !isExpanded1 });
  };

  toggleList2 = () => {
    const { isExpanded2, animation2 } = this.state;
    Animated.timing(animation2, {
      toValue: isExpanded2 ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
    this.setState({ isExpanded2: !isExpanded2 });
  };

  render() {
    const { isExpanded1, animation1, isExpanded2, animation2 } = this.state;
    
    const listHeight1 = animation1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200] // ajuste conforme necessário
    });

    const listHeight2 = animation2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200] // ajuste conforme necessário
    });

    iniciarTreinoVazio = () => {
      const { clearExercises } = this.context;
      clearExercises();
      this.props.navigation.navigate('TelaNovoTreino');
    };

    return (
      <View style={estilos.container}>
        <Pressable style={estilos.butao} onPress={iniciarTreinoVazio}>
          <Text style={estilos.bTexto}>Iniciar treino vazio</Text>
        </Pressable>
        
        <TouchableOpacity onPress={this.toggleList1}>
          <Text style={estilos.txtBig}>Treinos Salvos {isExpanded1 ? '^' : 'v'}</Text>
        </TouchableOpacity>
        
        <Animated.View style={[estilos.listaContainer, { height: listHeight1 }]}>
          <ScrollView>
          <View estilos={estilos.itens}>
            <Text style={estilos.bTexto}> Treino A: Peito</Text>
            <Text style={estilos.bTexto}>Supino Reto {"\n"} Peck Deck...</Text>
            <Pressable style={estilos.butao}>
              <Text style={estilos.bTexto}>Iniciar</Text>
            </Pressable>
          </View>
          
          <View estilos={estilos.itens}>
            <Text style={estilos.bTexto}> Treino A: Perna</Text>
            <Text style={estilos.bTexto}>Agachamento {"\n"} Extensora...</Text>
            <Pressable style={estilos.butao}>
              <Text style={estilos.bTexto}>Iniciar</Text>
            </Pressable>
          </View>
          </ScrollView>
          {/* Adicione mais itens conforme necessário */}
        </Animated.View>
        
        <TouchableOpacity onPress={this.toggleList2}>
          <Text style={estilos.txtBig}>Treinos Recentes {isExpanded2 ? '^' : 'v'}</Text>
        </TouchableOpacity>
        
        <Animated.View style={[estilos.listaContainer, { height: listHeight2 }]}>
          <View estilos={estilos.itens}>
              <Text style={estilos.bTexto}>Pulley{"\n"}Remada{"\n"}Rosca direta{"\n"}Rosca pronada </Text>
              <Pressable style={estilos.butao}>
                <Text style={estilos.bTexto}>Salvar</Text>
              </Pressable>
            </View>
          {/* Adicione mais itens conforme necessário */}
        </Animated.View>
        
        {/*Footer vvv*/}
        <View style={estilos.footer}>
          <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaHome')}>
              <Image source={require('../Styles/imgs/halter.png')} style={estilos.footerImgsAtivado} />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaTodosTreinos')}>
              <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgs} />
            </TouchableHighlight>
          </View>
        </View>
        {/*Footer ^^^*/}
      </View>
    );
  }
}
