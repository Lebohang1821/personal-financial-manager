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
  );
}
