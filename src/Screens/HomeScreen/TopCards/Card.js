import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MyAppText from "../../../CustomComponents/MyAppText";

const Card = (props) => {
  return (
    // <TouchableOpacity style={styles.card} onPress={() => props.func()} disabled={props.disableTouch}>
    <TouchableOpacity style={styles.card} onPress={() => props.func()} disabled={props.disableTouch}>
      <MyAppText>{props.title}</MyAppText>
      <MyAppText>Rs {props.amount}</MyAppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: "46%",
    height: 98,
    marginBottom: 13,
    paddingLeft: 10,
    paddingVertical: 8,
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-between",

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 5,
    //   height: 4,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 6,
    // TODO: see how to show shadows
    // elevation: 10, //! uncommenting this makes odd box appear behind card
  },
});

export default Card;
