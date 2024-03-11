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
        <Mockup />
      </View>
    </ScrollView>
  );
}

function Mockup() {
  const [transactions, setTransactions] = useState([
    {
      bank: "Capitec",
      transactions: [
        { type: "initial", amount: 10000 },
        { type: "card payment", amount: 5993 },
        { type: "online shopping", amount: 1540 },
      ],
    },
    {
      bank: "ABSA",
      transactions: [
        { type: "initial", amount: 15000 },
        { type: "swiping", amount: 3790 },
        { type: "online shopping", amount: 2580 },
      ],
    },
    // Add more banks and transactions as needed
  ]);

  function calculateAvailableAmount(transactions) {
    return transactions.reduce((acc, cur) => {
      if (cur.type === "initial") {
        return acc + cur.amount;
      } else {
        return acc - cur.amount;
      }
    }, 0);
  }

  function calculateTotalSavings(transactions) {
    return transactions.reduce((acc, cur) => {
      if (cur.type === "initial") {
        return acc + cur.amount;
      } else {
        return acc - cur.amount;
      }
    }, 0);
  }

  return (
    <View>
      {transactions.map((bank, index) => (
        <View key={index} style={mockupStyles.mockupContainer}>
          <Text style={mockupStyles.label}>{bank.bank} Transactions</Text>
          <View>
            <Text style={mockupStyles.transactionText}>
              Available Amount: R {calculateAvailableAmount(bank.transactions)}
            </Text>
            <ScrollView>
              {bank.transactions.map((transaction, idx) => (
                <View
                  key={idx}
                  style={[
                    mockupStyles.transactionContainer,
                    (transaction.type === "swiping" || transaction.type === "online shopping" || transaction.type === "card payment")
                      ? mockupStyles.badSavings
                      : null,
                  ]}
                >
                  <Text style={mockupStyles.transactionText}>
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)} - Amount: R {transaction.amount}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <Text style={mockupStyles.label}>
            Total Savings: R {calculateTotalSavings(bank.transactions)}
          </Text>
          <Text style={mockupStyles.label}>
            {calculateTotalSavings(bank.transactions) >= 0
              ? "Good Savings"
              : "Bad Savings"}
          </Text>
        </View>
      ))}
    </View>
  );
}
