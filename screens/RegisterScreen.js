// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   SafeAreaView,
//   Platform,
//   StatusBar,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import Toast from 'react-native-toast-message';
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { IconButton } from "react-native-paper";

// import { useNavigation } from '@react-navigation/native';
// // import { getAuth, createUserWithEmailAndPassword , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { 
//   getAuth, 
//   createUserWithEmailAndPassword, 
//   signInWithPopup, 
//   GoogleAuthProvider 
// } from "firebase/auth";
// import { db } from '../Lib/firebase';
// import { auth } from '../Lib/firebase';
// import { useUser } from '../context/userContext';
// const RegisterScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);
  
//   const db = getFirestore();
//   const { setUser } = useUser(); 






// const handleLogin  =  async ()=>{
//   // try {  o
//   //   setIsLoading(true)
//   // const userCredential = await  createUserWithEmailAndPassword(auth, email, password)
//   // Toast.show({
//   //   type: 'success',
//   //       text1: 'Registration Successful',
//   //       text2: 'Welcome to expenso!',
//   //     });
      
//   //     console.log("user logged in", userCredential)




//   try {
//     setIsLoading(true);
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
//     setUser({
//       username: username,
//       email: email
//     });

//     await setDoc(doc(db, "users", userCredential.user.uid), {
//       username: username,
//       email: email,
//       createdAt: new Date()
//     });
// console.log(userCredential, "new user created")
//     Toast.show({
//       type: 'success',
//       text1: 'Registration Successful',
//       text2: 'Welcome to expenso!',
//     });

  
//       setTimeout(() => {
//         navigation.navigate("loginScreen");
//       }, 1500);
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Registration Failed', 
//         text2: error.message,
//       });
//     } finally {
//       setIsLoading(false);
//     }
  
  
// }


// const handleNavigation =()=>{
//   navigation.navigate("loginScreen")
// }
// // const handleGoogleSignIn = async () => {
// //   try {
// //     const googleProvider = new GoogleAuthProvider()
// //     const result = await signInWithPopup(auth, googleProvider()) 
// //     const credential = GoogleAuthProvider.credentialFromResult(result);
// //     const token = credential?.accessToken;
// //     const user = result.user;
// //     console.log("Google Sign-In Successful", {
// //       uid: user.uid,
// //       email: user.email,
// //       displayName: user.displayName
// //     });

// //     Toast.show({
// //       type: 'success',
// //       text1: 'Sign In Successful',
// //       text2: `Welcome, ${user.displayName || 'User'}!`
// //     });
// //     navigation.navigate("homeScreen");


// //   } catch (error) {
    
// //     console.error("Google Sign-In Error", error);

// //     let errorMessage = "An error occurred during Google Sign-In";
    
// //     if (error.code === 'auth/account-exists-with-different-credential') {
// //       errorMessage = "An account already exists with a different credential";
// //     } else if (error.code === 'auth/popup-blocked') {
// //       errorMessage = "Google Sign-In popup was blocked. Please enable popups.";
// //     } else if (error.code === 'auth/popup-closed-by-user') {
// //       errorMessage = "Sign-in popup was closed before completion";
// //     }

// //     // Show error toast
// //     Toast.show({
// //       type: 'error',
// //       text1: 'Google Sign-In Failed',
// //       text2: errorMessage
// //     });




// //   }


// // }





// // const handleGoogleSignIn = async () => {
// //   try {
// //     setIsGoogleLoading(true);
    
// //     // Create Google Auth Provider (correctly instantiated)
// //     const googleProvider = new GoogleAuthProvider();
    
// //     // Optional: Add scopes if needed
// //     googleProvider.addScope('profile');
// //     googleProvider.addScope('email');

// //     // Use the provider directly, not as a function
// //     const result = await signInWithPopup(auth, googleProvider);
    
// //     // Get the credentials and access token
// //     const credential = GoogleAuthProvider.credentialFromResult(result);
// //     const token = credential?.accessToken;
    
// //     // Get the signed-in user
// //     const user = result.user;
    
// //     // Create user document in Firestore
// //     const db = getFirestore();
// //     await setDoc(doc(db, "users", user.uid), {
// //       username: user.displayName || 'Google User',
// //       email: user.email,
// //       createdAt: new Date(),
// //       provider: 'google'
// //     });

