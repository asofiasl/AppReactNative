import { PermissionsAndroid } from 'react-native';

const requestWriteStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permiso de escritura de almacenamiento',
        message: 'La aplicación necesita acceso de escritura al almacenamiento para guardar la imagen.',
        buttonNeutral: 'Preguntar después',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permiso de escritura de almacenamiento concedido');
    } else {
      console.log('Permiso de escritura de almacenamiento denegado');
    }
  } catch (err) {
    console.warn('Error al solicitar el permiso de escritura de almacenamiento:', err);
  }
};

export default requestWriteStoragePermission;
