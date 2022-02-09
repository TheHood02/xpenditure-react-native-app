import React, { useState } from "react";
import { StyleSheet, View, Modal, TouchableOpacity, TextInput } from "react-native";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import MyAppText from "../../../CustomComponents/MyAppText";

const EditBudgetModal = (props) => {
  const BUDGET_ID = "rjT37hqQMDOPyViBWXcF";
  // TODO: make it so that id is passed in props and i can update wallet that way too
  // how to update wallet? auto/manual/both?
  // store last time wallet was updated and auto update from that time transaction

  const [updateBudget, setUpdateBudget] = useState();

  const inputText = (val) => {
    setUpdateBudget(parseInt(val));
  };

  const db = getFirestore();
  const docRef = doc(db, "target", BUDGET_ID);

  const editBudget = () => {
    updateDoc(docRef, {
      amount: updateBudget,
    }).then(() => {
      setUpdateBudget(0);
      props.modalHandler();
    });
  };

  const cancelUpdate = () => {
    setUpdateBudget(0);
    props.modalHandler();
  };

  return (
    <Modal visible={props.modalVisible} onRequestClose={() => props.modalHandler()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
            <MyAppText style={styles.modalText}>Edit Budget:</MyAppText>
            <TextInput style={styles.inputText} onChangeText={(val) => inputText(val)} keyboardType="numeric" />
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => cancelUpdate()}>
              <MyAppText style={{ ...styles.textStyle, color: "#AD00FF" }}>Close</MyAppText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]} onPress={() => editBudget()}>
              <MyAppText style={styles.textStyle}>Update</MyAppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
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
  modalText: {
    color: "#000",
    marginRight: 5,
  },
  inputText: {
    width: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#AD00FF",
  },
  button: {
    textAlign: "center",
    width: 100,
    borderRadius: 2,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#AD00FF",
  },
  buttonClose: {
    backgroundColor: "#fff",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditBudgetModal;