// //     // Set user in context if you're using one
// //     setUser({
// //       username: user.displayName || 'Google User',
// //       email: user.email
// //     });

// //     // Log user details
// //     console.log("Google Sign-In Successful", {
// //       uid: user.uid,
// //       email: user.email,
// //       displayName: user.displayName
// //     });

// //     // Show success toast
// //     Toast.show({
// //       type: 'success',
// //       text1: 'Sign In Successful',
// //       text2: `Welcome, ${user.displayName || 'User'}!`
// //     });

// //     // Navigate to home screen
// //     navigation.navigate("homeScreen");

// //   } catch (error) {
// //     console.error("Google Sign-In Error", error);

// //     let errorMessage = "An error occurred during Google Sign-In";
    
// //     if (error.code === 'auth/account-exists-with-different-credential') {
// //       errorMessage = "An account already exists with a different credential";
// //     } else if (error.code === 'auth/popup-blocked') {
// //       errorMessage = "Google Sign-In popup was blocked. Please enable popups.";
// //     } else if (error.code === 'auth/popup-closed-by-user') {
// //       errorMessage = "Sign-in popup was closed before completion";
// //     }

// //     // Show error toast
// //     Toast.show({
// //       type: 'error',
// //       text1: 'Google Sign-In Failed',
// //       text2: errorMessage
// //     });
// //   } finally {
// //     setIsGoogleLoading(false);
// //   }
// // };





// const handleGoogleSignIn = async () => {
//   try {
//     setIsGoogleLoading(true);
    
//     // Create Google Auth Provider
//     const provider = new GoogleAuthProvider();
    
//     // Add scopes if needed
//     provider.addScope('profile');
//     provider.addScope('email');

//     // Perform sign-in
//     const result = await signInWithPopup(auth, provider);
    
//     // Get user from result
//     const user = result.user;

//     // Create user document in Firestore
//     await setDoc(doc(db, "users", user.uid), {
//       username: user.displayName || 'Google User',
//       email: user.email,
//       createdAt: new Date(),
//       provider: 'google'
//     });

//     // Update user context if you're using one
//     setUser({
//       username: user.displayName || 'Google User',
//       email: user.email
//     });

//     // Show success toast
//     Toast.show({
//       type: 'success',
//       text1: 'Sign In Successful',
//       text2: `Welcome, ${user.displayName || 'User'}!`
//     });

//     // Navigate to home screen
//     navigation.navigate("homeScreen");

//   } catch (error) {
//     // Detailed error logging
//     console.error("Detailed Google Sign-In Error:", {
//       code: error.code,
//       message: error.message,
//       fullError: error
//     });

//     // Error toast
//     Toast.show({
//       type: 'error',
//       text1: 'Google Sign-In Failed',
//       text2: error.message || 'An unexpected error occurred'
//     });
//   } finally {
//     setIsGoogleLoading(false);
//   }
// };




//   return (
//     <SafeAreaView style={styles.main}>
//       <View style={styles.container}>
//         <View style={styles.headerSection}>
//           <Text style={styles.title}>Hey</Text>
//           <Text style={styles.title}>Create an Account </Text>
//           <Text style={styles.subtitle}>
//             Create an account  now to track all your expenses
//           </Text>
//         </View>

//         <View style={styles.formSection}>
//           <TextInput
//             placeholder="Username"
//             placeholderTextColor="#d4d4d4"
//             style={styles.textInput}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={username}
//             onChangeText={setUsername}
//           />
//           <TextInput
//             placeholder="Email"
//             placeholderTextColor="#d4d4d4"
//             style={styles.textInput}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={email}
//             onChangeText={setEmail}
//           />

//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#d4d4d4"
//             style={styles.textInput}
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />

//           <TouchableOpacity
//             style={styles.loginButton}
//             onPress={handleLogin}
//             disabled={isLoading}>
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.loginButtonText}>Register</Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//           style={[
//             styles.googleButton, 
//             isGoogleLoading && styles.disabledButton
//           ]}
//           onPress={handleGoogleSignIn}
//           disabled={isGoogleLoading}
//         >
//           {isGoogleLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <>
//               <IconButton
//                 icon="google"
//                 iconColor="#d4d4d4"
//                 size={14}
//                 color='#d4d4d4'
//                 style={styles.googleIcon}
//               />
//               <Text style={styles.googleButtonText}>Sign up with Google</Text>
//             </>
//           )}
//         </TouchableOpacity>




