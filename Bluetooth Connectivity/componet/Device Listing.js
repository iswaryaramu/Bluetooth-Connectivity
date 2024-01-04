import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BluetoothScreen = () => {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Initialize Bluetooth manager when the component mounts
    BleManager.start({ showAlert: false });

    // Add event listeners for device discovery
    BleManager.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

    // Clean up event listeners when the component unmounts
    return () => {
      BleManager.stopScan();
      BleManager.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    };
  }, []);

  const startBluetoothDiscovery = () => {
    if (!isScanning) {
      setIsScanning(true);
      setDevices([]);

      // Start Bluetooth discovery
      BleManager.scan([], 5, true).then(() => {
        console.log('Scanning...');
      });
    } else {
      BleManager.stopScan().then(() => {
        console.log('Stopped scanning');
        setIsScanning(false);
      });
    }
  };

  const handleDiscoverPeripheral = (device) => {
    // Add the discovered device to the list
    setDevices((prevDevices) => [...prevDevices, device]);
  };

  const handleConnectToDevice = async (device) => {
    try {
      // Connect to the selected device
      await BleManager.connect(device.id);

      // Toggle connection state for the selected device
      setSelectedDevice((prevSelectedDevice) =>
        prevSelectedDevice && prevSelectedDevice.id === device.id ? null : device
      );
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.deviceContainer}>
      <TouchableOpacity onPress={() => handleConnectToDevice(item)}>
        {/* Highlight the selected device */}
        <Image
          source={require('./Images/th.png')}
          style={[
            styles.bluetoothIcon,
            { backgroundColor: selectedDevice?.id === item.id ? '#ffc107' : '#e0e0e0' },
          ]}
        />
      </TouchableOpacity>
      <Text>{item.name}</Text>
      {/* Show the "Connected" indicator for the selected device */}
      {selectedDevice?.id === item.id && <Text>Connected</Text>}
    </View>
  );

  return (
    <View>
      <TouchableOpacity onPress={startBluetoothDiscovery} disabled={isScanning}>
        <Image source={require('./Images/th (1).png')} style={styles.bluetoothDiscoveryIcon} />
      </TouchableOpacity>
      
      {/* Device Listing */}
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  bluetoothIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  bluetoothDiscoveryIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#007bff',
  },
});

export default BluetoothScreen;
