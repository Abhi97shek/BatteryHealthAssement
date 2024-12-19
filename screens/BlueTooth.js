import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

const BluetoothUI = () => {
  const [devices, setDevices] = useState([
    { id: '1', name: 'Device 123', connected: false },
    { id: '2', name: 'Device 287213', connected: false },
    { id: '3', name: 'Device 2', connected: false },
  ]);

  const [myDevice, setMyDevice] = useState({
    id: '4',
    name: 'Device name 1',
    connected: false,
  });

  const handleDisconnect = () => {
    if (myDevice.connected) {
      // Simulate disconnection
      setMyDevice({ ...myDevice, connected: false });
      Alert.alert('Disconnected', 'Device disconnected successfully');
    } else {
      Alert.alert('Not Connected', 'No device is currently connected.');
    }
  };

  const renderDeviceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.deviceItem}
      onPress={() => Alert.alert('Device Selected', `You selected ${item.name}`)}
    >
      <Text style={styles.deviceName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       
      <Text style={styles.sectionTitle}>Paried Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderDeviceItem}
        style={styles.deviceList}
      />
      <View>
      <Text style={styles.sectionTitle}>Scan to Search</Text>
      <TouchableOpacity
        style={[
          styles.disconnectButton,
          !myDevice.connected && styles.disabledButton,
        ]}
        onPress={handleDisconnect}
        disabled={!myDevice.connected}
      >
        <Text style={styles.buttonText}>Disconnect</Text>
      </TouchableOpacity>
      </View>
            
      <Text style={styles.sectionTitle}>My Devices</Text>
      <View style={styles.myDevice}>
        <Text style={styles.deviceName}>{myDevice.name}</Text>
        <Text style={styles.deviceStatus}>
          {myDevice.connected ? 'Connected' : 'Not connected'}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.disconnectButton,
          !myDevice.connected && styles.disabledButton,
        ]}
        onPress={handleDisconnect}
        disabled={!myDevice.connected}
      >
        <Text style={styles.buttonText}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FF',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6A6A9E',
  },

  deviceItem: {
    backgroundColor: '#EDEDFD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  deviceName: {
    fontSize: 16,
    color: '#4F4FBC',
  },
  myDevice: {
    backgroundColor: '#EDEDFD',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceStatus: {
    fontSize: 14,
    color: '#A0A0D0',
  },
  disconnectButton: {
    marginTop: 20,
    backgroundColor: '#4F4FBC',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default BluetoothUI;
