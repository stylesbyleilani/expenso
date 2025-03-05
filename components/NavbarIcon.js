

import React, { memo } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import MyComponent from './Icons';   

const MENU_ITEMS = [
  { id: 'income', label: 'Income',  },
  { id: 'expense', label: 'Expense',  },
  { id: 'savings', label: 'Savings',  },
  { id: 'investments', label: 'Investments', }
];

const IconMenuItem = memo(({ label, iconColor, onPress }) => (
  <Pressable 
    style={({ pressed }) => [
      styles.iconButton,
      pressed && styles.iconButtonPressed
    ]}
    onPress={onPress}
  >
    <View style={[styles.iconCircle, { backgroundColor: "white" }]}>
      <MyComponent  color="white"/>
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
        color="white" // Use a color that contrasts well
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
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default memo(IconMenu);