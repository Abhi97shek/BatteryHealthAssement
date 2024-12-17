import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import BluetoothClassic from 'react-native-bluetooth-classic';

const BluetoothConnection = () => {
  const [devices, setDevices] = useState([]); // List of devices
  const [connectedDevice, setConnectedDevice] = useState(null); // Currently connected device
  const [isScanning, setIsScanning] = useState(false); // Scanning state
  const [noDevicesFound, setNoDevicesFound] = useState(false); // No devices found

  // Check Bluetooth availability and permissions
  const checkBluetoothSupportAndEnable = async () => {
    try {
      const available = await BluetoothClassic.isBluetoothAvailable();
      if (!available) {
        Alert.alert('Bluetooth Not Supported', 'Your device does not support Bluetooth.');
        return;
      }

      if (Platform.OS === 'android' && Platform.Version >= 31) {
        // Check permissions for Android 12+
        const permissions = [
          'android.permission.BLUETOOTH_CONNECT',
          'android.permission.BLUETOOTH_SCAN',
          'android.permission.ACCESS_FINE_LOCATION',
        ];
        await requestPermissions(permissions);
      }

      const enabled = await BluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        const result = await BluetoothClassic.requestBluetoothEnabled();
        if (!result) {
          Alert.alert('Bluetooth Required', 'Please enable Bluetooth to use this feature.');
          return;
        }
      }

      Alert.alert('Bluetooth Enabled', 'Bluetooth is enabled successfully!');
      fetchPairedDevices();
    } catch (error) {
      Alert.alert('Bluetooth Error', `Error: ${error.message}`);
    }
  };

  // Android 12+ Permissions Handling
  const requestPermissions = async (permissions) => {
    const { PermissionsAndroid } = require('react-native');
    for (const permission of permissions) {
      const granted = await PermissionsAndroid.request(permission);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Required', `Permission ${permission} is required.`);
      }
    }
  };

  // Fetch paired devices
  const fetchPairedDevices = async () => {
    try {
      setNoDevicesFound(false);
      const pairedDevices = await BluetoothClassic.getBondedDevices();
      if (pairedDevices.length === 0) {
        setNoDevicesFound(true);
        Alert.alert('No Paired Devices', 'No paired devices found.');
      }
      setDevices(pairedDevices);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch paired devices.');
    }
  };

  // Scan for nearby devices
  const scanForDevices = async () => {
    setIsScanning(true);
    setNoDevicesFound(false);
    setDevices([]);
    try {
      const scannedDevices = await BluetoothClassic.startDiscovery();
      if (scannedDevices.length === 0) {
        setNoDevicesFound(true);
        Alert.alert('No Devices Found', 'No Bluetooth devices found nearby.');
      } else {
        Alert.alert('Scan Complete', `Found ${scannedDevices.length} devices.`);
      }
      setDevices(scannedDevices);
    } catch (error) {
      Alert.alert('Scan Error', `Error scanning for devices: ${error.message}`);
    } finally {
      setIsScanning(false);
    }
  };

  // Connect to a Bluetooth device
  const connectToDevice = async (device) => {
    try {
      console.log('Attempting to connect to:', device.name, device.id);
      const isConnected = await BluetoothClassic.connectToDevice(device.id);
      if (isConnected) {
        setConnectedDevice(device);
        Alert.alert('Device Connected', `Connected to ${device.name || 'Unnamed Device'}.`);
      } else {
        Alert.alert('Connection Failed', 'Unable to establish a connection.');
      }
    } catch (error) {
      console.error('Connection Error:', error);
      Alert.alert('Connection Error', `Failed to connect: ${error.message}`);
    }
  };
  // Function to initialize the connection
  // const connectToDevice = async (device) => {
  //   try {
  //     // Check if already connected
  //     let connection = await device.isConnected();
  //     if (!connection) {
  //       console.log('Attempting to connect...');
  //       connection = await device.connect({
  //           DELIMITER: '\n', // Split data on newlines
  //           ENCODING: 'utf-8', // Specify character encoding
  //           TIMEOUT: 5000, // 5 seconds timeout for connection
  //         }); // Connect with options
  //     }

  //     if (connection) {
  //       console.log('Successfully connected to device');
        
  //       Alert.alert('Device Connected', `Successfully connected to ${device.name || 'Device'}`);
  //     } else {
  //       throw new Error('Connection failed');
  //     }
  //   } catch (error) {
  //     console.error('Connection Error:', error.message);
  //     Alert.alert('Connection Failed', `Error: ${error.message || 'Unknown error'}`);
  //   }
  // };

  // Disconnect from the current device
  const disconnectDevice = async () => {
    if (connectedDevice) {
      try {
        await BluetoothClassic.disconnect();
        setConnectedDevice(null);
        Alert.alert('Device Disconnected', 'Successfully disconnected from the device.');
      } catch (error) {
        Alert.alert('Disconnection Failed', `Error: ${error.message}`);
      }
    }
  };

  // On component mount, check Bluetooth availability
  useEffect(() => {
    checkBluetoothSupportAndEnable();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Devices</Text>

      {connectedDevice ? (
        <View style={styles.connectedContainer}>
          <Text style={styles.connectedText}>
            Connected to {connectedDevice.name}
          </Text>
          <Button title="Disconnect" onPress={disconnectDevice} />
        </View>
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <Button title="Refresh Paired Devices" onPress={fetchPairedDevices} />
            <Button title="Scan for Devices" onPress={scanForDevices} />
          </View>

          {isScanning ? (
            <ActivityIndicator size="large" color="blue" />
          ) : noDevicesFound ? (
            <Text style={styles.noDeviceText}>No devices found. Try scanning again.</Text>
          ) : (
            <FlatList
              data={devices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.deviceItem}
                  onPress={() => connectToDevice(item)}
                >
                  <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
                  <Text style={styles.deviceId}>{item.id}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  connectedContainer: { marginVertical: 20, alignItems: 'center' },
  connectedText: { fontSize: 18, marginBottom: 10, color: 'green' },
  deviceItem: { padding: 12, borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  deviceName: { fontSize: 16, fontWeight: 'bold' },
  deviceId: { fontSize: 14, color: 'gray' },
  noDeviceText: { fontSize: 16, textAlign: 'center', color: 'red', marginVertical: 20 },
});

export default BluetoothConnection;
