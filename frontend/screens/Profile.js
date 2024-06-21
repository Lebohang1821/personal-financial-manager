import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// Custom horizontal rule component
const Hr = () => <View style={styles.hr} />;

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("Select Bank");
  const [bankType, setBankType] = useState("Select Type");
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150"
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://192.168.1.5:8080"); // Replace with your backend URL
        const data = response.data;

        if (data.length > 0) {
          const {
            Username,
            Email,
            Bio,
            Phone_number,
            Bank_name,
            Bank_type,
            Profile_pic,
          } = data[0];

          setUsername(Username);
          setEmail(Email);
          setBio(Bio);
          setPhoneNumber(Phone_number);
          setBankName(Bank_name);
          setBankType(Bank_type);
          setProfilePic(Profile_pic); // Assuming Profile_pic is a URL
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://192.168.1.5:8080/update-profile", {
        username,
        email,
        bio,
        phoneNumber,
        bankName,
        bankType,
      });
      setIsEditing(false);
      alert("Profile saved successfully");
      console.log("Profile saved:", response.data); // Log response for debugging
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again later.");
    }
  };

  const handleChooseImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", {
      uri: pickerResult.uri,
      type: "image/jpeg",
      name: "profilePic.jpg",
    });

    try {
      const response = await fetch("http://192.168.1.5:8080/upload-profile-pic", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const imageUrl = await response.text();
      setProfilePic(imageUrl);
      console.log("Image uploaded successfully:", imageUrl); // Log URL for debugging
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleChooseImage}
          style={styles.imageContainer}
        >
          <Image source={{ uri: profilePic }} style={styles.image} />
        </TouchableOpacity>

        <Text style={styles.heading}>Profile</Text>
        <View style={styles.Profilecontainer}>
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
        </View>
        {/* Render horizontal rule component */}
        <Hr />
        {isEditing ? (
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#f9f9f9",
  },
  Profilecontainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#b8b8b8",
    borderBottomWidth: 2,
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    // For Android elevation (box shadow)
    elevation: 5,
    // For iOS shadow
    shadowColor: "#eeeeee",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#919191",
    borderBottomWidth: 2,
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    // For Android elevation (box shadow)
    elevation: 5,
    // For iOS shadow
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    marginBottom: 15,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },
  label: {
    width: 120,
    marginRight: 5,
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
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});
