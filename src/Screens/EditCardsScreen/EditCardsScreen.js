import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import MyAppText from "../../CustomComponents/MyAppText";
import app from "../../../database/firebaseDB";

const EditCardsScreen = ({ navigation }) => {
  const BUDGET_ID = "rjT37hqQMDOPyViBWXcF";
  const WALLET_ID = "djDeuqQQN9lDaM5188ky";
  // how to update wallet? auto/manual/both?
  // store last time wallet was updated and auto update from that time transaction

  const [updateBudget, setUpdateBudget] = useState();
  const [updateWallet, setUpdateWallet] = useState();

  const db = getFirestore(app);
  const docRef1 = doc(db, "target", BUDGET_ID);
  const docRef2 = doc(db, "wallet", WALLET_ID);

  const budgetInput = (val) => {
    setUpdateBudget(parseInt(val));
  };

  const walletInput = (val) => {
    setUpdateWallet(parseInt(val));
  }

  const editBudget = () => {
    updateDoc(docRef1, {
      amount: updateBudget,
    }).then(() => {
      setUpdateBudget(0);
      navigation.navigate("HomeScreen")
    });
  };

  const editWallet = () => {
    updateDoc(docRef2, {
      amount: updateWallet,
    }).then(() => {
      setUpdateWallet(0);
      navigation.navigate("HomeScreen")
    });
  };

  const cancelUpdate = () => {
    setUpdateBudget(0);
    setUpdateBudget(0);
    navigation.navigate("HomeScreen")
  };

  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
              <MyAppText style={styles.text}>Edit Budget:</MyAppText>
              <TextInput style={styles.inputField} onChangeText={(val) => budgetInput(val)} keyboardType="numeric" />
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity style={[styles.button]} onPress={() => editBudget()}>
                <MyAppText style={styles.textStyle}>Update</MyAppText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => cancelUpdate()}>
                <MyAppText style={{ ...styles.textStyle, color: "#AD00FF" }}>Cancel</MyAppText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
              <MyAppText style={styles.text}>Update Wallet:</MyAppText>
              <TextInput style={styles.inputField} onChangeText={(val) => walletInput(val)} keyboardType="numeric" />
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity style={[styles.button]} onPress={() => editWallet()}>
                <MyAppText style={styles.textStyle}>Update Wallet</MyAppText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button]} onPress={() => editWallet()}>
                <MyAppText style={styles.textStyle}>Add to existing value</MyAppText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => cancelUpdate()}>
                <MyAppText style={{ ...styles.textStyle, color: "#AD00FF" }}>Cancel</MyAppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  card: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "#000",
    marginRight: 5,
  },
  inputField: {
    width: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#AD00FF",
  },
  buttonView: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  button: {
    textAlign: "center",
    width: "100%",
    borderRadius: 2,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#AD00FF",
  },
  buttonCancel: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#AD00FF"
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditCardsScreen;
