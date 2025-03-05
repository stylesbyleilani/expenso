// import React, { useState , useContext} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
//   Modal, Button
// } from 'react-native';
// import { useNavigation } from "@react-navigation/native";

// import { ExpenseContext } from '../context/context';


// const CustomForm = () => {
//   const navigation = useNavigation()
//   const {balance, inputAmount, setInputAmount, handleAddBalance} = useContext(ExpenseContext)

//   return (
//     <View style={styles.container}>

//       <View
//             // animationType="slide"
//             // transparent={true}
//           >
//             <View style={styles.modalOverlay}>
//                 <Text style={styles.modalTitle}>Add Transaction</Text>
//               <View style={styles.modalContent}>

//                                                 <Text style={styles.label}>Description</Text>

//                                                 <TextInput
//                   style={styles.input}
//                   value={inputAmount}
//                   onChangeText={setInputAmount}
//                   placeholder="Description"
//                   keyboardType="numeric"
//                   autoFocus
//                 />

//                 <View style={styles.modalButtons}>
//                   <TouchableOpacity
//                     style={styles.modalButton}
//                   >
//                     <Text>Cancel</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[styles.modalButton, styles.addButton]}
//                     onPress={()=>{
//                       handleAddBalance()
//                       navigation.navigate("homeScreen")
//                     }}
                    
//                   >
//                     <Text style={styles.addButtonText}>Add</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//     </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor:"#fafaff"

//   },
//     modalOverlay: {
//     flex: 0.7,
//     // backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
// backgroundColor:"#fafaff",
//     borderRadius: 15,
//     padding: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginTop:30,
//   },
//   modalTitle: {
//     fontSize: 23,
//     fontWeight: '600',
//     marginTop:19,
//   },
//   label:{
//     fontSize: 19,
//     fontWeight: '500',
//     alignSelf:"start",
//     marginBottom:5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 8,
//     padding: 14,
//     width: '100%',
//     marginBottom: 15,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   modalButton: {
//     padding: 12,
//     borderRadius: 8,
//     width: '45%',
//     alignItems: 'center',
//     backgroundColor: 'red',
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//   },
//   addButtonText: {
//     color: 'white',
//   },
// });

// export default CustomForm;



// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { useNavigation } from "@react-navigation/native";
// import { ExpenseContext } from '../context/context';

// const CustomForm = () => {
//   const navigation = useNavigation();
//   const { handleAddTransaction, selectedCategory } = useContext(ExpenseContext);
//   const [inputAmount, setInputAmount] = useState('');
//   const [title, setTitle] = useState('');

//   const handleSubmit = () => {
//     handleAddTransaction({
//       title: title || 'Untitled',
//       amount: inputAmount,
//       date: new Date().toISOString(),
//       category: selectedCategory?.name || 'Other',
//     });
//     navigation.navigate("homeScreen");
//   };

//   return (
//     <View style={styles.container}>
//       <View>
//         <View style={styles.modalOverlay}>
//           <Text style={styles.modalTitle}>Add Transaction</Text>
//           <View style={styles.modalContent}>
//             <Text style={styles.label}>Title</Text>
//             <TextInput
//               style={styles.input}
//               value={title}
//               onChangeText={setTitle}
//               placeholder="Transaction Title"
//             />

//             <Text style={styles.label}>Amount</Text>
//             <TextInput
//               style={styles.input}
//               value={inputAmount}
//               onChangeText={setInputAmount}
//               placeholder="Amount"
//               keyboardType="numeric"
//               autoFocus
//             />

//             {selectedCategory && (
//               <>
//                 <Text style={styles.label}>Category</Text>
//                 <Text style={styles.categoryText}>{selectedCategory.name}</Text>
//               </>
//             )}

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => navigation.goBack()}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.addButton]}
//                 onPress={handleSubmit}
//               >
//                 <Text style={styles.addButtonText}>Add</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };



import React, { useState, useContext } from 'react';
import { IconButton } from "react-native-paper";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ExpenseContext } from '../context/context';

const CustomForm = () => {
  const navigation = useNavigation();
  const { handleAddTransaction, selectedCategory } = useContext(ExpenseContext);
  const [inputAmount, setInputAmount] = useState('');
  const [title, setTitle] = useState('');


const handleSubmit = () => {
  if (!transactionData.amount || !transactionData.category) return;
  
  handleAddTransaction({
    title: transactionData.title || 'Untitled',
    amount: parseFloat(transactionData.amount),
    date: transactionData.date || new Date().toISOString(),
    category: {
      name: transactionData.category,
      icon: transactionData.categoryIcon
    }
  }, 'income');
  
  navigation.navigate("homeScreen");
  onClose();
};

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.modalOverlay}>
          <Text style={styles.modalTitle}>Add Transaction</Text>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Transaction Title"
            />

            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              value={inputAmount}
              onChangeText={setInputAmount}
              placeholder="Amount"
              keyboardType="numeric"
              autoFocus
            />


            {selectedCategory && (
  <View style={styles.categoryContainer}>
    <Text style={styles.label}>Selected Category</Text>
    <View style={styles.categoryInfo}>
      <IconButton
        icon={selectedCategory.icon}
        size={24}
        color="#007AFF"
      />
      <Text style={styles.categoryText}>{selectedCategory.name}</Text>
    </View>
  </View>
)}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fafaff"
  },
  modalOverlay: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: "#fafaff",
    borderRadius: 15,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: '600',
    marginTop: 19,
  },
  label: {
    fontSize: 19,
    fontWeight: '500',
    alignSelf: "start",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 14,
    width: '100%',
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#007AFF',
  },
  addButtonText: {
    color: 'white',
  },
});

export default CustomForm;