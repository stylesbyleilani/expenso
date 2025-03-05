import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomNavbar from "../components/Navbar";
import { useUser } from '../context/userContext';
const AccountScreen = ({navigation}) => {

  const { user } = useUser(); 
  

  const menuItems = [
    { icon: 'edit', label: 'Edit Profile', onPress: () => navigation.navigate('EditProfile') },
    { icon: 'settings', label: 'Settings', onPress: () => navigation.navigate('Settings') },
    { icon: 'lock', label: 'Privacy', onPress: () => navigation.navigate('Privacy') },
    { icon: 'log-out', label: 'Logout', onPress: () => navigation.navigate('loginScreen')  },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Profile</Text>
        
        <View style={styles.profileContainer}>
          <Image 
            source={require('../assets/m4.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.username}> {user.username || 'User'} </Text>
                  {/* <Text style={styles.welcome}>Hello {user.username || 'User'}</Text> */}
          
          <Text style={styles.email}> {user.email || 'Email'} </Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <Feather name={item.icon} size={24} color="white" />
              <Text style={styles.menuText}>{item.label}</Text>
              <Feather name="chevron-right" size={20} color="gray" style={styles.chevron} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Bottom Navbar */}
      <View style={styles.navbarContainer}>
        <CustomNavbar/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  menuContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  menuText: {
    color: "white",
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
  navbarContainer: {
    width: '100%',
  }
});

export default AccountScreen;