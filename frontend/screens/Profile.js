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
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// Custom horizontal rule component
const Hr = () => <View style={styles.hr} />;

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150"
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://192.168.56.1:8080");
        const data = response.data;

        if (data.length > 0) {
          const {
            Username,
            Email,
            Bio,
            Phone_number,
            Profile_pic,
          } = data[0];

          setUsername(Username);
          setEmail(Email);
          setBio(Bio);
          setPhoneNumber(Phone_number);
          setProfilePic(Profile_pic);
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
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("phoneNumber", phoneNumber);

      if (profilePic && profilePic !== "https://via.placeholder.com/150") {
        formData.append("profilePic", {
          uri: profilePic,
          type: "image/jpeg",
          name: "profilePic.jpg",
        });
      }

      const response = await axios.post(
        "http://192.168.56.1:8080/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsEditing(false);
      alert("Profile saved successfully");
      console.log("Profile saved:", response.data);
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
      const response = await fetch(
        "http://192.168.56.1:8080/upload-profile-pic",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const imageUrl = await response.text();
      setProfilePic(imageUrl);
      console.log("Image uploaded successfully:", imageUrl);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={transactionStyles.heading}>Your Profile</Text>
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
    backgroundColor: "#f0f8ff",
    paddingBottom: 79,
  },
  Profilecontainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "hsla(0, 0%, 80%, 1.0)",
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
    backgroundColor: "hsla(0, 0%, 80%, 0.3)",
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
const transactionStyles = {
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#006A42",
  },
};
