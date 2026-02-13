import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
  Animated,
  Easing,
  ImageBackground
} from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Ai4({ navigation }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isDesktop, setIsDesktop] = useState(false);
  const [rainbowAnim] = useState(new Animated.Value(0));
  const [glitchAnim] = useState(new Animated.Value(0));

  // Rainbow and glitch animations
  useEffect(() => {
    const animateRainbow = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rainbowAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(rainbowAnim, {
            toValue: 0,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    const animateGlitch = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glitchAnim, {
            toValue: 1,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(glitchAnim, {
            toValue: 0,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    animateRainbow();
    animateGlitch();
  }, []);

  // Responsive layout
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      setIsDesktop(window.width >= 768);
    });

    setIsDesktop(dimensions.width >= 768);

    if (Platform.OS !== 'web') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    return () => subscription?.remove();
  }, []);

  const rainbowColors = rainbowAnim.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [
      '#ff0000', '#ff9900', '#ffff00', 
      '#00ff00', '#0066ff', '#cc00ff'
    ],
  });

  const glitchOffset = glitchAnim.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    outputRange: [0, -2, 2, -3, 3, -2, 2, -1, 1, -2, 0]
  });

  const videoStyle = {
    width: isDesktop ? Math.min(dimensions.width * 0.8, 800) : dimensions.width * 0.95,
    height: isDesktop ? Math.min(dimensions.width * 0.45, 450) : dimensions.width * 0.6,
  };

  return (
    <ImageBackground 
      source={require('../assets/astronut.jpg')} 
      style={styles.container}
      imageStyle={{ opacity: 0.15 }}
    >
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← BACK TO TERMINAL</Text>
        </TouchableOpacity>
        <Text style={styles.title}>SECURE FEED CHANNEL 04</Text>
      </View>

      {/* Main video container */}
      <Animated.View style={[
        styles.videoContainer, 
        videoStyle,
        { transform: [{ translateX: glitchOffset }] }
      ]}>
        <View style={styles.videoBorder}>
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />
          
          <Video
            ref={videoRef}
            style={styles.video}
            source={require('../assets/robot.mp4')}
            useNativeControls={false}
            resizeMode="cover"
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={setStatus}
          />
          
          <View style={styles.statusOverlay}>
            <Text style={styles.statusText}>LIVE FEED {status.isPlaying ? 'ACTIVE' : 'PAUSED'}</Text>
            <View style={styles.statusLight}>
              <Animated.View style={[
                styles.statusLightInner, 
                { backgroundColor: status.isPlaying ? '#0f0' : '#f00' }
              ]} />
            </View>
          </View>
        </View>
      </Animated.View>

      {/* System messages */}
      <Animated.View style={[styles.messageContainer, { transform: [{ translateX: glitchOffset }] }]}>
        <Text style={styles.hackerText}>
          {`> SYSTEM BREACH DETECTED [CRITICAL]\n`}
          {`> QUANTUM TUNNELING ACTIVE [WARNING]\n`}
          {`> REALITY PROTOCOLS COMPROMISED [ERROR]`}
        </Text>
      </Animated.View>

      {/* Control panel */}
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={styles.aiButton}
          onPress={() => status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()}
        >
          <Text style={styles.buttonText}>
            {status.isPlaying ? '[ PAUSE FEED ]' : '[ RESUME FEED ]'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Advanced control */}
      <Animated.View style={[styles.rainbowButtonContainer, { borderColor: rainbowColors }]}>
        <TouchableOpacity
          style={styles.rainbowButton}
          onPress={() => navigation.navigate('AI5')}
        >
          <Text style={styles.rainbowButtonText}>LAUNCH DEVELOPER MODE</Text>
          <Animated.View 
            style={[
              styles.sparkle, 
              { 
                backgroundColor: rainbowColors,
                shadowColor: rainbowColors,
              }
            ]}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>SECURITY LEVEL: OMEGA</Text>
        <Text style={styles.footerText}>ACCESS: RESTRICTED</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 255, 200, 0.3)',
  },
  backButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 50, 50, 0.3)',
  },
  backButtonText: {
    color: '#0ff',
    fontFamily: 'Courier',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    color: '#0f0',
    fontFamily: 'Courier',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 255, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  videoContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  videoBorder: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 200, 0.5)',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    padding: 3,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  cornerTL: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 20,
    height: 20,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#0ff',
    zIndex: 1,
  },
  cornerTR: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: '#0ff',
    zIndex: 1,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    width: 20,
    height: 20,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#0ff',
    zIndex: 1,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#0ff',
    zIndex: 1,
  },
  statusOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 5,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontFamily: 'Courier',
    fontSize: 12,
    marginRight: 8,
  },
  statusLight: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLightInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  messageContainer: {
    backgroundColor: 'rgba(0, 30, 30, 0.3)',
    borderLeftWidth: 4,
    borderLeftColor: '#0f0',
    padding: 15,
    marginBottom: 20,
  },
  hackerText: {
    color: '#0f0',
    fontFamily: 'Courier',
    fontSize: 14,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 255, 0, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  aiButton: {
    backgroundColor: 'rgba(0, 50, 50, 0.5)',
    borderWidth: 1,
    borderColor: '#0ff',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#0ff',
    fontFamily: 'Courier',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rainbowButtonContainer: {
    borderWidth: 2,
    borderRadius: 30,
    marginBottom: 30,
    overflow: 'hidden',
    shadowColor: '#0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    alignSelf: 'center',
  },
  rainbowButton: {
    backgroundColor: 'rgba(10, 30, 50, 0.7)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  rainbowButtonText: {
    color: '#fff',
    fontFamily: 'Courier',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  sparkle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    top: -50,
    opacity: 0.3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 255, 200, 0.3)',
  },
  footerText: {
    color: '#0ff',
    fontFamily: 'Courier',
    fontSize: 12,
    opacity: 0.7,
  },
});