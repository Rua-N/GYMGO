import {StyleSheet} from 'react-native'

export const estilos = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    display: 'flex',
    position: 'relative',
    padding: 0,
    marginTop: 0,
    backgroundColor:'#222831',
    borderColor:'red',
    borderWidth: 2
  },
  footer:{
    flex:2, 
    flexDirection:'row',
    display:'flex',
    padding:35,
    position:'absolute',
    bottom:0,
    width:'100%',
    justifyContent:'space-evenly',
    borderColor:'blue',
    borderWidth: 2
  },
  butao:{
    backgroundColor:'#76ABAE',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 20,
    maxHeight: 50,
    minHeight:50,
    marginBottom: 15,
    marginTop: 15,
    padding: 8,
    width:'100%'
  },
  bTexto:{
    color:'#EEEEEE',
    fontWeight: '600px',
  },
  txtInput:{
    width:'100%',
    color:'#EEEEEE80',
    marginBottom: 15,
    padding: 8,
    borderRadius:20,
    backgroundColor:'#1E1E1E80'
    
  },
  texto:{
    color:'#EEEEEE',
    marginLeft:10,
    marginBottom: 11
  },
})