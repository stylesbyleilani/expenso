import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  Platform, 
  StatusBar, 
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {  signInWithEmailAndPassword } from "firebase/auth";
import Toast from 'react-native-toast-message';
import { IconButton } from "react-native-paper";

import { auth } from '../Lib/firebase';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  


const handleLogin  = async ()=>{
  try {
    const signinUser = await signInWithEmailAndPassword(auth, email, password)


    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'Welcome back!',
    });

    console.log("uset logged in", signinUser)

    setTimeout(() => {
      navigation.navigate("homeScreen");
    }, 1500);
  //   navigation.navigate("homeScreen")
  } catch (error) {

    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: error.message,
    });
    console.error("Error signing in:", error.message);

  } finally {
    setIsLoading(false);
  }

  //   Toast.show({
  //     type: 'errorr',
  //     text1: 'Login failed',
  //     text2:error.message,
  //   });

  //   // setIsLoading(false)
  //   console.error(error.message, "error signing in user")
    
  // }
}

const handleNavigation = ()=>{
  navigation.navigate("registerScreen")
}
const handleGoogleSignIn = async () => {
  console.log("google sign in")
}
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Hey</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login now to track all your expenses</Text>
        </View>

        <View style={styles.formSection}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#d4d4d4"
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          
          <TextInput
            placeholder="Password"
            placeholderTextColor="#d4d4d4"
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
          
          {/* <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGooleSignIn}
            disabled={isLoading}
          >
                <IconButton
      icon="google"
      iconColor="red"
      color='green'
      size={20}
    />


              <Text style={styles.loginButtonText}>Sign in with Google</Text>
          </TouchableOpacity> */}


<TouchableOpacity 
          style={[
            styles.googleButton, 
            isGoogleLoading && styles.disabledButton
          ]}
          onPress={handleGoogleSignIn}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <IconButton
                icon="google"
                iconColor="#DB4437"
                size={15}
                color='#d4d4d4'
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </>
          )}
        </TouchableOpacity>


          
<View style={styles.forgotPasswordContainer}>
  <Text style={styles.forgotPasswordText}>
    Don't have an account? {" "}
  </Text>
  <TouchableOpacity onPress={handleNavigation}>
    <Text style={styles.signup}>Sign up</Text>
  </TouchableOpacity>
</View>

        </View>
      </View>
      <Toast/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "black",
    flex: 1,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262626",
    // borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 13,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.6,
  },
  googleIcon: {
    marginRight: 10,
    fontWeight: '900',
  },
  googleButtonText: {
    color: "#d4d4d4",
    fontSize: 15,
    fontWeight: '600',
  }
,
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  signup:{
    color:"#e6e6ed",
    fontSize:17,
    fontWeight:700
  },
  headerSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: "white",
    lineHeight: 40,
  },
  subtitle: {
    color: "#ededed",
    fontSize: 16,
    marginTop: 10,
  },
  formSection: {
    width: '100%',
  },
  textInput: {
    backgroundColor: "#262626",
    color: "#d4d4d4",
    padding: 15,
    borderColor: "#d4d4d4",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#8d9196",
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: "#5E60CE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: "#d4d4d4",
    fontSize: 14,
  }
});

export default LoginScreen;