import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';

export default function Home() {
  const navigation = useNavigation();
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  // Rotation animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulse = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.background}>
      {/* Futuristic gradient background */}
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Grid pattern overlay */}
      <View style={styles.gridOverlay} />

      {/* Floating futuristic elements */}
      <View style={styles.floatingOrb1} />
      <View style={styles.floatingOrb2} />
      <View style={styles.floatingOrb3} />

      <View style={styles.card}>
        {/* React logo with rotation */}
        <Animated.Image 
          source={{ uri: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png' }}
          style={[
            styles.logo, 
            { 
              transform: [{ rotate: spin }],
              tintColor: '#61DAFB' // React's brand blue
            }
          ]}
        />

        <Text style={styles.title}>REACT NATIVE UNIVERSE</Text>
        <Text style={styles.subtitle}>
          Build <Text style={styles.highlight}>cross-platform</Text> apps with{"\n"}
          <Text style={styles.highlight}>quantum performance</Text>
        </Text>

        <View style={styles.featureRow}>
          <View style={styles.feature}>
            <Animated.View style={[
              styles.featureIcon, 
              {backgroundColor: '#61DAFB'}, // React blue
              { transform: [{ scale: pulse }] }
            ]}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/919/919851.png' }} 
                style={{ width: 40, height: 40, tintColor: 'white' }}
              />
            </Animated.View>
            <Text style={styles.featureText}>Native Performance</Text>
          </View>
          <View style={styles.feature}>
            <Animated.View style={[
              styles.featureIcon, 
              {backgroundColor: '#FF2D75'},
              { transform: [{ scale: pulse }] }
            ]}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' }} 
                style={{ width: 40, height: 40, tintColor: 'white' }}
              />
            </Animated.View>
            <Text style={styles.featureText}>Hot Reload</Text>
          </View>
        </View>

        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AI3')}
          >
            <Text style={styles.buttonText}>LAUNCH DEVELOPER MODE</Text>
            <View style={[styles.sparkle, { backgroundColor: '#61DAFB' }]}></View>
          </TouchableOpacity>
        </Animated.View>

        {/* Futuristic decoration lines */}
        <View style={[styles.decorationLine1, { backgroundColor: 'rgba(97, 218, 251, 0.3)' }]} />
        <View style={[styles.decorationLine2, { backgroundColor: 'rgba(255, 45, 117, 0.3)' }]} />
      </View>
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    overflow: 'hidden',
  },
  gridOverlay: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    backgroundColor: 'transparent',
    opacity: 0.1,
    backgroundImage: 'linear-gradient(to right, #61DAFB 1px, transparent 1px), linear-gradient(to bottom, #61DAFB 1px, transparent 1px)',
    backgroundSize: '30px 30px',
  },
  card: {
    backgroundColor: 'rgba(15, 12, 41, 0.7)',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: 'rgba(97, 218, 251, 0.3)',
    shadowColor: '#61DAFB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    overflow: 'hidden',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#61DAFB',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(97, 218, 251, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  highlight: {
    color: '#FF2D75',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 45, 117, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  feature: {
    alignItems: 'center',
    width: '48%',
  },
  featureIcon: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  featureText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: 'rgba(97, 218, 251, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(97, 218, 251, 0.5)',
  },
  buttonText: {
    color: '#61DAFB',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textShadowColor: 'rgba(97, 218, 251, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  sparkle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  floatingOrb1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(97, 218, 251, 0.2)',
    top: '10%',
    left: '10%',
    shadowColor: '#61DAFB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  floatingOrb2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 45, 117, 0.1)',
    bottom: '15%',
    right: '10%',
    shadowColor: '#FF2D75',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  floatingOrb3: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(162, 0, 255, 0.1)',
    top: '60%',
    left: '20%',
    shadowColor: '#A200FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  decorationLine1: {
    position: 'absolute',
    height: 2,
    width: '120%',
    top: 20,
    left: -30,
    transform: [{ rotate: '-5deg' }],
  },
  decorationLine2: {
    position: 'absolute',
    height: 2,
    width: '120%',
    bottom: 20,
    left: -30,
    transform: [{ rotate: '5deg' }],
  },
}); 