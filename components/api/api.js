import { Alert } from 'react-native';

const PRODUCTION = true;
const BASE_URL = PRODUCTION
  ? 'https://ck677i8etd.execute-api.us-east-1.amazonaws.com/dev'
  : 'http://127.0.0.1:5000';

export const connectToBackend = async (port) => {
  try {
    const response = await fetch(`${BASE_URL}/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ port }),
    });
    const result = await response.json();
    if (response.ok) {
      Alert.alert('Success', `Backend connected successfully: ${result.port}`);
    } else {
      Alert.alert('Error', `Backend connection failed: ${result.message}`);
    }
  } catch (err) {
    console.error('Error connecting to backend:', err);
    Alert.alert('Error', 'Error connecting to backend. Check console for details.');
  }
};

export const getEngineVoltage = async () => {
  try {
    const response = await fetch(`${BASE_URL}/engine_voltage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (response.ok) {
      Alert.alert('Engine Voltage', `Engine Voltage: ${result}`);
    } else {
      Alert.alert('Error', `Backend connection failed: ${result.message}`);
    }
  } catch (err) {
    console.error('Error connecting to backend:', err);
    Alert.alert('Error', 'Error connecting to backend. Check console for details.');
  }
};
