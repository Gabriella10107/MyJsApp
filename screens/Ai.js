import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Linking, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Ai() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Pulsing animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const floatInterpolation = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Futuristic gradient background */}
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Text style={styles.title}>NEO-CREATIVE AI STUDIO</Text>

      {/* Floating AI image with pulse animation */}
      <Animated.View style={[
        styles.imageContainer,
        { 
          transform: [
            { scale: pulseAnim },
            { translateY: floatInterpolation }
          ] 
        }
      ]}>
        <Image
          source={require('../assets/anime.jpg')}
          style={styles.gif}
          resizeMode="contain"
        />
        <View style={styles.holographicGlow} />
      </Animated.View>

      <Text style={styles.description}>
        This <Text style={styles.highlight}>quantum neural processor</Text> represents the power of our 45th century AI creating <Text style={styles.highlight}>holographic art</Text> in real-time.
        {"\n\n"}
        <Text style={styles.highlight}>Explore</Text> your imagination and bring it to life with our <Text style={styles.highlight}>neural interface</Text> technology.
      </Text>

      {/* Interactive buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.createButton]}
          onPress={() => Linking.openURL('https://www.pinterest.com')}
        >
          <Text style={styles.buttonText}>VIEW IN 3D</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.exploreButton]}
          onPress={() => Linking.openURL('https://www.pinterest.com')}
        >
          <Text style={styles.buttonText}>EXPLORE MORE</Text>
        </TouchableOpacity>
      </View>

      {/* Tech specs floating elements */}
      <View style={styles.specsContainer}>
        <View style={styles.specItem}>
          <View style={[styles.specIcon, { backgroundColor: '#FF2D75' }]} />
          <Text style={styles.specText}>Neural Rendering</Text>
        </View>
        <View style={styles.specItem}>
          <View style={[styles.specIcon, { backgroundColor: '#00F7FF' }]} />
          <Text style={styles.specText}>Quantum AI Core</Text>
        </View>
        <View style={styles.specItem}>
          <View style={[styles.specIcon, { backgroundColor: '#A200FF' }]} />
          <Text style={styles.specText}>Holographic Output</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexGrow: 1,
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00F7FF',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 247, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 30,
    shadowColor: '#00F7FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
  },
  gif: {
    width: Dimensions.get('window').width - 50,
    height: 300,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 247, 255, 0.3)',
    zIndex: 2,
  },
  holographicGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 247, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 247, 255, 0.2)',
    zIndex: 1,
    top: 0,
    left: 0,
  },
  description: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  highlight: {
    color: '#FF2D75',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 45, 117, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  createButton: {
    backgroundColor: 'rgba(0, 247, 255, 0.2)',
    borderColor: 'rgba(0, 247, 255, 0.5)',
  },
  exploreButton: {
    backgroundColor: 'rgba(255, 45, 117, 0.2)',
    borderColor: 'rgba(255, 45, 117, 0.5)',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  specsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  specItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  specIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  specText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});