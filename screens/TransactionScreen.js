



// import React, { useState } from 'react';
// import { StyleSheet, View,Text, TextInput, Platform , StatusBar,  SafeAreaView } from 'react-native';
// import CustomNavbar from "../components/Navbar"
 

// const TransactionScreen = ({navigation}) => {
  


//   return (

//     <SafeAreaView style={styles.Container}>
//     <Text style={styles.text}>Search</Text>
//     <View style={styles.textInputdiv}>
// <TextInput placeholder="Search..." color="#d4d4d4"  style={styles.textInput}/>

//     </View>
// <CustomNavbar/>
//      </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
  
// Container: {
  
//   backgroundColor:"black",
//   flex:1,
//   paddingTop:Platform.OS === "android" ? StatusBar.currentHeight: 0,



//   },
//   textInput:{
// backgroundColor:"#262626",
// borderWidth:2,
// color: "#d4d4d4",
// padding:20,
// borderColor:"#d4d4d4",
// borderRadius:15,
// marginHorizontal:15,
// marginTop:5,
//   },
// textInputdiv:{
//   color:"red",
//   border:9,
  
// },
// text:{
// fontSize:24,
// fontWeight:600,
// color:"white",
// alignSelf:"center"
// }
  
// });

// export default TransactionScreen;



import React, { useState, useContext } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  StatusBar
} from 'react-native';
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ExpenseContext } from '../context/context';
import TypeModal from "../components/TypeModal";
import CustomNavbar from "../components/Navbar";

const TransactionScreen = () => {
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { transactions } = useContext(ExpenseContext);

  const formatAmount = (amount, type) => {
    let numericAmount;
    if (typeof amount === 'string') {
      numericAmount = parseFloat(amount.replace(/[^\d.-]/g, ''));
    } else {
      numericAmount = parseFloat(amount);
    }

    if (isNaN(numericAmount)) {
      return type === 'income' ? '+$0.00' : '-$0.00';
    }

    const formattedAmount = Math.abs(numericAmount).toFixed(2);
    return type === 'income' ? `+$${formattedAmount}` : `-$${formattedAmount}`;
  };

  const filteredTransactions = transactions.filter(item => {
    const categoryName = item.category?.name || 'Other';
    const searchTerm = searchQuery.toLowerCase();
    
    return (
      categoryName.toLowerCase().includes(searchTerm) ||
      (item.title && item.title.toLowerCase().includes(searchTerm)) ||
      (item.description && item.description.toLowerCase().includes(searchTerm)) ||
      (item.amount && item.amount.toString().includes(searchTerm))
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB - dateA;
  });

  const renderTransaction = ({ item }) => {
    const isIncome = item.type === 'income';
    const amountColor = isIncome ? '#4CAF50' : '#FF5252'; 
    const iconBackgroundColor = isIncome ? '#E8F5E9' : '#FFEBEE'; 
    
    const icon = item.category?.icon || 'cash';
    const categoryName = item.category?.name || 'Other';

    return (
      <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
          <IconButton
            icon={icon}
            color={amountColor}
            size={24}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{categoryName}</Text>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <View>
          <Text style={[styles.amount, { color: amountColor }]}>
            {formatAmount(item.amount, item.type)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Search</Text>
      <View style={styles.textInputdiv}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#d4d4d4"
          style={styles.textInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <Text style={styles.recentHeader}>Transactions</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sortedTransactions}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderTransaction}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        onPress={() => setTypeModalVisible(true)}
        style={styles.plusContainer}
      >
        <IconButton
          icon="plus"
          color="white"
          size={24}
        />
      </TouchableOpacity>

      <Modal
        visible={typeModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTypeModalVisible(false)}
      >
        <TypeModal onClose={() => setTypeModalVisible(false)} />
      </Modal>
      
      <CustomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    marginTop: 10
  },
  textInput: {
    backgroundColor: "#262626",
    borderWidth: 2,
    color: "#d4d4d4",
    padding: 20,
    borderColor: "#d4d4d4",
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: 5,
  },
  textInputdiv: {
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 100,
  },
  plusContainer: {
    backgroundColor: "#8d9196", 
    borderRadius: 50,
    width: 50,
    height: 50,
    position: "absolute",
    right: 16,
    bottom: 70, // Increased to avoid overlap with navbar
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentHeader: {
    fontWeight: '500',
    fontSize: 21,
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#262626',
  },
  iconContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#9e9e9e',
    marginBottom: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  date: {
    fontSize: 12,
    color: '#9e9e9e',
  },
});

export default TransactionScreen;
