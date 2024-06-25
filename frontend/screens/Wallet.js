import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const accountsData = [
  {
    id: 1,
    bankName: "ABSA",
    accountNumber: "123456789",
    cardNumber: "**** **** **** 1234",
    balance: 5000,
    logo: require("./assets/absa_logo.png"), // Import ABSA logo
  },
  {
    id: 2,
    bankName: "Standard Bank",
    accountNumber: "987654321",
    cardNumber: "**** **** **** 5678",
    balance: 2500,
    logo: require("./assets/standard_bank_logo.png"),
  },
  // Add more accounts as needed
];

const homeStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#006A42",
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f0f8ff",
    paddingBottom: 59,
  },
  accountItem: {
    padding: 15,
    borderBottomWidth: 2,
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "hsla(0, 0%, 80%, 0.3)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  logo: {
    width: 80,
    height: 90,
    marginRight: 10,
  },
  bankName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default function Wallet() {
  const renderItem = ({ item }) => (
    <View style={homeStyles.accountItem}>
      <Image source={item.logo} style={homeStyles.logo} />
      <View>
        <Text style={homeStyles.bankName}>{item.bankName}</Text>
        <Text>Account Number: {item.accountNumber}</Text>
        <Text>Card Number: {item.cardNumber}</Text>
        <Text>Balance: R {item.balance.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.heading}>Your Banks Names</Text>
      <FlatList
        data={accountsData}
        keyExtractor={(account) => account.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
