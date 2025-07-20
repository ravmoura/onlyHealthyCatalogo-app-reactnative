import React, { useState } from 'react';
import {
  View,
  TextInput,
  Keyboard,
  Text,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { global_styles } from '../styles/global';
import { Input } from '../components/Input';
import { searchCep_styles } from '../styles/searchCep';
import { Address } from '../types/adress';
import { GeoLocalizacao, getGeoLocationFromCep } from '../types/geolocalizacao';
import { EditButton } from '../components/EditButton';
import { Restaurant } from '../types/restaurant';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { AppStackParamList } from '../types/navigation';
import { Button } from '../components/Button';

export default function SearchCepScreen() {
  const navigationApp = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [cep, setCep] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false); // 👈 novo estado
  const [cepErro, setCepErro] = useState('');
  const [restaurant, setRestaurant]  = useState<Restaurant | null>(null);

  const handleSearch = async () => {
    Keyboard.dismiss();
    setLoading(true); // 👈 inicia o loading

    const geo = await getGeoLocationFromCep(cep);

    if (geo) {
      setLocation({ latitude: geo.lat, longitude: geo.lng });
      
      setAddress({
        logradouro: geo.logradouro,
        bairro: geo.bairro,
        localidade: geo.localidade,
        uf: geo.uf,
      });

      setRestaurant ({        
        id: '',
        nome: '',
        cnpj: '',
        numero: 0,
        rua: geo.logradouro,        
        cep: cep,
        bairro: geo.bairro,
        cidade: geo.localidade,
        uf: geo.uf, 
        latitude: (geo.lat).toString(),
        longitude: (geo.lng).toString(),
      });
      
    } else {
      setLocation(null);
      setAddress(null);
      setRestaurant (null);
    }

    setLoading(false); // 👈 finaliza o loading
  };

  const handleAdress = async () => {
    if (restaurant){
        navigationApp.navigate('StoreRegister', {restaurant});
    } else {
        navigationApp.navigate('StoreRegister', { });
    }    
  }

  return (
    <View style={global_styles.container}>
        <Input label="CEP" value={cep} onChangeText={setCep} keyboardType="numeric" error={cepErro}/>
        <Button title="Buscar localização" onPress={handleSearch} />

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      )}

      {!loading && location && (
        <>
        <MapView style={searchCep_styles.map}
                initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                }}
        >
            <Marker coordinate={location} title="Localização do CEP" />
        </MapView>
        {address && (
            <View style={searchCep_styles.addressContainer}>
                <Text style={searchCep_styles.addressText}>Rua: {address.logradouro}</Text>
                <Text style={searchCep_styles.addressText}>Bairro: {address.bairro}</Text>
                <Text style={searchCep_styles.addressText}>Cidade: {address.localidade} - {address.uf}</Text>
                <EditButton title="Carregar dados" onPress={handleAdress} />
            </View>
        )}
        </>
      )}
    </View>
  );
}