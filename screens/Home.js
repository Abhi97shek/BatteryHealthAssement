import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import engineLogo from "../components/assets/engine.png";
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient 
      colors={['#6F79FF', '#8B93FF']} 
      style={styles.container}
    >
      {/* Text Section */}
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.subTitle}>Battery Health Assement</Text>

      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <Image
          source={engineLogo} // Add your engine icon image here
          style={styles.icon}
        />
      </View>

      {/* Down Arrow */}
      <TouchableOpacity style={styles.connectButton} onPress={()=>navigation.navigate('DashBoard')}>
        <Text style={styles.connectText}>Let's Start</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  iconContainer: {
    marginVertical: 20,
  },
  icon: {
    width: 120,
    height: 120,
    tintColor: 'rgba(255, 255, 255, 0.5)', // Transparent white tint
  },
 
  connectButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginBottom: 20,
    position: 'absolute',
    bottom: 40,
  },
  connectText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});