// <View style={styles.forgotPasswordContainer}>
//   <Text style={styles.forgotPasswordText}>
//     Already have an account? {" "}
//   </Text>
//   <TouchableOpacity onPress={handleNavigation}>
//     <Text style={styles.signup}>Sign in</Text>
//   </TouchableOpacity>
// </View>

//         </View>
//       </View>
//       <Toast/>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     backgroundColor: 'black',
//     flex: 1,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#262626",
//     // borderWidth: 1,
//     borderColor: "#E0E0E0",
//     borderRadius: 12,
//     padding: 13,
//     marginTop: 10,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   googleIcon: {
//     marginRight: 10,
//     fontWeight: '900',
//   },
//   googleButtonText: {
//     color: "#d4d4d4",
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   signup: {
//     color: '#e6e6ed',
//     fontSize: 17,
//     fontWeight: 700,
//   },
//   headerSection: {
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: 'white',
//     lineHeight: 40,
//   },
//   subtitle: {
//     color: '#ededed',
//     fontSize: 16,
//     marginTop: 10,
//   },
//   formSection: {
//     width: '100%',
//   },
//   textInput: {
//     backgroundColor: '#262626',
//     color: '#d4d4d4',
//     padding: 15,
//     borderColor: '#d4d4d4',
//     borderWidth: 1,
//     borderRadius: 12,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: '#8d9196',
//     borderRadius: 12,
//     padding: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     elevation: 3,
//     shadowColor: '#5E60CE',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   forgotPasswordContainer: {
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   forgotPasswordText: {
//     color: '#d4d4d4',
//     fontSize: 14,
//   },
// });

// export default RegisterScreen;





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
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { doc, setDoc } from "firebase/firestore";
import { IconButton } from "react-native-paper";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { 
  createUserWithEmailAndPassword, 
  signInWithPopup
} from "firebase/auth";
import { auth, db, GoogleAuthProvider } from '../Lib/firebase';
import { useUser } from '../context/userContext';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUser(); 

  const handleEmailRegister = async () => {
    // await ReactNativeAsyncStorage.getItem
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: username,
        email: email,
        createdAt: new Date(),
        provider: 'email'
      });

      setUser({
        username: username,
        email: email
      });

      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Welcome to Expenso!',
      });

      setTimeout(() => {
        navigation.navigate("loginScreen");
      }, 1500);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed', 
        text2: error.message,
      });
      console.error("Registration Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      
      const provider = new GoogleAuthProvider();
      
      provider.addScope('profile');
      provider.addScope('email');

      const result = await signInWithPopup(auth, provider);
      
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName || 'Google User',
        email: user.email,
        createdAt: new Date(),
        provider: 'google'
      });

      setUser({
        username: user.displayName || 'Google User',
        email: user.email
      });

      Toast.show({
        type: 'success',
        text1: 'Sign In Successful',
        text2: `Welcome, ${user.displayName || 'User'}!`
      });

      navigation.navigate("homeScreen");

    } catch (error) {
      console.error("Google Sign-In Error:", {
        code: error.code,
        message: error.message,
        fullError: error
      });

      Toast.show({
        type: 'error',
        text1: 'Google Sign-In Failed',
        text2: error.message || 'An unexpected error occurred'
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Hey</Text>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>
            Create an account now to track all your expenses
          </Text>
        </View>

        <View style={styles.formSection}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#d4d4d4"
            style={styles.textInput}
            value={username}
            onChangeText={setUsername}
          />
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
            style={styles.registerButton}
            onPress={handleEmailRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

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
                  iconColor="#d4d4d4"
                  size={20}
                />
                <Text style={styles.googleButtonText}>Sign up with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("loginScreen")}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'black',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    lineHeight: 40,
  },
  subtitle: {
    color: '#ededed',
    fontSize: 16,
    marginTop: 10,
  },
  formSection: {
    width: '100%',
  },
  textInput: {
    backgroundColor: '#262626',
    color: '#d4d4d4',
    padding: 15,
    borderColor: '#d4d4d4',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#8d9196',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  googleButtonText: {
    color: '#d4d4d4',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    color: '#d4d4d4',
    fontSize: 14,
  },
  loginLink: {
    color: '#e6e6ed',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default RegisterScreen;