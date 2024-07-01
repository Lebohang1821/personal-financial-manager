import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert } from "react-native";
import * as FileSystem from 'expo-file-system';

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
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#006A42",
  },
  plusButton: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#006A42",
    paddingRight: 15,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  modalButton: {
    marginTop: 10,
  },
});

export default function Wallet() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newBankName, setNewBankName] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");

  const handleAddCard = () => {
    setModalVisible(true);
  };

  const handleSaveCard = async () => {
    const newCard = {
      bankName: newBankName,
      accountNumber: newAccountNumber,
      cardNumber: newCardNumber,
    };
    const path = `${FileSystem.documentDirectory}${newBankName}_card.txt`;
    try {
      await FileSystem.writeAsStringAsync(path, JSON.stringify(newCard));
      Alert.alert("Success", "Card saved successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to save card");
    }
    setModalVisible(false);
  };

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
      <View style={homeStyles.headingContainer}>
        <Text style={homeStyles.heading}>Wallet</Text>
        <TouchableOpacity onPress={handleAddCard}>
          <Text style={homeStyles.plusButton}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={accountsData}
        keyExtractor={(account) => account.id.toString()}
        renderItem={renderItem}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={homeStyles.centeredView}>
          <View style={homeStyles.modalView}>
            <Text>Bank Name</Text>
            <TextInput
              style={homeStyles.input}
              onChangeText={setNewBankName}
              value={newBankName}
            />
            <Text>Account Number</Text>
            <TextInput
              style={homeStyles.input}
              onChangeText={setNewAccountNumber}
              value={newAccountNumber}
            />
            <Text>Card Number</Text>
            <TextInput
              style={homeStyles.input}
              onChangeText={setNewCardNumber}
              value={newCardNumber}
            />
            <View style={homeStyles.modalButton}>
              <Button title="Save" onPress={handleSaveCard} />
            </View>
            <View style={homeStyles.modalButton}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#FF0000"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
