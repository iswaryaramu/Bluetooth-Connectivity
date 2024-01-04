// export default BluetoothScreen;
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import useBluetoothViewModel from './BluetoothViewModel';

const BluetoothScreen = () => {
  const { devices, isScanning, startBluetoothDiscovery, connectToDevice } = useBluetoothViewModel();
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleConnectToDevice = (device) => {
    // Toggle connection state for the selected device
    setSelectedDevice((prevSelectedDevice) =>
      prevSelectedDevice && prevSelectedDevice.id === device.id ? null : device
    );

    // Call the connectToDevice function from the BluetoothViewModel
    connectToDevice(device);
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

