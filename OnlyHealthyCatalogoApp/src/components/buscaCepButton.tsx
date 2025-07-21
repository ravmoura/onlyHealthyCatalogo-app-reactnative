// Button.tsx - criado automaticamente
import { TouchableOpacity, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { button_styles } from '../styles/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';

interface BuscaCepButtonProps {
    title: string;
    onPress: () => void;    
}

  export const BuscaCepButton = ({ title, onPress}: BuscaCepButtonProps) => {        
  
      return (
        <View style={button_styles.container}>
            <TouchableOpacity style={[button_styles.buscaCepButton]} onPress={onPress}>        
                <LinearGradient
                colors={['#366954', '#000000']} // Array of colors for the gradient
                start={{ x: 0, y: 0 }} // Start point of the gradient (top-left)
                end={{ x: 1, y: 1 }} // End point of the gradient (bottom-right)
                style={button_styles.editGradientBackground}
                >
                    <Text style={button_styles.editText}>{title}</Text>
                </LinearGradient>              
            </TouchableOpacity>
          </View>
        );
};
 
