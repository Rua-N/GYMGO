import {StyleSheet} from 'react-native'

export const estilos = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    display: 'flex',
    position: 'relative',
    padding: 35,
    marginTop: 0,
    backgroundColor:'#222831',
    //borderColor:'red',
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
    borderRadius: 20,
    minHeight:'70px',
    marginBottom: 15,
    marginTop: 15,
    padding: 8,
    width:'100%'
  },
  bTexto:{
    color:'#EEEEEE',
    //fontSize: '16px'
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
    //fontSize: 14,
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
    //fontSize: '25px'
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
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
    borderWidth: 2,
  },
  unselectedItemContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
  },
  buttonGeneric:{
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  }
})