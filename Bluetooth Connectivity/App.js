import React from 'react';
import { StyleSheet, View } from 'react-native';
import CombinedViewModel from './componet/CombinedViewModel';
import BluetoothScreen from './componet/BluetoothScreen';
import ApiScreen from './componet/ApiScreen';
import BluetoothViewModel from './componet/BluetoothViewModel';

export default function App() {
  const combinedViewModel = CombinedViewModel(); // Assume you have a CombinedViewModel that includes Bluetooth and API logic
   
  return (
    <View style={styles.container}>
      <BluetoothScreen viewModel={combinedViewModel.bluetoothViewModel} />
      <ApiScreen viewModel={combinedViewModel.apiViewModel} />
      <bluetoothViewModel viewModel={combinedViewModel.useBluetoothViewModel} />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
