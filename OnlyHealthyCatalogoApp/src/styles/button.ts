import { StyleSheet } from "react-native";

export const button_styles = StyleSheet.create({  
  button: {    
    //paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    justifyContent: "flex-start",
    alignContent: "flex-start"
  },  
  gradientBackground: {
      width: 230,
      height: 55,      
      borderRadius: 30,    
      paddingVertical: 2,    
      //flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  editGradientBackground: {
      width: 120,
      height: 30,      
      borderRadius: 30,    
      paddingVertical: 2,    
      //flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  text: {        
    color: '#F6F6F9',    
    fontSize: 20,
    //fontWeight: 800,
    fontFamily: "SF Pro",
    fontStyle: "normal",
    //lineHeight: "normal",
  },
  editText: {        
    color: '#F6F6F9',    
    fontSize: 14,
    //fontWeight: 800,
    fontFamily: "SF Pro",
    fontStyle: "normal",
    //lineHeight: "normal",
  },  
});
