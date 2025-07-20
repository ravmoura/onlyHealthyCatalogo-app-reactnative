// components/RadioButton.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { radioButton_styles } from '../styles/radiobutton';

interface RadioButtonsProps {
  selectedValue: 'cliente' | 'admin'; // O valor atualmente selecionado
  onValueChange: (value: 'cliente' | 'admin') => void; // Função para notificar o pai sobre a mudança
}

export const RadioButtons = ({ selectedValue, onValueChange }: RadioButtonsProps) => {

    return (
        <View style={radioButton_styles.menu}>
            <TouchableOpacity
                style={[radioButton_styles.column]}
                onPress={() => onValueChange('cliente')} // Chama a função do pai
            >
                <RadioButton
                    value="cliente"
                    status={ selectedValue === 'cliente' ? 'checked' : 'unchecked' } // Usa selectedValue
                    onPress={() => onValueChange('cliente')} // Chama a função do pai
                />
                <Text style={radioButton_styles.label}>Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[radioButton_styles.column]}
                onPress={() => onValueChange('admin')} // Chama a função do pai
            >
                <RadioButton
                    value="admin"
                    status={ selectedValue === 'admin' ? 'checked' : 'unchecked' } // Usa selectedValue
                    onPress={() => onValueChange('admin')} // Chama a função do pai
                />
                <Text style={radioButton_styles.label}>Admin</Text>
            </TouchableOpacity>
        </View>
    );
};