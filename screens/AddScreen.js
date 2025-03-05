
import React, { useState } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import AddOutput from "../components/AddOutput"
const AddScreen = ({navigation}) => {
  


  return (

    <View style={styles.Container}>
<AddOutput/>
     </View>
  );
};

const styles = StyleSheet.create({
  
Container: {
  
  backgroundColor:"#fafaff"

  },

  
});

export default AddScreen;
