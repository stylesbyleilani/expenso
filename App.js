
import { Text } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./screens/HomeScreen";
import AddScreen from "./screens/AddScreen";
import ChartScreen from "./screens/ChartScreen"
import AccountScreen from "./screens/AccountScreen"
import TransactionScreen from "./screens/TransactionScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import { ExpenseProvider } from "./context/context";
import Toast from 'react-native-toast-message';
import { UserProvider } from "./context/userContext";






const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ExpenseProvider> 
      <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="welcomeScreen" options={{headerShown:false}} >
                    <Stack.Screen name="welcomeScreen" component={WelcomeScreen} options={{headerShown:false}} />
                              <Stack.Screen name="loginScreen" component={LoginScreen} options={{headerShown:false}} />
                                                            <Stack.Screen name="registerScreen" component={RegisterScreen} options={{headerShown:false}} />


          <Stack.Screen name="homeScreen" component={HomeScreen} options={{headerShown:false}} />

          <Stack.Screen name="AddScreen" component={AddScreen} options={{headerShown:false}} />
                    <Stack.Screen name="chartScreen" component={ChartScreen}  options={{headerShown:false}}/>
                       <Stack.Screen name="accountScreen" component={AccountScreen}  options={{headerShown:false}}/>
                    <Stack.Screen name="transactionScreen" component={TransactionScreen}  options={{headerShown:false}}/>


        </Stack.Navigator>
      </NavigationContainer>
      <Toast /> 
      </UserProvider>
    </ExpenseProvider>
  );
}

 