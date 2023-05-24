const handleEncryptImage = async (imageUri, fileName, desiredFileName) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/API/Hide/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: createFormData(imageUri),
    });
    alert("flag")// no entra acá

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }

    const result = await response.json();

    const fileUri = FileSystem.documentDirectory + 'imagenes-encriptadas/' + desiredFileName;

    // Crear carpeta si no existe
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'imagenes-encriptadas/', { intermediates: true });

    await FileSystem.copyAsync({
      from: result.image_url,
      to: fileUri,
    });

    console.log('Imagen guardada correctamente');
  } catch (error) {
    if (error.message === 'Network request failed') {
      alert('No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    } else {
      alert('Hubo un error al encriptar la imagen. Por favor, inténtalo de nuevo más tarde.');
    }

    console.log('Error al guardar la imagen', error);
  }
};

const handleDecryptImage = async (encryptedFilePath, desiredFileName) => {
  try {
    const formData = new FormData();
    const encryptedFile = await FileSystem.readAsStringAsync(encryptedFilePath, { encoding: 'base64' });

    formData.append('file', {
      uri: encryptedFilePath,
      type: 'application/octet-stream',
      name: 'encrypted-image.enc',
    });

    const response = await fetch('/API/Decrypt/Image', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }

    const result = await response.json();

    const fileUri = FileSystem.documentDirectory + 'imagenes-desencriptadas/' + desiredFileName;

    // Crear carpeta si no existe
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'imagenes-desencriptadas/', { intermediates: true });

    await FileSystem.writeAsStringAsync(fileUri, result.decrypted_image, { encoding: 'base64' });

    console.log('Imagen guardada correctamente');
  } catch (error) {
    if (error.message === 'Network request failed') {
      alert('No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    } else {
      alert('Hubo un error al desencriptar la imagen. Por favor, inténtalo de nuevo más tarde.');
    }

    console.log('Error al guardar la imagen', error);
  }
};


const createFormData = (uri) => {
  const data = new FormData();

  data.append('image', {
    uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });

  return data;
};

export { handleEncryptImage, handleDecryptImage };