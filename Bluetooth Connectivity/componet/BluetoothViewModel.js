// BluetoothViewModel.js
import { useEffect, useState } from 'react';
import BleManager from 'react-native-ble-manager';

const useBluetoothViewModel = () => {
  const [devices, setDevices] = useState([]);
  const [isScanning, setScanning] = useState(false);

  useEffect(() => {
    BleManager.start({ showAlert: false });

    return () => {
      BleManager.stopScan();
    };
  }, []);

  const startBluetoothDiscovery = () => {
    setDevices([]);
    setScanning(true);

    BleManager.scan([], 5, true) // Scan for 5 seconds
      .then(() => console.log('Scanning...'))
      .catch((error) => console.error(error));
  };

  const connectToDevice = (device) => {
    BleManager.connect(device.id)
      .then(() => console.log(`Connected to ${device.name}`))
      .catch((error) => console.error(error));
  };

  return { devices, isScanning, startBluetoothDiscovery, connectToDevice };
};

export default useBluetoothViewModel;
