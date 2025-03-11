// import React from 'react';
// import { StyleSheet, View, Text, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import CustomNavbar from "../components/Navbar";
// import { useUser } from '../context/userContext';
// const AccountScreen = ({navigation}) => {

//   const { user } = useUser(); 
  

//   const menuItems = [
//     { icon: 'edit', label: 'Edit Profile', onPress: () => navigation.navigate('EditProfileScreen') },
//     { icon: 'settings', label: 'Settings', onPress: () => navigation.navigate('Settings') },
//     { icon: 'lock', label: 'Privacy', onPress: () => navigation.navigate('Privacy') },
//     { icon: 'log-out', label: 'Logout', onPress: () => navigation.navigate('loginScreen')  },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.headerText}>Profile</Text>
        
//         <View style={styles.profileContainer}>
//           <Image 
//             source={require('../assets/m4.jpg')}
//             style={styles.profileImage}
//           />
//           <Text style={styles.username}> {user.username || 'User'} </Text>
//                   {/* <Text style={styles.welcome}>Hello {user.username || 'User'}</Text> */}
          
//           <Text style={styles.email}> {user.email || 'Email'} </Text>
//         </View>

//         <View style={styles.menuContainer}>
//           {menuItems.map((item, index) => (
//             <TouchableOpacity 
//               key={index} 
//               style={styles.menuItem}
//               onPress={item.onPress}
//             >
//               <Feather name={item.icon} size={24} color="white" />
//               <Text style={styles.menuText}>{item.label}</Text>
//               <Feather name="chevron-right" size={20} color="gray" style={styles.chevron} />
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
      
//       {/* Bottom Navbar */}
      // <View style={styles.navbarContainer}>
      //   <CustomNavbar/>
      // </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "black",
//     flex: 1,
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   content: {
//     flex: 1,
//     paddingBottom: 10,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "white",
//     alignSelf: "center",
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   username: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "white",
//     marginBottom: 5,
//   },
//   email: {
//     fontSize: 16,
//     color: "gray",
//   },
//   menuContainer: {
//     paddingHorizontal: 20,
//     flex: 1,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#333',
//   },
//   menuText: {
//     color: "white",
//     fontSize: 16,
//     marginLeft: 15,
//     flex: 1,
//   },
//   chevron: {
//     marginLeft: 'auto',
//   },
//   navbarContainer: {
//     width: '100%',
//   }
// });

// export default AccountScreen;





import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../context/userContext';
import EditProfileModal from '../components/EditProfileModal';
import CustomNavbar from "../components/Navbar";

const AccountScreen = ({ navigation }) => {
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(true);

  const handleCloseModal = () => {
    setModalVisible(false);
    // navigation.goBack();
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: 'user', label: 'Change Username', onPress: () => setModalVisible(true) },
        { icon: 'mail', label: 'Update Email', onPress: () => {} },
        { icon: 'lock', label: 'Change Password', onPress: () => {} }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'bell', label: 'Notifications', onPress: () => {} },
        { icon: 'globe', label: 'Language', onPress: () => {} },
        { icon: 'moon', label: 'Dark Mode', onPress: () => {} },
        { icon: 'log-out', label: 'Log out', onPress: () => navigation.navigate('loginScreen') }

      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={item.onPress}
              >
                <View style={styles.settingIconContainer}>
                  <Feather name={item.icon} size={20} color="white" />
                </View>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Feather name="chevron-right" size={20} color="gray" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <EditProfileModal
        visible={modalVisible}
        onClose={handleCloseModal}
      />
            <View style={styles.navbarContainer}>
        <CustomNavbar/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8d9196',
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingLabel: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },navbarContainer: {
        width: '100%',
      }
});

export default AccountScreen;



















// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   SafeAreaView,
//   Platform,
//   StatusBar,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useUser } from "../context/userContext";
// import { useTheme } from "../context/ThemeContext"; 
// import EditProfileModal from "../components/EditProfileModal";

// const AccountScreen = ({ navigation }) => {
//   const { user } = useUser();
//   const { theme, toggleTheme } = useTheme();
//   const [modalVisible, setModalVisible] = useState(true);

//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };

//   const isDarkMode = theme === "dark";

//   const settingsSections = [
//     {
//       title: "Account",
//       items: [
//         { icon: "user", label: "Change Username", onPress: () => setModalVisible(true) },
//         { icon: "mail", label: "Update Email", onPress: () => {} },
//         { icon: "lock", label: "Change Password", onPress: () => {} },
//       ],
//     },
//     {
//       title: "Preferences",
//       items: [
//         { icon: "bell", label: "Notifications", onPress: () => {} },
//         { icon: "globe", label: "Language", onPress: () => {} },
//         { icon: "moon", label: isDarkMode ? "Light Mode" : "Dark Mode", onPress: toggleTheme },
//         { icon: "log-out", label: "Log out", onPress: () => navigation.navigate("loginScreen") },
//       ],
//     },
//   ];

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "black" : "white" }]}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Feather name="arrow-left" size={24} color={isDarkMode ? "white" : "black"} />
//         </TouchableOpacity>
//         <Text style={[styles.headerText, { color: isDarkMode ? "white" : "black" }]}>
//           Edit Profile
//         </Text>
//         <View style={styles.placeholder} />
//       </View>

//       <ScrollView style={styles.content}>
//         {settingsSections.map((section, sectionIndex) => (
//           <View key={sectionIndex} style={styles.section}>
//             <Text style={[styles.sectionTitle, { color: isDarkMode ? "#8d9196" : "gray" }]}>
//               {section.title}
//             </Text>
//             {section.items.map((item, itemIndex) => (
//               <TouchableOpacity
//                 key={itemIndex}
//                 style={[styles.settingItem, { borderBottomColor: isDarkMode ? "#333" : "#ccc" }]}
//                 onPress={item.onPress}
//               >
//                 <View
//                   style={[
//                     styles.settingIconContainer,
//                     { backgroundColor: isDarkMode ? "#262626" : "#f0f0f0" },
//                   ]}
//                 >
//                   <Feather name={item.icon} size={20} color={isDarkMode ? "white" : "black"} />
//                 </View>
//                 <Text style={[styles.settingLabel, { color: isDarkMode ? "white" : "black" }]}>
//                   {item.label}
//                 </Text>
//                 <Feather name="chevron-right" size={20} color="gray" />
//               </TouchableOpacity>
//             ))}
//           </View>
//         ))}
//       </ScrollView>

//       <EditProfileModal visible={modalVisible} onClose={handleCloseModal} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderBottomWidth: 0.5,
//   },
//   backButton: {
//     padding: 5,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   placeholder: {
//     width: 34,
//   },
//   content: {
//     flex: 1,
//   },
//   section: {
//     marginBottom: 25,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 15,
//     marginBottom: 10,
//     marginTop: 15,
//   },
//   settingItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderBottomWidth: 0.5,
//   },
//   settingIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   settingLabel: {
//     fontSize: 16,
//     flex: 1,
//   },
// });

// export default AccountScreen;
