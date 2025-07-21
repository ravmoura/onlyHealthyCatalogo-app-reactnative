// global.ts - criado automaticamente
import { StyleSheet } from "react-native";

export const global_styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#2563EB',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 30,    
    marginTop: 0,
    height: '100%',
  },
  logo: {
    width: 300,
    height: 300,
    //marginTop: 20,
    resizeMode: "cover",
  },  
  error: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 8,
  },
  link: {
    width: 184,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "SF Pro",
    color: "#4e4f56",    
    textAlign: "center",
    height: 45,
    //backgroundColor: '#fff768'
  },
  infoText: {
    width: '100%',
    fontSize: 16,
    //lineHeight: 20,
    fontFamily: "Inter-Regular",
    color: "#000",
    textAlign: "left",
    height: 30
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 5,
    color: '#111827',
  },
  dica: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  dicaVazia: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
   footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 4,
  },
  footerLink: {
    fontSize: 14,
    color: '#366954',
    textDecorationLine: 'underline'
  },
  dicaContainer: {
    maxHeight: 120, // altura máxima da rolagem
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  espacamento: {
    height: '3%', 
    backgroundColor: 'transparent' 
  },
  margemActivityIndicator: {
      marginTop: 16,    
  },
});
