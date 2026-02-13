import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Ai3() {
  const navigation = useNavigation();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotation loop
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
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

    // Shimmer animation for button
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const float = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 200],
  });

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>◄ RETURN TO NEXUS</Text>
      </TouchableOpacity>

      <Text style={styles.title}>QUANTUM CREATION ENGINE</Text>

      {/* Centered full image */}
      <Animated.View
        style={[
          styles.imageContainer,
          { transform: [{ translateY: float }] }
        ]}
      >
        <Image
          source={require('../assets/wind_breaker.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <Animated.View
          style={[
            styles.rotatingBorder,
            { transform: [{ rotate: spin }] },
          ]}
        />
        <View style={styles.holographicGlow} />
      </Animated.View>

      <Text style={styles.description}>
        This <Text style={styles.highlight}>neural creation</Text> showcases the quantum computing power of our 45th century AI — blending <Text style={styles.highlight}>holographic design</Text>, imagination, and fluid dynamics in a way that feels alive.
        {"\n\n"}
        Experience the <Text style={styles.highlight}>future of creativity</Text> through our quantum 3D engine, photonic VFX, and neural interface technology.
      </Text>

      <View style={styles.interactiveRow}>
        {['NEURAL EDIT', 'QUANTUM RENDER'].map((label, index) => (
          <TouchableOpacity key={index} style={styles.interactiveButton}>
            <Animated.View
              style={[
                styles.shimmerOverlay,
                { transform: [{ translateX: shimmerTranslate }] },
              ]}
            />
            <Text style={styles.interactiveText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#00F7FF',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 247, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  imageContainer: {
    width: width,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 30,
  },
  image: {
    width: width,
    height: '100%',
    borderRadius: 0,
    zIndex: 2,
  },
  rotatingBorder: {
    position: 'absolute',
    width: width - 20,
    height: height * 0.5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF2D75',
    borderStyle: 'dashed',
    zIndex: 1,
  },
  holographicGlow: {
    position: 'absolute',
    width: width - 30,
    height: height * 0.5,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 247, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 247, 255, 0.2)',
    zIndex: 0,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 24,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  highlight: {
    color: '#FF2D75',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 45, 117, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 247, 255, 0.3)',
    borderRadius: 8,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#00F7FF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  interactiveRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  interactiveButton: {
    backgroundColor: 'rgba(162, 0, 255, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(162, 0, 255, 0.5)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: 80,
    height: '100%',
    borderRadius: 20,
    transform: [{ rotate: '20deg' }],
  },
  interactiveText: {
    color: '#A200FF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
    zIndex: 1,
  },
});
