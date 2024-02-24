import React from "react";
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
  },
  labelContainer: {
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 0,
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
