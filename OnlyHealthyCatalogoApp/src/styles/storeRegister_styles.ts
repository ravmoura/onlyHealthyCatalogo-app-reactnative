import { StyleSheet } from "react-native";

export const storeRegister_styles = StyleSheet.create({
    row: {        
        flexDirection: 'row', // Arrange children horizontally
        //marginTop: 10,        
        justifyContent: 'space-between', // Distribute space around items
        alignItems: 'flex-start', // Alinha itens verticalmente
        width: '100%', 
        //backgroundColor:'#ffffff'
    },
    viewBotao:{
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginTop: 20,   
    }
});
