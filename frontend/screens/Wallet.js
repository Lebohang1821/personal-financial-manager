import React from "react";
import { View, Text, FlatList, Image } from "react-native";

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

export default function Wallet() {
  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <View
        style={{
          padding: 15,
          borderBottomWidth: 2,
          flexDirection: "row",
          marginBottom: -10,
          alignItems: "center",
          backgroundColor: "#b8b8b8",
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Image
          source={item.logo}
          style={{ width: 80, height: 90, marginRight: 10 }}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {item.bankName}
          </Text>
          <Text>Account Number: {item.accountNumber}</Text>
          <Text>Card Number: {item.cardNumber}</Text>
          <Text>Balance: R {item.balance.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={accountsData}
      keyExtractor={(account) => account.id.toString()}
      renderItem={renderItem}
    />
  );
}
