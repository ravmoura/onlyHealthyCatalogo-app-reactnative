import React, { useState } from 'react';
import { TouchableOpacity, Text, View} from 'react-native';
import { linkMenu_styles } from '../styles/linkMenu';
import { Routes } from '../routes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';


interface LinkMenuProps {
    mainTitle: string;
    secondaryTitle: string;
    onMainPress?: string;    
    onSecondaryPress?: string;    
    onPress?: () => void;
}

export const LinkMenu = ({ mainTitle, secondaryTitle, onMainPress, onSecondaryPress, onPress }: LinkMenuProps) => {  
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
      
  return (
      <View style={linkMenu_styles.menu}>
          <TouchableOpacity style={[linkMenu_styles.column]} onPress={onPress ? onPress : () => navigation.navigate(onMainPress as never)}>        
              <Text style={linkMenu_styles.mainText}>{mainTitle}</Text>
              <View style={linkMenu_styles.horizontalLine} />
          </TouchableOpacity>          
          <TouchableOpacity style={[linkMenu_styles.column]} onPress={onPress ? onPress : () => navigation.navigate(onSecondaryPress as never)}>
              <Text style={linkMenu_styles.text}>{secondaryTitle}</Text>
              <View style={linkMenu_styles.horizontalTranspLine} />
          </TouchableOpacity>          
      </View>
  );
}; 