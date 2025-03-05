


import React from 'react';
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  ImageBackground, 
  View, 
  Platform, 
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('loginScreen'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../assets/wel.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome to Finance Tracker</Text>
            <Text style={styles.subtitle}>Track your expenses and manage your finances with ease</Text>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={handleGetStarted}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    justifyContent: 'flex-end', // Position content at bottom
    paddingBottom: 50,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#d4d4d4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
});