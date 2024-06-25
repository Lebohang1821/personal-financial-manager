import React from "react";
import { TextInput } from "react-native";
import { darkGreen } from "./Constants";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: "blue",
        paddingHorizontal: 10,
        width: "78%",
        height: 30,
        backgroundColor: "rgb(220,220, 220)",
        marginVertical: 10,
      }}
      placeholderTextColor="dimgrey"
    ></TextInput>
  );
};

export default Field;
