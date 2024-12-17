import React from 'react';
import {View,Text} from 'react-native';

import BlueToothConnection from './components/BlueToothConnection';
import ClassicBluetoothConnection from './components/ClassicBluetoothConnection';
const App = () => {
  return (
    <View>
       <Text>Welcome to Battery Health.</Text>
        {/* <BlueToothConnection /> */}
        <ClassicBluetoothConnection />
    </View>
  );
};

export default App;