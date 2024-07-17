import React, { useState, useEffect, useCallback } from "react";
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
  RefreshControl,
  Share,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { Swipeable } from "react-native-gesture-handler";

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
    width: 200,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  shareButton: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    marginLeft: 10,
  },
  shareButtonText: {
    color: "white",
    fontWeight: "bold",
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
    logo: require("./assets/Capitec-Bank.jpg"),
    logoUri: "./assets/Capitec-Bank.jpg",
  },
  {
    bankName: "FNB",
    logo: require("./assets/FNB.png"),
    logoUri: "./assets/FNB.png",
  },
  {
    bankName: "African Bank",
    logo: require("./assets/African-bank.png"),
    logoUri: "./assets/African-bank.png",
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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newBankName, setNewBankName] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [accounts, setAccounts] = useState(initialAccountsData);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const storedAccounts = await AsyncStorage.getItem("accounts");
      if (storedAccounts) {
        const parsedAccounts = JSON.parse(storedAccounts);
        // Validate parsedAccounts to ensure it is an array and has the required structure
        if (Array.isArray(parsedAccounts)) {
          setAccounts(parsedAccounts);
        } else {
          setAccounts(initialAccountsData); // Load initial data if parsed data is not valid
        }
      } else {
        setAccounts(initialAccountsData); // Load initial data if no stored data found
      }
    } catch (error) {
      console.error("Failed to load accounts from storage", error);
      setAccounts(initialAccountsData); // Load initial data if error occurs
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
      accountNumber: newAccountNumber || "N/A",
      cardNumber: newCardNumber || "N/A",
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

  const handleEditCard = (account) => {
    setSelectedAccount(account);
    setNewBankName(account.bankName);
    setNewAccountNumber(account.accountNumber);
    setNewCardNumber(account.cardNumber);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    const updatedAccounts = accounts.map((account) =>
      account.id === selectedAccount.id
        ? {
            ...account,
            bankName: newBankName,
            accountNumber: newAccountNumber,
            cardNumber: newCardNumber,
          }
        : account
    );

    setAccounts(updatedAccounts);
    await saveAccounts(updatedAccounts);

    setEditModalVisible(false);
    setSelectedAccount(null);
    setNewBankName("");
    setNewAccountNumber("");
    setNewCardNumber("");
    Alert.alert("Success", "Card updated successfully");
  };

  const handleShareCard = async (account) => {
    try {
      await Share.share({
        message: `Bank Name: ${account.bankName}\nAccount Number: ${account.accountNumber}`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share the account information.");
    }
  };

  const renderRightActions = (itemId) => (
    <TouchableOpacity
      style={homeStyles.deleteButton}
      onPress={() => handleDeleteCard(itemId)}
    >
      <Text style={homeStyles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = (item) => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={homeStyles.editButton}
        onPress={() => handleEditCard(item)}
      >
        <Text style={homeStyles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={homeStyles.shareButton}
        onPress={() => handleShareCard(item)}
      >
        <Text style={homeStyles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      renderLeftActions={() => renderLeftActions(item)}
    >
      <View style={homeStyles.accountItem}>
        <Image source={item.logo} style={homeStyles.logo} />
        <View>
          <Text style={homeStyles.bankName}>
            {item.bankName || "Unknown Bank"}
          </Text>
          <Text>Account Number: {item.accountNumber || "N/A"}</Text>
          <Text>Card Number: {item.cardNumber || "N/A"}</Text>
          <Text>Balance: R {item.balance?.toFixed(2) || "0.00"}</Text>
        </View>
      </View>
    </Swipeable>
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAccounts().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.headingContainer}>
        <Text style={homeStyles.heading}>My Accounts</Text>
        <TouchableOpacity onPress={handleAddCard}>
          <Text style={homeStyles.plusButton}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={accounts}
        keyExtractor={(account) =>
          account?.id ? account.id.toString() : Math.random().toString()
        }
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
            <Text>Add New Card</Text>
            <Picker
              selectedValue={newBankName}
              style={{ height: 50, width: 250 }}
              onValueChange={(itemValue) => setNewBankName(itemValue)}
            >
              <Picker.Item label="Select Bank" value="" />
              {initialAccountsData.map((bank) => (
                <Picker.Item
                  key={bank.bankName}
                  label={bank.bankName}
                  value={bank.bankName}
                />
              ))}
            </Picker>
            <TextInput
              placeholder="Account Number"
              style={homeStyles.input}
              value={newAccountNumber}
              onChangeText={setNewAccountNumber}
            />
            <TextInput
              placeholder="Card Number"
              style={homeStyles.input}
              value={newCardNumber}
              onChangeText={setNewCardNumber}
            />
            <Button title="Save" onPress={handleSaveCard} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View style={homeStyles.centeredView}>
          <View style={homeStyles.modalView}>
            <Text>Edit Card</Text>
            <Picker
              selectedValue={newBankName}
              style={{ height: 50, width: 250 }}
              onValueChange={(itemValue) => setNewBankName(itemValue)}
            >
              <Picker.Item label="Select Bank" value="" />
              {initialAccountsData.map((bank) => (
                <Picker.Item
                  key={bank.bankName}
                  label={bank.bankName}
                  value={bank.bankName}
                />
              ))}
            </Picker>
            <TextInput
              placeholder="Account Number"
              style={homeStyles.input}
              value={newAccountNumber}
              onChangeText={setNewAccountNumber}
            />
            <TextInput
              placeholder="Card Number"
              style={homeStyles.input}
              value={newCardNumber}
              onChangeText={setNewCardNumber}
            />
            <Button title="Save" onPress={handleSaveEdit} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setEditModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
