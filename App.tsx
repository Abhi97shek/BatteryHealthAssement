import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './screens/Home';
import DashBoard from "./screens/DashBoard";
import BluetoothConnection from './components/ClassicBluetoothConnection';
import BluetoothUI from './screens/BlueTooth';
import 'react-native-gesture-handler';

export default App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <SafeAreaView style={{flex:1}}>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown:false}}
        />

      <Stack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{headerShown:false}}
        />
         <Stack.Screen
          name="BluetoothConnection"
          component={BluetoothConnection}
        />
         <Stack.Screen
          name="BluetoothUI"
          component={BluetoothUI}
          options={{
            title: 'Connect with Bluetooth', // Header text
            headerStyle: { backgroundColor: '#4F4FBC' }, // Customize header background
            headerTintColor: '#fff', // Customize header text color
           
          }}
        />
        </Stack.Navigator>
    </SafeAreaView>
    </NavigationContainer>
  );
};

