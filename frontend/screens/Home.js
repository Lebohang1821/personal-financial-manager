import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: "center",
    marginBottom: -45, // Corrected to numeric value without quotes
    marginTop: -65, // This will have no effect, so it's removed
  },
});


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
    color: "#006A42",
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
    backgroundColor: "#919191",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    borderBottomWidth: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
  },
  transactionContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    borderBottomWidth: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  initial: {
    backgroundColor: "#00d9ff",
  },
  cardPayment: {
    backgroundColor: "orange",
  },
  swiping: {
    backgroundColor: "#40e0d0",
  },
  onlineShopping: {
    backgroundColor: "yellow",
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
        Welcome back to
      </Text>
      <Image
        source={require('./assets/logo.png')}
        style={styles.image}
      />
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
      bank: "ABSA",
      transactions: [
        { type: "initial", amount: 10000 },
        { type: "card payment", amount: 5120 },
        { type: "online shopping", amount: 1500 },
      ],
    },
    {
      bank: "Standard Bank",
      transactions: [
        { type: "initial", amount: 15000 },
        { type: "swiping", amount: 3290 },
        { type: "online shopping", amount: 2500 },
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
                    transaction.type === "initial"
                      ? mockupStyles.initial
                      : transaction.type === "card payment"
                      ? mockupStyles.cardPayment
                      : transaction.type === "swiping"
                      ? mockupStyles.swiping
                      : transaction.type === "online shopping"
                      ? mockupStyles.onlineShopping
                      : null,
                  ]}
                >
                  <Text style={mockupStyles.transactionText}>
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}{" "}
                    - Amount: R {transaction.amount}
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
