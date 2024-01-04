// ApiScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import useApiViewModel from './ApiViewModel';

const ApiScreen = () => {
  const { responseData, fetchDataFromApi } = useApiViewModel();

  return (
    <View>
      <Text>API Response: {responseData}</Text><br></br>
      <Button title="Fetch Data" onPress={fetchDataFromApi} />
    </View>
  );
};

export default ApiScreen;



