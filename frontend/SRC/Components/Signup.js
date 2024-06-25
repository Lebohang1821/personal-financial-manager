import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Background from "./Background";
import Btn from "./Btn";
import { darkGreen } from "./Constants";
import Field from "./Field";

const Signup = (props) => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth > 460 ? 460 : screenWidth;

  return (
    <Background>
      <View style={{ alignItems: "center", width: containerWidth }}>
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            marginTop: 60, // Adjusted marginTop to move "Register" lower
            marginBottom: 10, // Added marginBottom for spacing
            textAlign: "center",
          }}
        >
          Register
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: "transparent",
            width: containerWidth,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            paddingBottom: 20,
            alignItems: "center",
          }}
        >
          <Field placeholder="First Name" containerStyle={{ marginBottom: 10, width: "78%" }} />
          <Field placeholder="Last Name" containerStyle={{ marginBottom: 10, width: "78%" }} />
          <Field
            placeholder="Email / Username"
            keyboardType={"email-address"}
            containerStyle={{ marginBottom: 10, width: "78%" }}
          />
          <Field
            placeholder="Contact Number"
            keyboardType={"number-pad"}
            containerStyle={{ marginBottom: 10, width: "78%" }}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            containerStyle={{ marginBottom: 10, width: "78%" }}
          />
          <Field
            placeholder="Confirm Password"
            secureTextEntry={true}
            containerStyle={{ marginBottom: 10, width: "78%" }}
          />
          <View style={{ flexDirection: "row", alignItems: "center", width: "78%", marginBottom: 10 }}>
            <Text style={{ color: "grey" }}>
              By signing in, you agree to our{" "}
            </Text>
            <Text style={{ color: darkGreen, fontWeight: "bold" }}>
              Terms & Conditions
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", width: "78%", marginBottom: 10 }}>
            <Text style={{ color: "grey" }}>and </Text>
            <Text style={{ color: darkGreen, fontWeight: "bold" }}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={() => {
              props.navigation.navigate("Main");
            }}
            containerStyle={{ marginBottom: 30, width: "78%" }} // Increased marginBottom to move the signup button lower
          />
        </View>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: "lightgrey", fontSize: 16, fontWeight: "bold" }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={{ color: darkGreen, fontSize: 16, fontWeight: "bold" }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
