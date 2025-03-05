




// 


import React, { memo } from 'react';
import { Text, View, StyleSheet, Platform, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const MENU_ITEMS = [
  { id: 'income', label: 'Home', iconColor: '#cbe4ed', icon: 'home' },
  { id: 'expense', label: 'Analytics', iconColor: '#cbe4ed', icon: 'chart-bar' },
  { id: 'savings', label: 'Transactions', iconColor: '#cbe4ed', icon: 'wallet' },
  { id: 'investments', label: 'Account', iconColor: '#cbe4ed', icon: 'account' }
];

// Moved useNavigation inside the component
const IconMenu = ({ onItemPress }) => {
  const navigation = useNavigation(); 

  // Handler for navigation
  const handleNavigation = (id) => {
    switch (id) {
      case 'income':
        navigation.navigate('homeScreen');
        break;
      case 'expense':
        navigation.navigate('chartScreen');
        break;
      case 'savings':
        navigation.navigate('transactionScreen');
        break;
      case 'investments':
        navigation.navigate('accountScreen');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.iconContainer}>
      {MENU_ITEMS.map((item) => (
        <IconMenuItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          onPress={() => handleNavigation(item.id)} // Use the handler here
        />
      ))}
    </View>
  );
};

const IconMenuItem = memo(({ label, icon, iconColor, onPress }) => (
  <Pressable 
    style={({ pressed }) => [
      styles.iconButton,
      pressed && styles.iconButtonPressed
    ]}
    onPress={onPress}
  >
    <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
      <IconButton 
        icon={icon} 
        color="white"
        size={24} 
      />
    </View>
    <Text style={styles.iconText}>{label}</Text>
  </Pressable>
));

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    height: Platform.OS === "android" ? 70 : 54,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: "black"
  },
  iconButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    minWidth: 80,
  },
  iconButtonPressed: {
    opacity: 0.7,
  },
  iconText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default memo(IconMenu);

