
import { Text, SafeAreaView, StyleSheet, View, Platform } from 'react-native';
import React, {useState} from "react"
import RecentTransaction from "../components/RecentTransactions"
import Card from "../components/Card"
import MyComponent from "../components/Avatar"
import CustomNavbar from "../components/Navbar"


export default function HomeScreen() {
  const [balance, setBalance] = useState(0)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
      <MyComponent/>
        <Card  balance={balance} setBalance={setBalance} />
        <RecentTransaction />
      </View>
<CustomNavbar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // marginTop: Platform.OS === 'Android' ? 89 : 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 20, // Adds space between Card and RecentTransaction
  }
});