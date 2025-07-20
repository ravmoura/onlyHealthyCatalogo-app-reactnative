import { StyleSheet } from "react-native";

export const linkMenu_styles = StyleSheet.create({
    menu: {
        flexDirection: 'row', // Arrange children horizontally
        marginTop: 15,
        //justifyContent: 'flex-start', // Distribute space around items
        //alignItems: 'center', // Align items vertically in the center
        //backgroundColor:'#779923'
    },
    column: {
        flex: 1, // Each column takes equal space
        //borderWidth: 1,        
        marginHorizontal: 5,
        alignItems: 'center',
    },
    mainText: {
        //width: '100,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "SF Pro Text",
        color: "#000", 
        alignItems: 'center',
        //marginBottom: 50,       
        //height: 19,        
    },
    text: {
        //width: '100,
        fontSize: 18,
        fontWeight: 600,
        fontFamily: "SF Pro Text",
        color: "#000", 
        //alignItems: 'center',
        //marginBottom: 50,       
        //height: 19,        
    },
     horizontalLine: {
        width: '100%',
        height: 2, // Thickness of the line
        backgroundColor:  "#366954",
        marginVertical: 5,
    },
    horizontalTranspLine:{
        width: '100%',
        height: 1, // Thickness of the line
        backgroundColor:  '#e5e7eb',
        marginVertical: 5,
    }
});