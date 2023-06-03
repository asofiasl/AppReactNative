import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

const handleEncryptImage = async (imageUri, fileName, desiredFileName) => {
  try {
    const formData = createFormData(imageUri);

    const response = await fetch('https://aes-deploy.onrender.com/API/Encrypt/Image', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      console.log(response.status);
      console.log(response.statusText);
      console.log(await response.text());
      throw new Error('Error en la respuesta de la API');
    }

    const fileText = await response.text();

    const directoryUri = FileSystem.documentDirectory + 'imagenes-encriptadas/';
    const fileUri = FileSystem.documentDirectory + desiredFileName;

    const directoryInfo = await FileSystem.getInfoAsync(directoryUri);
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
    }

    await FileSystem.writeAsStringAsync(fileUri, fileText, { encoding: FileSystem.EncodingType.Base64 });

    console.log('Imagen guardada correctamente');
    Alert.alert('Éxito', `La imagen se guardó correctamente en la ruta: ${fileUri}`);
  } catch (error) {
    if (error.message === 'Network request failed') {
      Alert.alert('Error', 'No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    } else {
      Alert.alert('Error', 'Hubo un error al encriptar la imagen. Por favor, inténtalo de nuevo más tarde.');
    }

    console.log('Error al guardar la imagen', error);
  }
};

const handleDecryptImage = async (encryptedFilePath, desiredFileName) => {
  try {
    const formData = createFormData(encryptedFilePath);

    const response = await fetch('https://aes-deploy.onrender.com/API/Decrypt/Image', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      console.log(response.status);
      console.log(response.statusText);
      console.log(await response.text());
      throw new Error('Error en la respuesta de la API');
    }

    const fileText = await response.text();

    const directoryUri = FileSystem.documentDirectory + 'imagenes-encriptadas/';
    const fileUri = FileSystem.documentDirectory + desiredFileName;

    const directoryInfo = await FileSystem.getInfoAsync(directoryUri);
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
    }

    await FileSystem.writeAsStringAsync(fileUri, fileText, { encoding: FileSystem.EncodingType.Base64 });

    console.log('Imagen guardada correctamente');
    Alert.alert('Éxito', `La imagen se guardó correctamente en la ruta: ${fileUri}`);
  } catch (error) {
    if (error.message === 'Network request failed') {
      Alert.alert('Error', 'No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    } else {
      Alert.alert('Error', 'Hubo un error al desencriptar la imagen. Por favor, inténtalo de nuevo más tarde.');
    }

    console.log('Error al guardar la imagen', error);
  }
};

const createFormData = (uri) => {
  const data = new FormData();
  data.append('file', {
    uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });

  return data;
};


export { handleEncryptImage, handleDecryptImage };
