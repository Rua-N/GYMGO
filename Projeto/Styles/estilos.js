import {StyleSheet} from 'react-native'

export const estilos = StyleSheet.create({
//segmentos
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
  },
  header:{
    flex:1,
    padding:10,
    marginTop:27,
    //borderColor:'aliceblue',
   // borderWidth: 2
  },
  body:{
    flex: 20,
    paddingBottom:50
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
    backgroundColor:'#222831',
    alignSelf:'center',
    width:'110%',
    justifyContent:'space-evenly',
    gap: 50,
    borderTopColor:'#1E242B',
    borderWidth:1  
  },Frame:{
    width:'50%',
    height:'50%',
    alignSelf:'center',
    verticalAlign:'center',
    borderRadius:20,
    backgroundColor:'#1E1E1E80',
    //borderColor:'purple',
    //borderWidth: 2
  },
  //Imagens
  logo:{
    flex:2,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
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
  //Botões
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
  BotaoDesilizado: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 30,
    marginTop:10
    
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
    tintColor:'#eeeeee',
    
  },
  botaoVoltar:{
    alignItems: 'center',
    alignSelf:'Left',
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
  buttonGeneric:{
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  seriesButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,

  },
  addSeriesButton: {
    color: '#76ABAE',
    textAlign: 'center',
    marginTop: 10,
    //fontSize: '16sp'
  },
  removeSeriesButton: {
    color: '#76ABAE',
    textAlign: 'center',
    marginTop: 10,
  },
  addExerciseButton: {
    bottom: 20,
    left: 20,
    backgroundColor: '#76ABAE',
    padding: 10,
    borderRadius: 5,
    
  },
  botaoAdicionar:{
    marginLeft: '15px',
    backgroundColor:'#76ABAE',
    padding: '10px',
    borderRadius : 15
  },
  finalizeButton: {
    backgroundColor: '#76ABAE',
    padding: 10,
    borderRadius: 20,
  },
  //Textos
  exerciseTitle: {
    //fontSize: '18sp',
    fontWeight: 'bold',
    color: '#eeeeee',
  },
  txtBig:{
    color:'#EEEEEE',
    fontWeight: 'bold',
    //fontSize: '25sp'
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
  TextoBold:{
    color:'#EEEEEE',
    fontWeight: 'bold',
    marginLeft:10
  },
  bTexto:{
    color:'#EEEEEE',
    fontWeight: 'bold',
    fontSize: 16
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
    fontSize: 14,
    marginLeft:10,
    marginBottom: 9
  }, label: {
    //fontSize: '18px',
    marginBottom: 8,
  }, input: {
    fontSize: 18,
    textAlign:'center',
    color:'#FEFBF6',
  },seriesInput: {
    flex: 1,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 20,
    alignItems:'center',
    padding: 5,
    marginHorizontal: 5,
    color: '#fff',
  },
  //
  itens:{
    borderRadius:20
  },
  
  listaContainer:{
    overflow: 'hidden',
    backgroundColor:'#1E1E1E80',
    borderRadius: 20,
    padding:5
  },
  
  listItem:{
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'EEEEEE'
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
    backgroundColor:'#0E111510',
    height:60
  },
  doladoExercicio:{
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'left',
    alignItems: 'center',
    //borderColor:'orange',
    //borderWidth: 2
  },
  doladoHeader:{
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'Left',
    marginTop:15
    //borderColor:'orange',
    //borderWidth: 2
  },
  ItemContainer:{
    backgroundColor: '#222831',
    borderRadius:20 ,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    marginTop:10,
    marginHorizontal:0,
    padding:8,
    borderColor:'#eeeeee',
    borderWidth:1
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
  exerciseContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#0E111550',
  },
  
  seriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  //
  
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#76ABAE',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 1, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  itemText: {
    fontSize: 25,
    color:'#eeeeee'
  },
  seriesText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#eeeeee',
  },
})