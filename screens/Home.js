import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const homeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#4CAF50",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#313131",
  },
});

const mockupStyles = StyleSheet.create({
  mockupContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4CAF50",
  },
  transactionContainer: {
    backgroundColor: "#E3F2FD",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  badSavings: {
    backgroundColor: "#FFCDD2", // Red color for bad savings
  },
  goodSavings: {
    backgroundColor: "#C8E6C9", // Green color for good savings
  },
  transactionText: {
    fontSize: 16,
    color: "#313131",
  },
});

export default function Home() {
  return (
    <ScrollView contentContainerStyle={homeStyles.container}>
      <View>
        <Text style={homeStyles.heading}>
          Welcome to{"\n"}
          <Text style={{ fontSize: 28 }}>Personal Finance Manager</Text>
        </Text>
        <Text style={homeStyles.description}>
          Explore our app's features and take control of your finances like
          never before.
        </Text>
        <CurrentMonthTransactions />
        <LastMonthTransactions />
      </View>
    </ScrollView>
  );
}

function CurrentMonthTransactions() {
  const [currentMonthTransactions, setCurrentMonthTransactions] = useState([
    {
      bank: "Capitec",
      type: "money in",
      amount: 1500,
      savings: +500,
      available: 1490,
    },
    {
      bank: "ABSA",
      type: "money out",
      amount: 2000,
      savings: -300,
      available: 1200,
    },
    // Add more transactions as needed
  ]);

  const calculateTotalSavings = (transactions) => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === "money in") {
        return total + transaction.savings;
      } else {
        return total;
      }
    }, 0);
  };

  const currentMonthTotalSavings = calculateTotalSavings(
    currentMonthTransactions
  );
  const currentMonthSavings = currentMonthTotalSavings >= 0 ? "good" : "bad";

  return (
    <View style={mockupStyles.mockupContainer}>
      <Text style={mockupStyles.label}>Current Month's Transactions</Text>
      <ScrollView>
        {currentMonthTransactions.map((transaction, index) => (
          <View
            style={[
              mockupStyles.transactionContainer,
              transaction.type === "money out"
                ? mockupStyles.badSavings
                : mockupStyles.goodSavings,
            ]}
            key={index}
          >
            <Text style={mockupStyles.transactionText}>
              {transaction.bank} - {transaction.type.toUpperCase()}{" "}
              Savings: R {transaction.savings} Available amount: R{" "}
              {transaction.available}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Text style={mockupStyles.label}>
        Total Savings for Current Month: R {currentMonthTotalSavings}
      </Text>
      <Text style={mockupStyles.label}>
        {currentMonthSavings === "good" ? "Good" : "Bad"} Savings This Month
      </Text>
    </View>
  );
}

function LastMonthTransactions() {
  const [lastMonthTransactions, setLastMonthTransactions] = useState([
    {
      bank: "FNB",
      type: "money in",
      amount: 3000,
      savings: -1000,
      available: 2000,
    },
    // Add more transactions for last month as needed
  ]);

  const calculateTotalSavings = (transactions) => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === "money in") {
        return total + transaction.savings;
      } else {
        return total;
      }
    }, 0);
  };

  const lastMonthTotalSavings = calculateTotalSavings(lastMonthTransactions);
  const lastMonthSavings = lastMonthTotalSavings >= 0 ? "good" : "bad";

  return (
    <View style={mockupStyles.mockupContainer}>
      <Text style={mockupStyles.label}>Last Month's Transactions</Text>
      <ScrollView>
        {lastMonthTransactions.map((transaction, index) => (
          <View
            style={[
              mockupStyles.transactionContainer,
              mockupStyles.badSavings,
            ]}
            key={index}
          >
            <Text style={mockupStyles.transactionText}>
              {transaction.bank} - {transaction.type.toUpperCase()}{" "}
              Savings: R {transaction.savings} Available amount: R{" "}
              {transaction.available}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Text style={mockupStyles.label}>
        Total Savings for Last Month: R {lastMonthTotalSavings}
      </Text>
      <Text style={mockupStyles.label}>
        {lastMonthSavings === "good" ? "Good" : "Bad"} Savings Last Month
      </Text>
    </View>
  );
}
