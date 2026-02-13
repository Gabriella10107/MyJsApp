import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Linking, TouchableOpacity } from 'react-native';

export default function Ai2() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI-Generated Creativity</Text>

      {/* Replace WebView with a Pinterest image link */}
      

      {/* AI animation sample */}
      <Image
        source={require('../assets/anime1.jpg')}
        style={styles.gif}
        resizeMode="contain"
      />

      <Text style={styles.description}>
        This animation represents the power of Artificial Intelligence creating visual art in real-time.
        Explore your imagination and bring it to life with 3D, VFX, and AI tools.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  pinterestImage: {
    width: Dimensions.get('window').width - 40,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  gif: {
    width: Dimensions.get('window').width - 40,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});
