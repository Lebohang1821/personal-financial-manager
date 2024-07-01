import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

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
    position: "relative", // to position delete button
  },
  logo: {
    width: 80,
    height: 90,
    marginRight: 10,
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
    width: "100%",
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

const initialAccountsData = [
  {
    bankName: "ABSA",
    logo: require("./assets/ABSA.png"), // update the path to your actual logo image
    logoUri: "./assets/ABSA.png", // update the path to your actual logo image
  },
  {
    bankName: "Standard Bank",
    logo: require("./assets/Standard-Bank.png"),
    logoUri: "./assets/Standard-Bank.png",
  },
  {
    bankName: "Capitec Bank",
    logo: require("./assets/Capitec-Bank.png"),
    logoUri: "./assets/Capitec-Bank.png",
  },
  {
    bankName: "FNB",
    logo: require("./assets/FNB.png"),
    logoUri: "./assets/FNB.png",
  },
  {
    bankName: "African Bank",
    logo: require("./assets/African-bank.svg"),
    logoUri: "./assets/African-bank.svg",
  },
  {
    bankName: "Nedbank",
    logo: require("./assets/Nedbank.png"),
    logoUri: "./assets/Nedbank.png",
  },
  // Add more banks as needed
];

export default function Wallet() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newBankName, setNewBankName] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const storedAccounts = await AsyncStorage.getItem("accounts");
      if (storedAccounts) {
        setAccounts(JSON.parse(storedAccounts));
      } else {
        setAccounts(initialAccountsData); // Load initial data if no stored data found
      }
    } catch (error) {
      console.error("Failed to load accounts from storage", error);
    }
  };

  const saveAccounts = async (accountsToSave) => {
    try {
      await AsyncStorage.setItem("accounts", JSON.stringify(accountsToSave));
    } catch (error) {
      console.error("Failed to save accounts to storage", error);
    }
  };

  const handleAddCard = () => {
    setModalVisible(true);
  };

  const handleSaveCard = async () => {
    const selectedBank = initialAccountsData.find(
      (bank) => bank.bankName === newBankName
    );
    if (!selectedBank) {
      Alert.alert("Error", "Bank logo not found for the selected bank.");
      return;
    }

    const newCard = {
      id: accounts.length + 1,
      bankName: newBankName,
      accountNumber: newAccountNumber,
      cardNumber: newCardNumber,
      balance: 0, // Default balance for new cards
      logo: selectedBank.logo, // Use selected bank's logo
      logoUri: selectedBank.logoUri, // Store URI of selected bank's logo
    };

    const updatedAccounts = [...accounts, newCard];
    setAccounts(updatedAccounts);
    await saveAccounts(updatedAccounts);

    setModalVisible(false);
    setNewBankName("");
    setNewAccountNumber("");
    setNewCardNumber("");
    Alert.alert("Success", "Card saved successfully");
  };

  const handleDeleteCard = async (cardId) => {
    const updatedAccounts = accounts.filter((account) => account.id !== cardId);
    setAccounts(updatedAccounts);
    await saveAccounts(updatedAccounts);
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
      <TouchableOpacity
        onPress={() => handleDeleteCard(item.id)}
        style={{ position: "absolute", top: 11, right: 15 }}
      >
        <Text style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
          X
        </Text>
      </TouchableOpacity>
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
        data={accounts}
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
            <Picker
              style={homeStyles.input}
              selectedValue={newBankName}
              onValueChange={(itemValue) => setNewBankName(itemValue)}
            >
              {initialAccountsData.map((bank) => (
                <Picker.Item
                  key={bank.bankName}
                  label={bank.bankName}
                  value={bank.bankName}
                />
              ))}
            </Picker>
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
                onPress={() => {
                  setModalVisible(false);
                }}
                color="#FF0000"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
