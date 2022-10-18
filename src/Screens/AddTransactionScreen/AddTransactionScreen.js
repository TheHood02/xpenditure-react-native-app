import * as React from "react";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import app from "../../../database/firebaseDB";
import { StyleSheet, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import MyAppText from "../../CustomComponents/MyAppText";

const AddTransactionScreen = ({navigation}) => {

  // init services
  const db = getFirestore(app);
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

    addDoc(firestoreRef, {
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ backgroundColor: "#031442", height: "100%" }}>
        {/* <AddTransactionForm navigation={navigation} /> */}
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
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="e.g. 6"
                  onChangeText={(val) => inputValueUpdate(val, "amount")}
                />
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
              <TouchableOpacity
                style={styles.btn2}
                onPress={() => storeTransactionDetails()}
              >
                <MyAppText style={{ color: "#5885FF" }}>Confirm</MyAppText>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "95%",
    paddingHorizontal: 15,
  },
  gradient: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: "10%"
  },
  inputFields: {
    height: "50%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
  },
  buttons: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "35%",
    // backgroundColor: 'red'
  },
  btn1: {
    backgroundColor: "#5885FF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  btn2: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
});

export default AddTransactionScreen;
