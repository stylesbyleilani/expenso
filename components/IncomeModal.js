








import React, { useState, useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { ExpenseContext } from '../context/context';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// Categories configuration
const INCOME_CATEGORIES = [
  { id: 1, name: 'Salary', icon: 'cash' },
  { id: 2, name: 'Freelance', icon: 'laptop' },
  { id: 3, name: 'Investments', icon: 'chart-line' },
  { id: 4, name: 'Bonus', icon: 'gift' },
  { id: 5, name: 'Rental', icon: 'home' },
  { id: 6, name: 'Other', icon: 'dots-horizontal' }
];

const AddIncomeTransaction = ({ onClose }) => {
  const navigation = useNavigation();
  const { handleAddTransaction } = useContext(ExpenseContext);
  const [showCategories, setShowCategories] = useState(false);
  
  const [transactionData, setTransactionData] = useState({
    category: '',
    categoryIcon: '',
    amount: '',
    date: '',
    description: ''
  });

  const handleCategorySelect = (category) => {
    setTransactionData(prev => ({
      ...prev,
      category: category.name,
      categoryIcon: category.icon
    }));
    setShowCategories(false);
  };

  const handleSubmit = () => {
    if (!transactionData.amount || !transactionData.category) return;
    
    handleAddTransaction({
      ...transactionData,
      amount: parseFloat(transactionData.amount)
    }, 'income');
    
    navigation.navigate("homeScreen");
    onClose();
  };

  const handleInputChange = (field, value) => {
    setTransactionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.headers}>
          <Text style={styles.modalHeader}>Income Details</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.form}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity 
            style={styles.categoryInput}
            onPress={() => setShowCategories(!showCategories)}
          >
            {transactionData.category ? (
              <View style={styles.selectedCategory}>
                <IconButton icon={transactionData.categoryIcon} size={20} color="green" />
                <Text style={styles.categoryText}>{transactionData.category}</Text>
              </View>
            ) : (
              <Text style={styles.placeholderText}>Select Category</Text>
            )}
          </TouchableOpacity>

          {showCategories && (
            <View style={styles.categoryList}>
              {INCOME_CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => handleCategorySelect(category)}
                >
                  <IconButton icon={category.icon} size={20} color="green" />
                  <Text style={styles.categoryItemText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}



          <Text style={styles.label}>Amount</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="0.00"
            keyboardType="numeric"
            value={transactionData.amount}
            onChangeText={(text) => handleInputChange('amount', text)}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Date</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="YYYY-MM-DD"
            value={transactionData.date}
            onChangeText={(text) => handleInputChange('date', text)}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="Description"
            value={transactionData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholderTextColor="#999"
          />

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: 'green' }]} 
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonlabel, { color: 'white' }]}>Add Income</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    borderWidth: 3,
    padding: Platform.OS === "ios" ? 18 : 13,
    borderRadius: 7,
    marginTop: 7,
    borderColor: "#8d9196",
    color: "black"
  },
  categoryInput: {
    backgroundColor: "white",
    borderWidth: 3,
    padding: Platform.OS === "ios" ? 18 : 13,
    borderRadius: 7,
    marginTop: 7,
    borderColor: "#8d9196",
    minHeight: 50,
    justifyContent: 'center'
  },
  selectedCategory: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryText: {
    color: 'black',
    fontSize: 16
  },
  placeholderText: {
    color: '#999',
    fontSize: 16
  },
  categoryList: {
    backgroundColor: 'white',
    borderRadius: 7,
    marginTop: 5,
    padding: 10
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  categoryItemText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10
  },
  button: {
    borderRadius: 9,
    marginTop: 14,
    padding: 10,
    alignItems: 'center'
  },
  buttonlabel: {
    fontSize: 24,
    fontWeight: '600',
  },
  label: {
    fontSize: 18,
    color: '#f4fefe',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#262626',
    width: '100%',
    height: '69%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 24,
    color: '#f4fefe',
    marginHorizontal: 5,
    marginBottom: 20,
    fontWeight: '600',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default AddIncomeTransaction;
