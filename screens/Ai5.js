import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Animated,
  Easing,
  ImageBackground,
  Vibration,
} from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";

export default function Ai4() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [isDesktop, setIsDesktop] = useState(false);
  const navigation = useNavigation();
  const [glitchAnim] = useState(new Animated.Value(0));
  const [scanlineAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
      setIsDesktop(window.width >= 768);
    });

    setIsDesktop(dimensions.width >= 768);

    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    // Glitch animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glitchAnim, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(glitchAnim, {
          toValue: 0,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Scanline animation
    Animated.loop(
      Animated.timing(scanlineAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false, // Changed to false for scanline positioning
      })
    ).start();

    return () => subscription?.remove();
  }, []);

  const glitchOffset = glitchAnim.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    outputRange: [0, -2, 2, -3, 3, -2, 2, -1, 1, -2, 0],
  });

  const scanlinePosition = scanlineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Reduced video container size
  const videoWidth = isDesktop
    ? Math.min(dimensions.width * 0.35, 320) // Reduced from 0.4 to 0.35
    : dimensions.width * 0.85; // Reduced from 0.9 to 0.85
  const videoHeight = videoWidth * (16 / 9);

  const handleControlPress = () => {
    Vibration.vibrate(50);
    status.isPlaying
      ? videoRef.current.pauseAsync()
      : videoRef.current.playAsync();
  };

  return (
    <ImageBackground
      source={require("../assets/bot.jpg")}
      style={styles.container}
      imageStyle={{ opacity: 0.1 }}
    >
      {/* Video Container - Reduced in size */}
      <Animated.View
        style={[
          styles.videoContainer,
          {
            width: videoWidth,
            height: videoHeight,
            transform: [{ translateX: glitchOffset }],
            marginTop: 20, // Reduced top margin
          },
        ]}
      >
        {/* Corner brackets */}
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />

        <Video
          ref={videoRef}
          style={styles.video}
          source={require("../assets/robot1.mp4")}
          useNativeControls={false}
          resizeMode="cover"
          isLooping
          shouldPlay
          onPlaybackStatusUpdate={setStatus}
        />

        {/* Fixed scanline effect */}
        <Animated.View
          style={[
            styles.scanline,
            {
              transform: [
                {
                  translateY: scanlinePosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, videoHeight],
                  }),
                },
              ],
            },
          ]}
        />

        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.statusLight,
              { backgroundColor: status.isPlaying ? "#0f0" : "#f00" },
            ]}
          />
          <Text style={styles.statusText}>
            {status.isPlaying ? "LIVE" : "PAUSED"}
          </Text>
        </View>
      </Animated.View>

      {/* Control Panel - Now includes back button */}
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[styles.controlButton, styles.aiButton]}
          onPress={handleControlPress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {status.isPlaying ? "[ PAUSE FEED ]" : "[ RESUME FEED ]"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.backButton]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{"< BACK TO TERMINAL"}</Text>
        </TouchableOpacity>
      </View>

      {/* Hacker Text */}
      <Animated.View style={{ transform: [{ translateX: glitchOffset }] }}>
        <Text style={styles.hackerText}>
          {`> SYSTEM BREACH DETECTED [CRITICAL]\n`}
          {`> QUANTUM TUNNELING ACTIVE [WARNING]\n`}
          {`> REALITY PROTOCOLS COMPROMISED [ERROR]`}
        </Text>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>SECURITY LEVEL: Platinum</Text>
        <Text style={styles.footerText}>Owner: Pyae Phyo Thaw</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-start", // Changed from center to flex-start
    alignItems: "center",
    padding: 15, // Reduced padding
  },
  videoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#00ffe5",
    shadowColor: "#00ffe5",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 30,
    overflow: "hidden",
    marginBottom: 15, // Added margin bottom
  },
  video: {
    width: "100%",
    height: "100%",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#00ffcc",
    zIndex: 2,
  },
  cornerTL: {
    top: 5,
    left: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  cornerTR: {
    top: 5,
    right: 5,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  cornerBL: {
    bottom: 5,
    left: 5,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  cornerBR: {
    bottom: 5,
    right: 5,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  scanline: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(0, 255, 200, 0.3)",
    zIndex: 1,
  },
  statusIndicator: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 4,
    zIndex: 2,
  },
  statusLight: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    color: "#fff",
    fontFamily: "Courier",
    fontSize: 12,
  },
  hackerText: {
    color: "#0f0",
    fontFamily: "Courier",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginVertical: 15,
    textShadowColor: "#00ffcc",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  controlPanel: {
    flexDirection: "column", // Changed to column layout
    width: "100%",
    marginBottom: 15,
  },
  controlButton: {
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 10,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    borderWidth: 1,
    borderColor: "#00aaaa",
  },
  aiButton: {
    backgroundColor: "rgba(0, 50, 50, 0.7)",
    borderWidth: 1,
    borderColor: "#00ffcc",
  },
  buttonText: {
    color: "#00ffcc",
    fontFamily: "Courier",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  footerText: {
    color: "rgba(0, 255, 200, 0.5)",
    fontFamily: "Courier",
    fontSize: 12,
  },
});
