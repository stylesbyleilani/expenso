




import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ExpenseContext } from '../context/context';
import TypeModal from "./TypeModal";
import { auth } from '../Lib/firebase';

export default function RecentTransaction() {
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const navigation = useNavigation();
  const { transactions, isLoading, loadUserData } = useContext(ExpenseContext);

  useEffect(() => {
    if (auth.currentUser) {
      loadUserData(auth.currentUser.uid);
    }
  }, []);

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

  const renderTransaction = ({ item }) => {
    const isIncome = item.type === 'income';
    const amountColor = isIncome ? '#4CAF50' : '#FF5252'; 
    const iconBackgroundColor = isIncome ? '#E8F5E9' : '#FFEBEE'; 

    // Get the icon from the category object
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

  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB - dateA;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.recentHeader}>Recent Transactions</Text>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8d9196" />
          <Text style={styles.loadingText}>Loading transactions...</Text>
        </View>
      ) : sortedTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions yet</Text>
          <Text style={styles.emptySubText}>Add your first transaction by clicking the + button</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sortedTransactions}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderTransaction}
          contentContainerStyle={styles.listContainer}
        />
      )}

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 8,
  },
  listContainer: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#d4d4d4',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#9e9e9e',
    textAlign: 'center',
  },
  plusContainer: {
    backgroundColor: "#8d9196", 
    borderRadius: 50,
    width: 50,
    height: 50,
    position: "absolute",
    right: 16,
    bottom: 24,
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
    marginHorizontal: 9,
    marginVertical: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 9,
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



// import React, { useState, useContext, useEffect } from 'react';
// import {
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Modal,
//   ActivityIndicator,
//   useColorScheme
// } from 'react-native';
// import { IconButton } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
// import { ExpenseContext } from '../context/context';
// import TypeModal from "./TypeModal";
// import { auth } from '../Lib/firebase';

// export default function RecentTransaction() {
//   const [typeModalVisible, setTypeModalVisible] = useState(false);
//   const navigation = useNavigation();
//   const { transactions, isLoading, loadUserData } = useContext(ExpenseContext);
//   const colorScheme = useColorScheme();

//   useEffect(() => {
//     if (auth.currentUser) {
//       loadUserData(auth.currentUser.uid);
//     }
//   }, []);

//   const formatAmount = (amount, type) => {
//     let numericAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : parseFloat(amount);
//     if (isNaN(numericAmount)) return type === 'income' ? '+$0.00' : '-$0.00';
//     return type === 'income' ? `+$${Math.abs(numericAmount).toFixed(2)}` : `-$${Math.abs(numericAmount).toFixed(2)}`;
//   };

//   const renderTransaction = ({ item }) => {
//     const isIncome = item.type === 'income';
//     const amountColor = isIncome ? '#4CAF50' : '#FF5252';
//     const iconBackgroundColor = isIncome ? '#E8F5E9' : '#FFEBEE';
//     const icon = item.category?.icon || 'cash';
//     const categoryName = item.category?.name || 'Other';

//     return (
//       <View style={[styles.transactionItem, colorScheme === 'dark' ? styles.darkItem : styles.lightItem]}>
//         <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
//           <IconButton icon={icon} color={amountColor} size={24} />
//         </View>
//         <View style={styles.detailsContainer}>
//           <Text style={[styles.name, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>{categoryName}</Text>
//           <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
//         </View>
//         <Text style={[styles.amount, { color: amountColor }]}>{formatAmount(item.amount, item.type)}</Text>
//       </View>
//     );
//   };

//   const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

//   return (
//     <SafeAreaView style={[styles.container, colorScheme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
//       <Text style={[styles.recentHeader, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>Recent Transactions</Text>
      
//       {isLoading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#8d9196" />
//           <Text style={styles.loadingText}>Loading transactions...</Text>
//         </View>
//       ) : sortedTransactions.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={[styles.emptyText, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>No transactions yet</Text>
//           <Text style={styles.emptySubText}>Add your first transaction by clicking the + button</Text>
//         </View>
//       ) : (
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           data={sortedTransactions}
//           keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//           renderItem={renderTransaction}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}

//       <TouchableOpacity onPress={() => setTypeModalVisible(true)} style={styles.plusContainer}>
//         <IconButton icon="plus" color="white" size={24} />
//       </TouchableOpacity>

//       <Modal visible={typeModalVisible} transparent animationType="slide" onRequestClose={() => setTypeModalVisible(false)}>
//         <TypeModal onClose={() => setTypeModalVisible(false)} />
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, marginHorizontal: 8 },
//   listContainer: { paddingBottom: 100 },
//   darkBackground: { backgroundColor: '#121212' },
//   lightBackground: { backgroundColor: '#ffffff' },
//   darkText: { color: '#ffffff' },
//   lightText: { color: '#000000' },
//   darkItem: { backgroundColor: '#262626' },
//   lightItem: { backgroundColor: '#f5f5f5' },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: 10, fontSize: 16, color: '#d4d4d4' },
//   emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
//   emptyText: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
//   emptySubText: { fontSize: 14, color: '#9e9e9e', textAlign: 'center' },
//   plusContainer: {
//     backgroundColor: "#8d9196",
//     borderRadius: 50,
//     width: 50,
//     height: 50,
//     position: "absolute",
//     right: 16,
//     bottom: 24,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   recentHeader: { fontWeight: '500', fontSize: 21, marginHorizontal: 9, marginVertical: 16 },
//   transactionItem: { flexDirection: 'row', alignItems: 'center', padding: 16, marginVertical: 4, marginHorizontal: 9, borderRadius: 15 },
//   iconContainer: { borderRadius: 12, overflow: 'hidden' },
//   detailsContainer: { flex: 1, paddingHorizontal: 12 },
//   name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
//   amount: { fontSize: 16, fontWeight: '600', textAlign: 'right' },
//   date: { fontSize: 12, color: '#9e9e9e' }
// });
