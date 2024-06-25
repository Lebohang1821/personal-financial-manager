import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Background from "./Background";
import Btn from "./Btn";
import { darkGreen } from "./Constants";
import Field from "./Field";

const Login = (props) => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth > 460 ? 460 : screenWidth;

  return (
    <Background>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ alignItems: "center", width: containerWidth }}>
          <Text
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: "bold",
              marginTop: 60, // Adjusted marginTop to move "Login" text below
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Login
          </Text>
          <View
            style={{
              backgroundColor: "hsla(0, 0%, 80%, 0.3)",
              width: containerWidth,
              borderTopLeftRadius: 130,
              paddingTop: 100,
              alignItems: "center",
              marginTop: 70,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                color: "darkgoldenrod",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 19,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Login to your account
            </Text>
            <Field
              placeholder="Email / Username"
              keyboardType={"email-address"}
              containerStyle={{ width: "78%" }}
            />
            <Field
              placeholder="Password"
              secureTextEntry={true}
              containerStyle={{ width: "78%", marginBottom: 20 }}
            />
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginRight: 16,
                marginBottom: 20,
              }}
              onPress={() => {
                // Implement your "Forgot Password" functionality here
              }}
            >
              <Text
                style={{ color: "silver", fontWeight: "bold", fontSize: 16 }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>
            <Btn
              textColor="white"
              bgColor="blue"
              btnLabel="Login"
              Press={() => {
                props.navigation.navigate("Main");
              }}
              containerStyle={{ marginBottom: 20, width: "78%" }}
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={{
                color: darkGreen,
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
