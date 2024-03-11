import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import moment from "moment"; // Import moment library
import { Entypo } from "@expo/vector-icons";

export default function Transaction() {
  // Mock array of transactions
  const transactions = [
    {
      id: 1,
      date: new Date(),
      bank: "Capitec",
      type: "money in",
      amount: 1500,
      description: "Salary",
      savings: 500,
      available: 1490,
    },
    {
      id: 2,
      date: new Date(),
      bank: "Capitec",
      type: "money out",
      amount: 2000,
      description: "Groceries",
      savings: -300,
      available: 1700,
    },
    {
      id: 3,
      date: new Date(),
      bank: "ABSA",
      type: "money in",
      amount: 3000,
      description: "Investment return",
      savings: 1000,
      available: 2500,
    },
    {
      id: 4,
      date: new Date("2024-02-10"),
      bank: "Capitec",
      type: "money in",
      amount: 1500,
      description: "Salary",
      savings: 500,
      available: 1490,
    },
    {
      id: 5,
      date: new Date("2024-02-15"),
      bank: "Capitec",
      type: "money out",
      amount: 2000,
      description: "Groceries",
      savings: -300,
      available: 1700,
    },
    {
      id: 6,
      date: new Date("2024-03-05"),
      bank: "ABSA",
      type: "money in",
      amount: 3000,
      description: "Investment return",
      savings: 1000,
      available: 2500,
    },
    {
      id: 7,
      date: new Date("2024-03-12"),
      bank: "FNB",
      type: "money in",
      amount: 2500,
      description: "Bonus",
      savings: 800,
      available: 2200,
    },
  ];

  // Function to group transactions by month
  const groupTransactionsByMonth = () => {
    const groupedTransactions = {};
    transactions.forEach((transaction) => {
      const monthYear = moment(transaction.date).format("MMMM YYYY");
      if (!groupedTransactions[monthYear]) {
        groupedTransactions[monthYear] = [];
      }
      groupedTransactions[monthYear].push(transaction);
    });
    return groupedTransactions;
  };

  const [expandedTransaction, setExpandedTransaction] = useState(null);
  const groupedTransactions = groupTransactionsByMonth();

  // Function to handle click on a transaction
  const handleTransactionClick = (transaction) => {
    setExpandedTransaction(
      transaction.id === expandedTransaction ? null : transaction.id
    );
  };

  return (
    <ScrollView style={{ flex: 1, padding: 15 }}>
      {Object.entries(groupedTransactions).map(
        ([monthYear, transactionsForMonth]) => (
          <View key={monthYear} style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: 10,
              }}
            >
              {monthYear}
            </Text>
            {transactionsForMonth.map((transaction) => (
              <TouchableOpacity
                key={`${monthYear}-${transaction.id}`}
                onPress={() => handleTransactionClick(transaction)}
              >
                <View
                  style={{
                    backgroundColor:
                      transaction.type === "money in" ? "#32CD32" : "red",
                    padding: 10,
                    marginVertical: 5,
                    borderBottomWidth: 2,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Entypo
                        name={
                          transaction.type === "money in"
                            ? "arrow-with-circle-up"
                            : "arrow-with-circle-down"
                        }
                        size={24}
                        color="#fff"
                        style={{ marginRight: 10 }}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {moment(transaction.date).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 16, color: "#fff" }}>
                      {transaction.type === "money in" ? "+" : "-"} R{" "}
                      {Math.abs(transaction.amount)}
                    </Text>
                  </View>
                  {expandedTransaction === transaction.id && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: "#fff" }}>
                        Bank: {transaction.bank}
                      </Text>
                      <Text style={{ color: "#fff" }}>
                        Description: {transaction.description}
                      </Text>
                      <Text style={{ color: "#fff" }}>
                        Savings: R {transaction.savings}
                      </Text>
                      <Text style={{ color: "#fff" }}>
                        Available amount: R {transaction.available}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )
      )}
    </ScrollView>
  );
}
