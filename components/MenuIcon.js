

import React, { memo } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { IconButton, MD3Colors } from "react-native-paper";

const MENU_ITEMS = [
  { id: 'income', label: 'Income', iconColor: '#cbe4ed' , icon:"arrow-down"},
  { id: 'expense', label: 'Expense', iconColor: '#cbe4ed' , icon:"arrow-up" },
  { id: 'savings', label: 'Savings', iconColor: '#cbe4ed' , icon: "account" },
  { id: 'investments', label: 'Investments', iconColor: '#cbe4ed' , icon: "wallet" }
];
  


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
        icon={icon} // Added the missing icon prop
        iconColor="black" // Use a color that contrasts well
        size={24} 
        onPress={onPress} 
      />
    </View>
    <Text style={styles.iconText}>{label}</Text>
  </Pressable>
));

const IconMenu = ({ onItemPress }) => (
  <View style={styles.iconContainer}>
    {MENU_ITEMS.map((item) => (
      <IconMenuItem
        key={item.id}
        label={item.label}
        icon={item.icon} // Pass the icon from MENU_ITEMS
        iconColor={item.iconColor}
        onPress={() => onItemPress?.(item.id)}
      />
    ))}
  </View>
);

    


const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 16,
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
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default memo(IconMenu);



