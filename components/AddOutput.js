

import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import MyComponent from "./NavbarIcon"
import { IconButton, MD3Colors } from "react-native-paper";
import CustomForm from "./CustomForm"
const AddOutput = ({ title, showBack, navigation }) => {
  


  return (

    <View style={styles.Container}>
<View style={styles.formContainer}>
<CustomForm/>
</View>

     </View>
  );
};

const styles = StyleSheet.create({
  
Container: {
  borderRadius:10,

    alignItems: 'center',
    height:"70",
    paddingHorizontal: 8,
    marginTop: 16,
  },

  
  formContainer:{
    
  },
  
});

export default AddOutput;
