// Input.tsx - criado automaticamente
import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { inputMenor_styles } from '../styles/inputMenor';

interface InputMenorProps extends TextInputProps {
  label: string;
  error?: string;
}

export const InputMenor = ({ label, error, ...rest }: InputMenorProps) => {
  return (
    <View style={inputMenor_styles.container}>
      <Text style={inputMenor_styles.label}>{label}</Text>
      <TextInput style={inputMenor_styles.input}
        placeholderTextColor="#999"
        {...rest}
      />
      {error && <Text style={inputMenor_styles.error}>{error}</Text>}
    </View>
  );
};

 