import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import app from "../../../../database/firebaseDB";
// TODO: use Pressable on yash's to change username on click

import { getFirestore, getDoc, doc } from "firebase/firestore";
import Card from "./Card";
import MyAppText from "../../../CustomComponents/MyAppText";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const TopCards = () => {

  const navigation = useNavigation();

  const [cardNames, setCardNames] = useState([
    { name: "budget", id: "1", amount: "0000" },
    { name: "wallet", id: "2", amount: "0000" },
    { name: "remaining from goal", id: "3", amount: "0000" },
    { name: "spent", id: "4", amount: "0000" },
  ]);

  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);
  const docRef1 = doc(db, "target", "rjT37hqQMDOPyViBWXcF");
  const docRef2 = doc(db, "wallet", "djDeuqQQN9lDaM5188ky");
  const docRef3 = doc(db, "remaining", "XdWGwuDFUmnnMzHyOmmX");
  const docRef4 = doc(db, "spent", "4WIGNfepWhQXjtAOc7aV");

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      const state = cardNames;
      const references = [docRef1, docRef2, docRef3, docRef4];

      for (let i = 0; i < references.length; i++) {
        getDoc(references[i]).then((doc) => {
          if (isMounted) {const amount = doc.data()["amount"];
          state[i] = { ...state[i], amount };
          if (i === 3) {
            setCardNames(state);
            setLoading(false);
          }}
        });
      }

      return () => {
        isMounted = false;
        setLoading(true);
      }
  }, [loading])
  );

  // * DONT UNCOMMENT THIS
  // const state = cardNames;
  // const amount = '1'
  // console.log(state[0] = {...state[0], amount})
  // setCardNames(state) // ! uncommenting this will make it keeping on re-rendering
  // console.log(cardNames)

  // const [modalVisible, setModalVisible] = useState(false);

  const onPress = () => {
    navigation.navigate("EditCardsScreen")
  };

  return (
    <View style={{ padding: 10 }}>
      <MyAppText>yash's</MyAppText>
      <View style={styles.container}>
        <Card title={cardNames[0].name} amount={cardNames[0].amount} func={onPress} disableTouch={false} />
        <Card title={cardNames[1].name} amount={cardNames[1].amount} func={onPress} disableTouch={false} />
        <Card title={cardNames[2].name} amount={cardNames[2].amount} disableTouch={true} />
        <Card title={cardNames[3].name} amount={cardNames[3].amount} disableTouch={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default TopCards;
