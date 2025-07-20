import { StyleSheet } from "react-native";

export const input_styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginBottom: 10,
    width: '100%',
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
      width: "100%",
      borderRadius: 8,
      borderStyle: "solid",
      borderColor: "#366954",
      borderWidth: 1,
      height: 35,
      overflow: "hidden",
      alignItems: "center",
      minWidth: 240,
      fontSize: 12,
      fontFamily: "Inter-Regular",
      fontWeight: 'normal',  
      paddingVertical: 0
  },
});
