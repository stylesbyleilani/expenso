import React, { useContext } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { ExpenseContext } from '../context/context';

const ChartExample = () => {
  const screenWidth = Dimensions.get('window').width;
  const { transactions } = useContext(ExpenseContext);

  // Process transactions for Line Chart
  const processLineChartData = () => {
    const monthlyTotals = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthIndex = date.getMonth();
      const monthName = months[monthIndex];
      const amount = parseFloat(transaction.amount) || 0;
      
      monthlyTotals[monthName] = (monthlyTotals[monthName] || 0) + 
        (transaction.type === 'income' ? amount : -amount);
    });

    // Get last 6 months of data
    const today = new Date();
    const last6Months = [];
    const amounts = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (today.getMonth() - i + 12) % 12;
      const monthName = months[monthIndex];
      last6Months.push(monthName);
      amounts.push(monthlyTotals[monthName] || 0);
    }

    return {
      labels: last6Months,
      datasets: [{
        data: amounts,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      }],
    };
  };

  // Process transactions for Pie Chart
  const processPieChartData = () => {
    const categoryTotals = {};
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    
    transactions.forEach(transaction => {
      if (transaction.type !== 'income') {  // Only show expenses in pie chart
        const categoryName = transaction.category?.name || 'Other';
        const amount = Math.abs(parseFloat(transaction.amount)) || 0;
        categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + amount;
      }
    });

    return Object.entries(categoryTotals).map(([name, amount], index) => ({
      name,
      population: amount,  // Using 'population' as it's the required accessor
      color: colors[index % colors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));
  };

  const lineData = processLineChartData();
  const pieData = processPieChartData();

  return (
    <ScrollView style={{marginHorizontal: 15}}>
          <Text style={{   
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    marginTop: 10
  
}}>Statistics</Text>

      <View>
        <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 10, color: 'white' }}>
          Monthly Transaction History
        </Text>
        <LineChart
          data={lineData}
          width={screenWidth - 30}
          height={290}
          chartConfig={{
            backgroundColor: '#262626',
            backgroundGradientFrom: '#262626',
            backgroundGradientTo: '#262626',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={{
        backgroundColor: "#262626",
        padding: 20,
        borderRadius: 7,
        marginTop: 20,
        marginBottom: 20
      }}>
        <Text style={{
          textAlign: 'center',
          fontSize: 20,
          marginVertical: 10,
          color: "white"
        }}>
          Expense Distribution by Category
        </Text>
        <PieChart
          data={pieData}
          width={screenWidth - 30}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
          hasLegend={true}
        />
      </View>
    </ScrollView>
  );
};

export default ChartExample;