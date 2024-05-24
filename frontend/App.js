// App.js

import React, { useState } from "react";
import { Text, View, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Wallet from "./screens/Wallet";
import Transaction from "./screens/Transaction";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "./SRC/Components/ThemeProvider"; // It checks path to your ThemeProvider component

const Tab = createBottomTabNavigator();

export default function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <ThemeProvider darkMode={darkModeEnabled}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: darkModeEnabled ? "#1a1a1a" : "#f0f0f0",
        }}
      >
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarStyle: {
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                elevation: 0,
                height: 60,
                background: darkModeEnabled ? "#1a1a1a" : "#fff",
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Entypo
                      name="home"
                      size={24}
                      color={focused ? "#ff0000" : "#111"}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: focused ? "#ff0000" : "#111",
                      }}
                    >
                      HOME
                    </Text>
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="Wallet"
              component={Wallet}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Entypo
                      name="wallet"
                      size={24}
                      color={focused ? "#ff0000" : "#111"}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: focused ? "#ff0000" : "#111",
                      }}
                    >
                      WALLET
                    </Text>
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
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <MaterialIcons
                      name="person"
                      size={24}
                      color={focused ? "#ff0000" : "#111"}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: focused ? "#ff0000" : "#111",
                      }}
                    >
                      PROFILE
                    </Text>
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Ionicons
                      name="settings"
                      size={24}
                      color={focused ? "#ff0000" : "#111"}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: focused ? "#ff0000" : "#111",
                      }}
                    >
                      SETTINGS
                    </Text>
                  </View>
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}
