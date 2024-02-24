<<<<<<< HEAD
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [bio, setBio] = useState("Hello, I am John Doe.");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("Select Bank");
  const [bankType, setBankType] = useState("Select Type");
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150"
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform save operation (e.g., update user profile on server)
    setIsEditing(false);
  };

  const handleChooseImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setProfilePic(pickerResult.uri);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChooseImage} style={styles.imageContainer}>
        <Image source={{ uri: profilePic }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Username:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        ) : (
          <Text style={styles.text}>{username}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        ) : (
          <Text style={styles.text}>{email}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Bio:</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, styles.bioInput]}
            multiline
            value={bio}
            onChangeText={setBio}
          />
        ) : (
          <Text style={styles.text}>{bio}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Phone Number:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.text}>{phoneNumber}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Bank Name:</Text>
        {isEditing ? (
          <Picker
            style={styles.input}
            selectedValue={bankName}
            onValueChange={(itemValue) => setBankName(itemValue)}
          >
            <Picker.Item label="Select Bank" value="Select Bank" />
            <Picker.Item label="Capitec" value="Capitec" />
            <Picker.Item label="Standard Bank" value="Standard Bank" />
            <Picker.Item label="FNB" value="FNB" />
            <Picker.Item label="Time Bank" value="Time Bank" />
            <Picker.Item label="ABSA" value="ABSA Bank" />
            {/* Add more bank options as needed */}
          </Picker>
        ) : (
          <Text style={styles.text}>{bankName}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Bank Type:</Text>
        {isEditing ? (
          <Picker
            style={styles.input}
            selectedValue={bankType}
            onValueChange={(itemValue) => setBankType(itemValue)}
          >
            <Picker.Item label="Select Type" value="Select Type" />
            <Picker.Item label="Savings" value="Savings" />
            <Picker.Item label="Checking" value="Checking" />
            <Picker.Item label="Investment" value="Investment" />
            {/* Add more bank type options as needed */}
          </Picker>
        ) : (
          <Text style={styles.text}>{bankType}</Text>
        )}
      </View>
      {isEditing ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <Button title="Edit" onPress={handleEdit} />
      )}
    </View>
=======
import React from "react";
import { Text, View, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  MaterialIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import Home from "./screens/Home";
import Portfolio from "./screens/Portfolio";
import Transaction from "./screens/Transaction";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo
                  name="home"
                  size={24}
                  color={focused ? "#ff0000" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#ff0000" }}>HOME</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={Portfolio}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo
                  name="wallet"
                  size={24}
                  color={focused ? "#ff0000" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#ff0000" }}>WALLET</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={Transaction}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#ff0000" : "#111",
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                }}
              >
                <FontAwesome name="exchange" size={24} color="#fff" />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="person"
                  size={24}
                  color={focused ? "#ff0000" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#ff0000" }}>PROFILE</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="settings"
                  size={24}
                  color={focused ? "#ff0000" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#ff0000" }}>SETTINGS</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
>>>>>>> 6aa70cc7f8a9eea2cf762b58bfc4e65243cb4697
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#f9f9f9",
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  label: {
    width: 120,
    marginRight: 10,
    fontWeight: "bold",
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  bioInput: {
    height: 100,
  },
});