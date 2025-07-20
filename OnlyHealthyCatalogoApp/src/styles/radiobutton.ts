import { StyleSheet } from "react-native";

export const radioButton_styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginBottom: 20,
    width: '100%',
    //backgroundColor: '#992032'
  },
  label: {
    fontSize: 14,
    color: '#4B5563'
  },  
  radio: {      
      borderRadius: 8,
      borderStyle: "solid",
      borderColor: "#366954",
      borderWidth: 1
  },
  menu: {
        flexDirection: 'row', // Arrange children horizontally
        //flex: 1, // Parent takes up available space
        justifyContent: 'space-evenly', // Distribute space around items
        alignItems: 'baseline', // Align items vertically in the center
        //backgroundColor:'#779923'
    },
  column: {
        flexDirection: 'row', // Each column takes equal space
        //borderWidth: 1,        
        marginHorizontal: 5,
        alignItems: 'baseline',
    }
});
