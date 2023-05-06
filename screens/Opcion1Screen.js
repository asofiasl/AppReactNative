import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { handleEncryptImage } from '../API/api';

export default function Opcion1Screen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handlePressEncryptImage = async () => {
    if (selectedImage) {
      await handleEncryptImage(selectedImage, 'image.jpg', fileName);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una imagen</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar imagen</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <TextInput
            style={styles.input}
            placeholder="Nombre del archivo"
            value={fileName}
            onChangeText={text => setFileName(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handlePressEncryptImage}>
            <Text style={styles.buttonText}>Encriptar</Text>
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
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
});
