import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { handleDecryptImage } from '../API/api';

const blankImage = require('../assets/blank_image.png');

export default function Option2Screen() {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type === 'success') {
      setSelectedFile(result.uri);
    }
  };

  const handlePressDesencryptImage = async () => {
    if (selectedFile) {
      await handleDecryptImage(selectedFile, 'image.jpg');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un archivo</Text>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Seleccionar archivo</Text>
      </TouchableOpacity>
      {selectedFile && (
        <View style={styles.imageContainer}>
          <Image source={blankImage} style={styles.image} />
          <TouchableOpacity style={styles.button} onPress={handlePressDesencryptImage}>
            <Text style={styles.buttonText}>Desencriptar</Text>
          </TouchableOpacity>
        </View>
      )}
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
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
