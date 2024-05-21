import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity, Image, Pressable, TouchableHighlight } from 'react-native';
import { estilos } from '../Styles/estilos';

export default class TelaHome extends Component {
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

    return (
      <View style={estilos.container}>
        <Pressable style={estilos.butao} onPress={() => this.props.navigation.navigate('TelaNovoTreino')}>
          <Text style={estilos.bTexto}>Iniciar treino vazio</Text>
        </Pressable>
        
        <TouchableOpacity style={estilos.butao} onPress={this.toggleList1}>
          <Text style={estilos.bTexto}>Treinos Salvos {isExpanded1 ? '^' : 'v'}</Text>
        </TouchableOpacity>
        
        <Animated.View style={[estilos.listaContainer, { height: listHeight1 }]}>
          <Text style={estilos.listItem}>Item 1 da lista 1</Text>
          <Text style={estilos.listItem}>Item 2 da lista 1</Text>
          <Text style={estilos.listItem}>Item 3 da lista 1</Text>
          {/* Adicione mais itens conforme necessário */}
        </Animated.View>
        
        <TouchableOpacity style={estilos.butao} onPress={this.toggleList2}>
          <Text style={estilos.bTexto}>Treinos recentes {isExpanded2 ? '^' : 'v'}</Text>
        </TouchableOpacity>
        
        <Animated.View style={[estilos.listaContainer, { height: listHeight2 }]}>
          <Text style={estilos.listItem}>Item 1 da lista 2</Text>
          <Text style={estilos.listItem}>Item 2 da lista 2</Text>
          <Text style={estilos.listItem}>Item 3 da lista 2</Text>
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
            <TouchableHighlight onPress={() => this.props.navigation.navigate('TelaPerfil')}>
              <Image source={require('../Styles/imgs/perfil.png')} style={estilos.footerImgs} />
            </TouchableHighlight>
          </View>
        </View>
        {/*Footer ^^^*/}
      </View>
    );
  }
}
