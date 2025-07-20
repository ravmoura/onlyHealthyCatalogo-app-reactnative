import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Exemplo de ícone

// Tipos para os itens do dropdown
export interface DropdownItem {
  label: string;
  value: string;
}

// Definindo os tipos para as props do nosso CustomDropdown
interface CustomDropdownProps {
    label: string; // O rótulo/título do dropdown
    items: DropdownItem[]; // A lista de itens selecionáveis
    selectedValue: string; // O valor atualmente selecionado
    onValueChange: (value: string) => void; // Função chamada ao selecionar um item
    placeholder?: string; // Texto placeholder quando nada está selecionado
    }

export const DropdownList = ({label, items, selectedValue, onValueChange, placeholder = 'Selecione uma opção...',}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Encontra o item selecionado para exibir o label
  const selectedLabel = items.find((item) => item.value === selectedValue)?.label || placeholder;

  const handleSelect = (item: DropdownItem) => {
        onValueChange(item.value);
        setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {/* Botão que exibe o valor selecionado e abre/fecha o dropdown */}
      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.selectedItemText}>
          {selectedLabel}
        </Text>
        <Icon name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color="#333" />
      </TouchableOpacity>

      {/* Lista de opções (mostrada condicionalmente) */}
      {isOpen && (
        <View style={styles.dropdownListContainer}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            // Separador entre os itens (opcional)
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
    zIndex: 1, // Garante que o dropdown fique acima de outros elementos
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    minHeight: 50, // Garante uma altura mínima para o header
  },
  selectedItemText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Ocupa o espaço restante
  },
  dropdownListContainer: {
    position: 'absolute', // Permite que a lista "flutue"
    width: '100%',
    maxHeight: 200, // Limita a altura da lista para ser scrollável
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 65, // Ajusta a posição para ficar abaixo do header
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden', // Garante que a sombra não corte os cantos
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});