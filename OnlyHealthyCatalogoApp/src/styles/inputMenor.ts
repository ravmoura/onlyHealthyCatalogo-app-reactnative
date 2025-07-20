import { StyleSheet } from "react-native";

export const inputMenor_styles = StyleSheet.create({
  container: {
        //flex: 1, // Arrange children horizontally
        marginTop: 10,
        width: '50%',
        justifyContent: 'space-between', // Distribute space around items
        flex: 1, // Each column takes equal space        
        height: 58,
        marginLeft: 5,                
        //backgroundColor: '#992032'
  },  
  label: {
    fontSize: 14,
    color: '#4B5563', // gray-700
    marginBottom: 4,
  },  
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  input: {
      flex: 1,
      //marginRight: 5,
      width: "100%",
      borderRadius: 8,
      borderStyle: "solid",
      borderColor: "#366954",
      borderWidth: 1,
      height: 35,
      //overflow: "hidden",
      //alignItems: "center",
      fontSize: 12,
      fontFamily: "Inter-Regular",
      fontWeight: 'normal',  
  },
});
