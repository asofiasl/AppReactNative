import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Se requiere permiso para acceder a la cámara.');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encripta tus imagenes</Text>
      <Image
        source={{
          uri: selectedImage !== null
            ? selectedImage.localUri
            : 'https://picsum.photos/200/200'
        }}
        style={styles.image}
      />
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Selecciona una imagen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929'
  },
  title: {
    fontSize: 25,
    color: '#fff'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  button: {
    backgroundColor: '#111111',
    padding: 7,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  }
});

export default App;
