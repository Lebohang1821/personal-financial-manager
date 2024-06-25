import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import moment from "moment"; // Import moment library
import { Entypo } from "@expo/vector-icons";

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

const transactionStyles = {
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
    backgroundColor: "#f0f0f0",
  },
  monthHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  transactionContainer: {
    backgroundColor: "#32CD32", // Default to green for money in
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 2,
    borderRadius: 10,
  },
  transactionDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    marginRight: 10,
  },
  transactionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  transactionAmount: {
    fontSize: 16,
    color: "#fff",
  },
  expandedDetails: {
    marginTop: 10,
  },
  expandedText: {
    color: "#fff",
  },
};

export default function Transaction() {
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

  const handleTransactionClick = (transaction) => {
    setExpandedTransaction(
      transaction.id === expandedTransaction ? null : transaction.id
    );
  };

  return (
    <View style={transactionStyles.container}>
      <Text style={transactionStyles.heading}>Your banks Transactions</Text>
      <ScrollView style={{ flex: 1 }}>
        {Object.entries(groupedTransactions).map(
          ([monthYear, transactionsForMonth]) => (
            <View key={monthYear} style={{ marginBottom: 20 }}>
              <Text style={transactionStyles.monthHeading}>{monthYear}</Text>
              {transactionsForMonth.map((transaction) => (
                <TouchableOpacity
                  key={`${monthYear}-${transaction.id}`}
                  onPress={() => handleTransactionClick(transaction)}
                >
                  <View
                    style={[
                      transactionStyles.transactionContainer,
                      {
                        backgroundColor:
                          transaction.type === "money in" ? "#32CD32" : "red",
                      },
                    ]}
                  >
                    <View style={transactionStyles.transactionDetails}>
                      <View style={transactionStyles.transactionInfo}>
                        <Entypo
                          name={
                            transaction.type === "money in"
                              ? "arrow-with-circle-up"
                              : "arrow-with-circle-down"
                          }
                          size={24}
                          color="#fff"
                          style={transactionStyles.transactionIcon}
                        />
                        <Text style={transactionStyles.transactionText}>
                          {moment(transaction.date).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </Text>
                      </View>
                      <Text style={transactionStyles.transactionAmount}>
                        {transaction.type === "money in" ? "+" : "-"} R{" "}
                        {Math.abs(transaction.amount)}
                      </Text>
                    </View>
                    {expandedTransaction === transaction.id && (
                      <View style={transactionStyles.expandedDetails}>
                        <Text style={transactionStyles.expandedText}>
                          Bank: {transaction.bank}
                        </Text>
                        <Text style={transactionStyles.expandedText}>
                          Description: {transaction.description}
                        </Text>
                        <Text style={transactionStyles.expandedText}>
                          Savings: R {transaction.savings}
                        </Text>
                        <Text style={transactionStyles.expandedText}>
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
    </View>
  );
}
