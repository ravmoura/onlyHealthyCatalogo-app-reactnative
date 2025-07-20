import { TouchableOpacity, Text} from 'react-native';
import { menuButton_styles } from '../styles/menuButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';

interface MenuButtonProps {
    title: string;
    screen?: string;
    onPress?: () => void;
}

export const MenuButton = ({title, screen, onPress }: MenuButtonProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    return (
    <TouchableOpacity style={[menuButton_styles.button]} onPress={onPress ? onPress : () => navigation.navigate(screen as never)}>
        <LinearGradient
            colors={['#366954', '#000000']} // Array of colors for the gradient
            start={{ x: 0, y: 0 }} // Start point of the gradient (top-left)
            end={{ x: 1, y: 1 }} // End point of the gradient (bottom-right)
            style={menuButton_styles.gradientBackground}
            >
            <Text style={menuButton_styles.text}>{title}</Text>
        </LinearGradient>              
    </TouchableOpacity>
    )
};
