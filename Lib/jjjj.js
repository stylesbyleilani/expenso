
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "./firebase"; // Ensure this imports Firebase auth config
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const db = getFirestore(); // Initialize Firestore

const handleRegister = async () => {
  setIsLoading(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update Firebase Auth profile with username
    await updateProfile(user, {
      displayName: username, // Adds username to auth profile
    });

    // Save user details to Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
    });

    Toast.show({
      type: "success",
      text1: "Registration Successful",
      text2: "Welcome to Expenso!",
    });

    console.log("User registered:", user);

    setTimeout(() => {
      navigation.navigate("loginScreen");
    }, 1500);
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Registration Failed",
      text2: error.message,
    });
  } finally {
    setIsLoading(false);
  }
};




const HomeScreen = ({ route }) => {
  const { username, email } = route.params || {};

  return (
    <SafeAreaView>
      <Text>Welcome, {username}!</Text>
      <Text>Your email: {email}</Text>
    </SafeAreaView>
  );
};
