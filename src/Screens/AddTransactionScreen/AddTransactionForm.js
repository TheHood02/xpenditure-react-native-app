import * as React from "react";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import firebase from "../../../database/firebaseDB";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import MyAppText from "../../CustomComponents/MyAppText";
import { useNavigation } from "@react-navigation/native";

const AddTransactionForm = (props) => {
  const navigation = useNavigation();
  // init services
  const db = getFirestore();
  // collection ref
  const firestoreRef = collection(db, "transactions");

  const [loading, setLoading] = useState({
    isLoading: true,
    amount: "",
    from: "",
    name: "",
    timestamp: "",
  });

  const cancelWrite = () => {
    setLoading({
      name: "",
      from: "",
      amount: "",
      timestamp: "",

      isLoading: false,
    });
    navigation.navigate("HomeScreen");
  };

  const storeTransactionDetails = () => {
    const state = loading;
    state.isLoading = true;
    setLoading(state);

    zzaddDoc(firestoreRef, {
      name: loading.name,
      from: loading.from,
      amount: loading.amount,
      timestamp: serverTimestamp(),
    })
      .then((res) => {
        setLoading({
          name: "",
          from: "",
          amount: "",
          timestamp: "",
          isLoading: false,
        });
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        console.log("Error found: ", err);
        const state = loading;
        state.isLoading = false;
        setLoading(state);
      });
  };

  const inputValueUpdate = (val, prop) => {
    const state = loading;
    state[prop] = val;
    setLoading(state);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["#8913C1", "rgba(189, 11, 108, 0.7)"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
      >
        <View style={styles.inputFields}>
          <View>
            <MyAppText>Enter the Amount Spent:</MyAppText>
            <TextInput style={styles.input} autoCapitalize="sentences" placeholder="e.g. 6" onChangeText={(val) => inputValueUpdate(val, "amount")} />
          </View>

          <View>
            <MyAppText>Enter the Name of Product:</MyAppText>
            <TextInput
              style={styles.input}
              autoCapitalize="sentences"
              placeholder="e.g. Bus Ticket"
              onChangeText={(val) => inputValueUpdate(val, "name")}
            />
          </View>

          <View>
            <MyAppText>Enter the Method of Payment:</MyAppText>
            <TextInput
              style={styles.input}
              autoCapitalize="sentences"
              placeholder="e.g. Wallet"
              onChangeText={(val) => inputValueUpdate(val, "from")}
            />
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btn1} onPress={() => cancelWrite()}>
            <MyAppText>Cancel</MyAppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={() => storeTransactionDetails()}>
            <MyAppText style={{ color: "#5885FF" }}>Confirm</MyAppText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "80%",
    paddingHorizontal: 15,
  },
  gradient: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  inputFields: {
    height: "50%",
    justifyContent: "space-around",
    marginTop: 20,
  },
  input: {
    width: 225,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
  },
  buttons: {
    width: 225,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "35%",
  },
  btn1: {
    backgroundColor: "#5885FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  btn2: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
});

export default AddTransactionForm;
