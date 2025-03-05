


import React, { useState } from 'react';
import { StyleSheet, View,Text, SafeAreaView , Platform, StatusBar} from 'react-native';
import ChartExample from "../components/ChartData"
import CustomNavbar from "../components/Navbar"

const ChartScreen = ({navigation}) => {
  


  return (

    <SafeAreaView style={styles.Container}>
<ChartExample/>
<CustomNavbar/>
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
Container: {
  
  backgroundColor:"black",
  flex:1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,



  },

  
});

export default ChartScreen;
