import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";

const homeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40, // Adjust paddingTop as needed
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginTop: -50,
    color: "red",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    justifyContent: "flex-start",
    backgroundColor: "#919191",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    color: "#e3f0f0",
    elevation: 5,
    // For iOS shadow
    shadowColor: "#ff0000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    textDecorationLine: "underline",
  },
});

const mockupStyles = StyleSheet.create({
  mockupContainer: {
    marginTop: 10,
    padding: 2,
  },
  labelContainer: {
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 0,
  },
  transactionContainer: {
    marginBottom: 10,
    backgroundColor: "#a88686",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  transactionText: {
    fontSize: 16,
    color: "#313131",
  },
  topContainer: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff5ee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "black", // Change input text color if needed
    marginTop: 10,
    marginBottom: 10,
    width: "100%", // Adjust width as needed
    height: 190, // Adjust height as needed
  },
});

export default function Home() {
  return (
    <ScrollView contentContainerStyle={homeStyles.container}>
      <View>
        <Text style={{ textAlign: "center" }}>
          <Text style={[homeStyles.heading, { fontSize: 54 }]}>
            Welcome to{"\n"}
          </Text>
          <Text style={[homeStyles.heading, { fontSize: 19 }]}>
            Personal Finance Manager
          </Text>
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
      type: "money in",
      amount: 1500,
      savings: -500,
      available: 1490,
    },
    {
      bank: "Capitec",
      type: "money in",
      amount: 1500,
      savings: -500,
      available: 1490,
    },
    {
      bank: "Capitec",
      type: "money in",
      amount: 1500,
      savings: -500,
      available: 1490,
    },
    {
      bank: "Capitec",
      type: "money in",
      amount: 1500,
      savings: -500,
      available: 1490,
    },
    // Add more transactions as needed
  ]);

  return (
    <View style={styles.container}>
      <View style={mockupStyles.mockupContainer}>
        <View style={mockupStyles.labelContainer}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Bank Name:</Text> Capitec Bank
          </Text>
        </View>
        {/* Wrap the text within a <Text> component */}
        <Text style={mockupStyles.label}>Output of savings</Text>

        <View style={mockupStyles.topContainer}>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <View style={mockupStyles.container}>
              {transactions.slice(0, 3).map((transaction, index) => (
                <View style={mockupStyles.transactionContainer} key={index}>
                  <Text style={mockupStyles.transactionText}>
                    {transaction.bank} - {transaction.type.toUpperCase()}{" "}
                    Savings: R {transaction.savings} Available amount: R{" "}
                    {transaction.available}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={mockupStyles.labelContainer}>
          <Text style={mockupStyles.label}>Bad savings for this month</Text>
        </View>
        <View style={mockupStyles.labelContainer}>
          <Text style={mockupStyles.label}>R 5000 saved this month</Text>
        </View>
        <View style={mockupStyles.labelContainer}>
          <Text style={mockupStyles.label}>R 5000 saved last month</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#919191",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    // For Android elevation (box shadow)
    elevation: 5,
    // For iOS shadow
    shadowColor: "#ff0000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
