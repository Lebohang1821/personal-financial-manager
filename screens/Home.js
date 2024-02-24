import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";

const homeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40, // Adjust paddingTop as needed
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "red", // Change color to red
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "red", // Change color to red
  },
});

const mockupStyles = StyleSheet.create({
  mockupContainer: {
    marginTop: 40,
  },
  labelContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
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
  paragraph: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  link: {
    color: "blue", // Change link color if needed
  },
  italic: {
    fontStyle: "italic",
  },
  icon: {
    color: "orange", // Change icon color if needed
  },
});

export default function Home() {
  return (
    <ScrollView contentContainerStyle={homeStyles.container}>
      <View>
        <Text style={homeStyles.heading}>Welcome to Our App</Text>
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
  return (
    <View style={mockupStyles.mockupContainer}>
      <View style={mockupStyles.labelContainer}>
        <Text style={mockupStyles.label}>Bank Name: Capitec Bank</Text>
      </View>
      {/* Wrap the text within a <Text> component */}
      <Text style={mockupStyles.label}>Output of savings</Text>
      <View>
        <TextInput
          style={mockupStyles.input}
          onChangeText={(text) => {
            // Handle text input change here
          }}
        />
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
  );
}
