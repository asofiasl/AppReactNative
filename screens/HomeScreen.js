import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige una opción:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Opcion1')}
      >
        <Text style={styles.buttonText}>Encriptar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Opcion2')}
      >
        <Text style={styles.buttonText}>Desencriptar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
