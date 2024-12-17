import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  NativeModules,
  NativeEventEmitter,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  Linking,
  SafeAreaView,
  Alert
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BlueToothConnection = () => {
  const [bleDevices, setBleDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [currentDevice,setCurrentDevice] = useState(null);
  const BleManagerModule = NativeModules.BleManager;
  const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  const [data,setData] = useState(null);

  const handleGetConnectedDevices = () => {
    BleManager.getDiscoveredPeripherals().then((result) => {
      if (result.length === 0) {
        console.log('No Device Found');
        startScanning();
      } else {
        console.log('RESULTS:', JSON.stringify(result));
        const allDevices = result.filter((item) => item.name !== null); // Filter devices with a valid name
        setBleDevices(allDevices);
      }
    }).catch((err) => {
      console.error('Error fetching discovered devices:', err);
    });
  };

  const startScanning = () => {
    if (!scanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scan started');
          setScanning(true);
        })
        .catch((err) => {
          console.error('Error starting scan:', err);
        });
    }
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
  
      if (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
        startScanning();
      } else {
        console.log('Permission not granted');
        // Show an alert if permissions are denied
        Alert.alert(
          'Permissions Required',
          'Bluetooth and location permissions are necessary to use this feature. Please allow permissions.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openSettings().catch(() => {
                  Alert.alert('Error', 'Unable to open settings. Please open settings manually.');
                });
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (err) {
      console.error('Permission request error:', err);
    }
  };

  

  useEffect(() => {
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log('BleManager initialized');
      })
      .catch((err) => {
        console.error('Error initializing BleManager:', err);
      });
  },[]);

  const enableBluetooth = ()=>{
    BleManager.enableBluetooth()
    .then(() => {
      console.log('Bluetooth enabled');
      requestPermission();
    })
    .catch((err) => {
      console.error('Bluetooth not enabled:', err);
    });
  }
  // useEffect(() => {
   
  // }, []);

  const BlueToothHandler = ()=>{
    enableBluetooth();
  }


  useEffect(() => {
    const onStopListener = BleManager.onStopScan((args) => {
      console.log('Scanning stopped');
      setScanning(false);
      handleGetConnectedDevices();
    });
    return () => {
      onStopListener.remove();
    };
      
  }, []);

  const onConnect = async (item) => {
    try {
      console.log(`Connecting to device: ${item.id}...`);
     
      
      // Attempt to connect
      await BleManager.connect(item.id);
      console.log(`Connected to ${item.name || 'device'}`);
  
      // Set the currently connected device
      setCurrentDevice(item);
  
      // Retrieve services
      // const result = await BleManager.retrieveServices(item.id);
      // console.log('Services retrieved:', result);
  
      // setData(result); // Update state with service data
    } catch (error) {
      console.error('Connection error:', error);
      Alert.alert('Connection Failed', `Could not connect to ${item.name || 'device'}.`);
    } finally {
      console.log("Testing");
    }
  };

  // const onServiceDiscovered = (result,item)=>{


  // };

  const renderItem = ({ item }) => (
    <View style={styles.renderItemContainer}>
      <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
      <TouchableOpacity style={styles.connectButton} onPress={onConnect(item)}>
        <Text style={styles.connectButtonText} >Connect</Text>
      </TouchableOpacity>
    </View>
     
  );
 
  return (
     <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={BlueToothHandler}>
        <Text style={styles.btntext}>Start Scanning With BLE</Text>
      </TouchableOpacity>
      <View style={styles.scanningContainer}>
      {scanning ? (
        <View >
          <Text style={styles.scanningText}>Scanning for devices...</Text>
        </View>
      ) : (
        <FlatList
          data={bleDevices}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No Devices Found!</Text>
            </View>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
      </View>
      <View>
         {/* {currentDevice ? <Text>`{${currentDevice "Connected"}`</Text> : <Text>No data</Text>   }   */}
      </View>
     </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container:{
    marginTop:'20',
    justifyContent:'center',
    alignItems:'center',
  },
  scanningText:{
    marginTop:'20',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
  },
  btn:{
    borderRadius: 100, // Half of the width or height for a circular shape
    width: 180, // Width of the button
    height: 50, // Height of the button (same as width for a circle)
    backgroundColor: 'blue', // Add a background color to make it visible
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  btntext:{
    color:'white'
  },
  renderItemContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FBF6E9',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  deviceName: {
    fontSize: 16, // Adjusted size for readability
    color: '#333', // Darker text color
  },
  connectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF', // Blue background
    borderRadius: 5,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff', // White text
    fontSize: 16,
  },
  scanningContainer:{
    padding:20
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyListText: {
    fontSize: 18,
    color: '#999',
  }
});
export default BlueToothConnection;
