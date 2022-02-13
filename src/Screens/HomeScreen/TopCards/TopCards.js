import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";

// TODO: use Pressable on yash's to change username on click

import { getFirestore, getDoc, doc } from "firebase/firestore";
import Card from "./Card";
import MyAppText from "../../../CustomComponents/MyAppText";
import { useFocusEffect } from "@react-navigation/native";
import EditBudgetModal from "./EditBudgetModal";

const TopCards = () => {
  const [cardNames, setCardNames] = useState([
    { name: "budget", id: "1", amount: "0000" },
    { name: "wallet", id: "2", amount: "0000" },
    { name: "remaining from goal", id: "3", amount: "0000" },
    { name: "spent", id: "4", amount: "0000" },
  ]);
  // *UNCOMMENT THIS WHEN DONE
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const docRef1 = doc(db, "target", "rjT37hqQMDOPyViBWXcF");
  const docRef2 = doc(db, "spent", "4WIGNfepWhQXjtAOc7aV");
  const docRef3 = doc(db, "remaining", "XdWGwuDFUmnnMzHyOmmX");
  const docRef4 = doc(db, "wallet", "djDeuqQQN9lDaM5188ky");

  useFocusEffect(
    React.useCallback(() => {
      const state = cardNames;
      const references = [docRef1, docRef2, docRef3, docRef4];

      for (let i = 0; i < references.length; i++) {
        getDoc(references[i]).then((doc) => {
          const amount = doc.data()["amount"];
          state[i] = { ...state[i], amount };
          if (i === 3) {
            setCardNames(state);
            setLoading(false);
          }
        });
      }
    }, [])
  );

  // * DONT UNCOMMENT THIS
  // const state = cardNames;
  // const amount = '1'
  // console.log(state[0] = {...state[0], amount})
  // setCardNames(state) // ! uncommenting this will make it keeping on re-rendering
  // console.log(cardNames)

  const [modalVisible, setModalVisible] = useState(false);

  const onPress = () => {
    setModalVisible(!modalVisible);
    setLoading(!loading);
  };

  return (
    <View style={{ padding: 10 }}>
      <EditBudgetModal modalHandler={onPress} modalVisible={modalVisible} />
      <MyAppText>yash's</MyAppText>
      <View style={styles.container}>
        <Card title={cardNames[0].name} func={onPress} amount={cardNames[0].amount} disableTouch={false} />
        <Card title={cardNames[1].name} amount={cardNames[1].amount} disableTouch={true} />
        <Card title={cardNames[2].name} amount={cardNames[2].amount} disableTouch={true} />
        <Card title={cardNames[3].name} amount={cardNames[3].amount} disableTouch={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "30%",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default TopCards;
