
import * as React from 'react';
import { Avatar } from 'react-native-paper';
import { Text, SafeAreaView, StyleSheet, View, Platform, StatusBar} from 'react-native';
import { IconButton, MD3Colors } from "react-native-paper";
import { useUser } from '../context/userContext';
const MyComponent = () => {
  
  const { user } = useUser(); 

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Avatar.Image size={24} source={require('../assets/snack-icon.png')} />
        <Text style={styles.welcome}>Hello {user.username || 'User'}</Text>
      </View>
      <IconButton
        icon="bell"
        color="white"
        size={26}
      />
    </SafeAreaView>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  main:{
        flexDirection:"row",
        justifyContent:"space-between",
    alignItems:"center",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  container: {
    flex: 0,
    flexDirection:"row",
    gap:9,
    alignItems:"center",
    // justifyContent: 'center',
    marginHorizontal:15,
    // marginTop: Platform.OS === 'Android' ? 20 : 10,
  },
  welcome:{
fontWeight: 500,
    fontSize: 22,
    color:"white",
  },
});
