import {StyleSheet} from 'react-native'
import { Header } from 'react-native-elements'

export const estilos = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    display: 'flex',
    position: 'relative',
    padding: 10,
    marginTop: 0,
    backgroundColor:'#222831',
    //borderColor:'red',
    //borderWidth: 2
  },logo:{
    flex:2,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  },
  setaVoltar:{
    width:28,
    height:14.34,
    transform:[{rotate:'270deg'}],
    resizeMode: 'cotain'
  },
  botaoFechar:{
    width:28,
    height:28,
    tintColor:'#eeeeee'
  },
  botaoVoltar:{
    alignSelf: 'left',
    width:48,
    height:48,
    paddingTop:10,
    //borderColor:'yellow',
    //borderWidth: 2    
  },
  botaoAdd:{
    width:28,
    height:28,
    transform:[{rotate:'45deg'}],
    tintColor:'#eeeeee',
    margin : 5
  },
  header:{
    flex:1,
    padding:10,
    marginTop:27,
    //borderColor:'aliceblue',
    //borderWidth: 2
  },
  body:{
    flex: 15,
    //borderColor:'green',
    //borderWidth: 2
  },
  footer:{
    flex:2, 
    flexDirection:'row',
    display:'flex',
    padding:35,
    position:'absolute',
    bottom:0,
    alignSelf:'center',
    width:'100%',
    justifyContent:'space-evenly',
    //gap: '50sp',
    //borderColor:'blue',
    //borderWidth: 2
  },
  footerImgsAtivado:{
    width:48,
    height:48,
    tintColor:'#76ABAE'
  },
  footerImgs:{
    width:48,
    height:48  
  },
  butao:{
    backgroundColor:'#76ABAE',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    borderRadius: 20,
    minHeight:'70px',
    marginBottom: 15,
    marginTop: 15,
    padding: 8,
    width:'90%'
  },
  bTexto:{
    color:'#EEEEEE',
    fontWeight: 'bold',
    //fontSize: '16sp'
  },Frame:{
    width:'50%',
    height:'50%',
    alignSelf:'center',
    verticalAlign:'center',
    borderRadius:20,
    backgroundColor:'#1E1E1E80',
    //borderColor:'purple',
    //borderWidth: 2
  },itens:{
    borderRadius:20,
    backgroundColor:'#1E1E1E80',
  },
  txtInput:{
    width:'100%',
    color:'#EEEEEE80',
    marginBottom: 15,
    padding: 8,
    borderRadius:20,
    backgroundColor:'#1E1E1E',
    height:60
    
  },
  texto:{
    color:'#EEEEEE',
    //fontSize: '14sp',
    marginLeft:10,
    marginBottom: 11
  },
  listaContainer:{
    overflow: 'hidden',
    backgroundColor:'#1E1E1E80'
  },
  txtBig:{
    color:'#EEEEEE',
    fontWeight: 'bold',
    //fontSize: '25sp'
  },
  listItem:{
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'EEEEEE'
  },
  txtExercicios:{
    alignSelf: 'center',
    alignItems: 'left',
    width:'50%',
    color:'#EEEEEE80',
    marginBottom: 15,
    padding: 8,
    borderRadius:20,
    backgroundColor:'#1E1E1E80',
    height:60

  },
  dolado:{
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    color:'#EEEEEE80',
    margin: 15,
    marginBottom: 5,
    padding: 8,
    borderRadius:20,
    backgroundColor:'#1E1E1E80',
    height:60
  },
  botaoAdicionar:{
    marginLeft: '15px',
    backgroundColor:'#76ABAE',
    padding: '10px',
    borderRadius : 15
  },
  label: {
    //fontSize: '18px',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 16,
  },

  selectedItemContainer: {
    backgroundColor: '#0E111580',
    borderColor: '#76ABAE',
    borderWidth: 2,
    borderRadius: 20
  },
  unselectedItemContainer:{
    backgroundColor: '#0E111580',
    borderRadius:20 ,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    marginTop:10,
    marginHorizontal:10
  },
  buttonGeneric:{
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  //Tela de treinos escolhidos
  exerciseContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#0E111550',
  },
  exerciseTitle: {
    //fontSize: '18sp',
    fontWeight: 'bold',
    color: '#eeeeee',
  },
  seriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  seriesText: {
    color: '#eeeeee',
  },
  seriesInput: {
    flex: 1,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    color: '#fff',
  },
  addSeriesButton: {
    color: '#76ABAE',
    textAlign: 'center',
    marginTop: 10,
    //fontSize: '16sp'
  },
  addExerciseButton: {
    bottom: 20,
    left: 20,
    backgroundColor: '#76ABAE',
    padding: 10,
    borderRadius: 5,
    
  },
  finalizeButton: {
    backgroundColor: '#76ABAE',
    padding: 10,
    borderRadius: 20,
  }
})