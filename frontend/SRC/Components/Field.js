import React from "react";
import { TextInput } from "react-native";
import { dimgrey } from "./Constants";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: "blue",
        paddingHorizontal: 10,
        width: "78%",
        height: 35,
        backgroundColor: "rgb(220,220, 220)",
        marginVertical: 4,
      }}
      placeholderTextColor={dimgrey}
    ></TextInput>
  );
};

export default Field;
