// Button.tsx - criado automaticamente
import { TouchableOpacity, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { button_styles } from '../styles/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
}

  export const Button = ({ title, onPress, variant}: ButtonProps) => {  
      const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  
      return (
          <TouchableOpacity style={[button_styles.button]} onPress={onPress}>        
              <LinearGradient
              colors={['#366954', '#000000']} // Array of colors for the gradient
              start={{ x: 0, y: 0 }} // Start point of the gradient (top-left)
              end={{ x: 1, y: 1 }} // End point of the gradient (bottom-right)
              style={button_styles.gradientBackground}
              >
                  <Text style={button_styles.text}>{title}</Text>
              </LinearGradient>              
          </TouchableOpacity>
        );
};
 
