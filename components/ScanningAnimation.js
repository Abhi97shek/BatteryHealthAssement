import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Text, Image } from 'react-native';

const ScanningAnimation = () => {
  const animations = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]; // 3 ripples for the scanning effect

  useEffect(() => {
    const startRipple = (animation, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 0, // Reset
            useNativeDriver: true,
          }),
        ]),
        { delay }
      ).start();
    };

    // Start ripple animations with staggered delay
    animations.forEach((anim, index) => startRipple(anim, index * 500));
  }, [animations]);

  const renderRipple = (animation) => {
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 4], // Scale up
    });

    const opacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0], // Fade out
    });

    return (
      <Animated.View
        style={[
          styles.ripple,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trying to find Devices...</Text>
      <Text style={styles.subtitle}>Please get closer to your device.</Text>

      <View style={styles.animationContainer}>
        {animations.map((anim, index) => (
          <View key={index} style={styles.rippleContainer}>
            {renderRipple(anim)}
          </View>
        ))}
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/598/598257.png' }} // Bluetooth icon
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2DAAFF', // Blue background
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 50,
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  rippleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // White semi-transparent
    position: 'absolute',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#2DAAFF',
  },
});

export default ScanningAnimation;
