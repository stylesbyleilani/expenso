

import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ExpenseContext } from "../context/context";

export default function Card() {
  const { balance, income, expense } = useContext(ExpenseContext);
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.balanceSection}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalBalance}>Total balance</Text>
            <IconButton
              icon="dots-horizontal"
              color="white"
              size={27}
              onPress={() => console.log('Menu opened')}
            />
          </View>
          <Text style={styles.amount}>${balance}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <View style={styles.arrow}>
            <View style={styles.iconCircle}>
              <IconButton
                icon="arrow-down"
                size={27}
                color="#39e75f"
                onPress={() => console.log('Menu opened')}
              />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.label}>Income</Text>
              <Text style={styles.green}>${income}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statBox}>
          <View style={styles.arrow}>
            <View style={styles.iconCircle}>
              <IconButton
                icon="arrow-up"
                size={27}
                color="red"
                onPress={() => console.log('Menu opened')}
              />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.label}>Expense</Text>
              <Text style={styles.red}>${expense}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,   
    borderRadius: 15,
    padding: 4,
    marginHorizontal: 12,
    color: 'white',
  },
  card: {
    backgroundColor: '#262626',
    borderRadius: 20,
    marginHorizontal: 1,
    padding: 10,
  },
  balanceSection: {
    marginBottom: 9,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalBalance: {
    fontWeight: '400',
    fontSize: 17,
    color: "white",
  },
  amount: {
    fontWeight: '600',
    fontSize: 30,
    color: "white",
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
    
  },
  statBox: {
    flex: 1,
    marginHorizontal: 5,
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#262626",
  },
  statContent: {
    marginLeft: 10,
  },
  label: {
    fontWeight: '500',
    fontSize: 22,
    color: "white",
  },
  green: {
    color: '#39e75f',
    fontSize: 14,
  },
  red: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  iconCircle: {
    width: 30,
    height: 30,
    marginBottom:20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#5b5d62",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});


// import React, { useContext } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { IconButton } from 'react-native-paper';
// import { ExpenseContext } from "../context/context";
// import { useTheme } from "../context/ThemeContext"; // Import Theme Context

// export default function Card() {
//   const { balance, income, expense } = useContext(ExpenseContext);
//   const { theme } = useTheme(); // Get current theme
//   const isDarkMode = theme === "dark";

//   return (
//     <View style={[styles.container, { backgroundColor: isDarkMode ? "#000" : "#f5f5f5" }]}>
//       <View style={[styles.card, { backgroundColor: isDarkMode ? "#262626" : "#fff" }]}>
//         <View style={styles.balanceSection}>
//           <View style={styles.totalContainer}>
//             <Text style={[styles.totalBalance, { color: isDarkMode ? "white" : "black" }]}>
//               Total balance
//             </Text>
//             <IconButton
//               icon="dots-horizontal"
//               color={isDarkMode ? "white" : "black"}
//               size={27}
//               onPress={() => console.log('Menu opened')}
//             />
//           </View>
//           <Text style={[styles.amount, { color: isDarkMode ? "white" : "black" }]}>
//             ${balance}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.statsContainer}>
//         <View style={[styles.statBox]}>
//           <View style={[styles.arrow, { backgroundColor: isDarkMode ? "#262626" : "#fff" }]}>
//             <View style={[styles.iconCircle, { backgroundColor: isDarkMode ? "#5b5d62" : "#e0e0e0" }]}>
//               <IconButton
//                 icon="arrow-down"
//                 size={27}
//                 color="#39e75f"
//                 onPress={() => console.log('Menu opened')}
//               />
//             </View>
//             <View style={styles.statContent}>
//               <Text style={[styles.label, { color: isDarkMode ? "white" : "black" }]}>Income</Text>
//               <Text style={styles.green}>${income}</Text>
//             </View>
//           </View>
//         </View>

//         <View style={[styles.statBox]}>
//           <View style={[styles.arrow, { backgroundColor: isDarkMode ? "#262626" : "#fff" }]}>
//             <View style={[styles.iconCircle, { backgroundColor: isDarkMode ? "#5b5d62" : "#e0e0e0" }]}>
//               <IconButton
//                 icon="arrow-up"
//                 size={27}
//                 color="red"
//                 onPress={() => console.log('Menu opened')}
//               />
//             </View>
//             <View style={styles.statContent}>
//               <Text style={[styles.label, { color: isDarkMode ? "white" : "black" }]}>Expense</Text>
//               <Text style={styles.red}>${expense}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     borderRadius: 15,
//     padding: 4,
//     marginHorizontal: 12,
//   },
//   card: {
//     borderRadius: 20,
//     marginHorizontal: 1,
//     padding: 10,
//   },
//   balanceSection: {
//     marginBottom: 9,
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   totalBalance: {
//     fontWeight: '400',
//     fontSize: 17,
//   },
//   amount: {
//     fontWeight: '600',
//     fontSize: 30,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 7,
//   },
//   statBox: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   arrow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderRadius: 15,
//   },
//   statContent: {
//     marginLeft: 10,
//   },
//   label: {
//     fontWeight: '500',
//     fontSize: 22,
//   },
//   green: {
//     color: '#39e75f',
//     fontSize: 14,
//   },
//   red: {
//     color: 'red',
//     fontSize: 14,
//     marginTop: 4,
//   },
//   iconCircle: {
//     width: 30,
//     height: 30,
//     marginBottom: 20,
//     borderRadius: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
// });
