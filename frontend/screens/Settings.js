import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  Picker,
} from "react-native";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const saveSettings = async () => {
    // Simulating backend interaction, replace with actual API calls
    try {
      // Assume settings are saved successfully
      Alert.alert(
        "Settings Saved",
        "Your settings have been saved successfully."
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save settings. Please try again later.");
    }
  };

  const handleLogout = async () => {
    // Simulating backend interaction, replace with actual API calls
    try {
      // Assume logout is successful
      Alert.alert("Logged Out", "You have been logged out successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again later.");
    }
  };

  const handleToggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const theme = darkModeEnabled ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, theme.container]}>
      <Text style={[styles.title, theme.title]}>Settings</Text>

      <View style={[styles.settingContainer, theme.settingContainer]}>
        <Text style={[styles.settingLabel, theme.settingLabel]}>
          Enable Notifications
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>

      <View style={[styles.settingContainer, theme.settingContainer]}>
        <Text style={[styles.settingLabel, theme.settingLabel]}>Username</Text>
        <TextInput
          style={[styles.input, theme.input]}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      {/* Add other settings components */}

      <View style={[styles.settingContainer, theme.settingContainer]}>
        <Text style={[styles.settingLabel, theme.settingLabel]}>Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={handleToggleDarkMode} />
      </View>

      <TouchableOpacity
        style={[styles.button, theme.button]}
        onPress={saveSettings}
      >
        <Text style={[styles.buttonText, theme.buttonText]}>Save Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, theme.button]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonText, theme.buttonText]}>Logout</Text>
      </TouchableOpacity>

      {/* Add other buttons/components */}
    </View>
  );
}

const lightTheme = {
  container: {
    backgroundColor: "#ffffff",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#006A42",
  },
  settingContainer: {
    backgroundColor: "hsla(0, 0%, 80%, 1.0)",
    borderBottomWidth: 2,
  },
  settingLabel: {
    color: "#000000",
  },
  input: {
    color: "#000000",
  },
  button: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#ffffff",
  },
};

const darkTheme = {
  container: {
    backgroundColor: "#1a1a1a",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#006A42",
  },
  settingContainer: {
    backgroundColor: "#303030",
  },
  settingLabel: {
    color: "#ffffff",
  },
  input: {
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#ffffff",
  },
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#006A42",
  },
  settingContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  settingLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
  },
};
