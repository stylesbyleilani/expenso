// AddTransaction.js
import React, {useState} from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

import { View, Text, StyleSheet, TouchableOpacity, Modal , Image} from 'react-native';
import AddIncomeTransaction from "./IncomeModal"
import ExpenseTransaction from "./ExpenseModal"
const AddTransaction = ({ onClose }) => {
  const [incomeClicked, setIncomeClicked] = useState(false)
        const [expenseClicked, setExpenseClicked] = useState(false);


  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.headers}>
          <Text style={styles.modalHeader}>Add New Transaction</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.types}>
          <TouchableOpacity
          onPress={()=>setIncomeClicked(true)
          }
           style={styles.item}>
            <View style={styles.iconHeader}>
            <IconButton
              icon="cash-multiple"
              color="#39e75f"
              size={27}
              onPress={() => console.log('Menu opened')}
            />

                          <Text style={styles.text}>Income</Text>

            </View>
            <Text style={styles.paragraph}>clicking on the income screen to help you add and track your income</Text>

          </TouchableOpacity>



                    <View style={styles.item}>
                              <TouchableOpacity
          onPress={()=>setExpenseClicked(true)
          }>
            <View style={styles.iconHeader}>
            <IconButton
              icon="cash-minus"
              color="#ff4f14"
              size={27}
              onPress={() => console.log('expense opened')}
            />
  <Text style={styles.text}>Expense</Text>

            </View>
            <Text style={styles.paragraph}>clicking on the expense screen to help you add and track your expenses</Text>
</TouchableOpacity>
          </View>

        </View>
      </View>


            <Modal
        visible={incomeClicked}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIncomeClicked(false)}
      >
        <AddIncomeTransaction onClose={() => setIncomeClicked(false)} />
      </Modal>


                  <Modal
        visible={expenseClicked}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setExpenseClicked(false)}
      >
        <ExpenseTransaction onClose={() => setExpenseClicked(false)} />
      </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  types:{
    
    marginHorizontal:6, 
            flexDirection: 'column',
            gap:20,


  },
  item:{
    backgroundColor:"#646462",
    borderRadius:9,
    padding:8,
  },
  iconHeader:{
        flexDirection: 'row',  
        gap:9,
        alignItems: 'center',

  },
    image: {
    width: 30,
    height: 30,
    borderRadius: 17,
  },

  text:{
    fontSize: 24,
    color: '#f4fefe',
  
  },
  paragraph:{
        color: 'white',
        marginTop:0,
        padding:7,
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
    height: '40%',
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
    marginHorizontal:5,
    marginBottom: 20,
    fontWeight:600,
  },
  // iconCircle: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 24,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   shadowColor: '#000',
  //   backgroundColor: "white",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 3,
  //   elevation: 3,
  // },
  // closeButton: {
  //   backgroundColor: '#ff4f14',
  //   padding: 10,
  //   borderRadius: 8,
  // },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 500,
  },
});

export default AddTransaction;
