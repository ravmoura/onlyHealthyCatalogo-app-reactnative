import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { radioButton_styles } from '../styles/radiobutton';


export const RadioButtons = () => {
    const [checked, setChecked] = React.useState('cliente');

    return (    
        <View style={radioButton_styles.menu}>
            <TouchableOpacity style={[radioButton_styles.column]}>
                <RadioButton
                value="cliente"
                status={ checked === 'cliente' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('cliente')}
                /><Text style={radioButton_styles.label}>Cliente</Text>        
            </TouchableOpacity>          
            <TouchableOpacity style={[radioButton_styles.column]}>
                <RadioButton                
                value="admin"
                status={ checked === 'admin' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('admin')}
                /><Text style={radioButton_styles.label}>Admin</Text>        
            </TouchableOpacity>          
        </View>
    );
};