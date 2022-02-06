import * as React from "react";
import { useState } from "react";
import { View, FlatList } from "react-native";
import firebase from "../../../database/firebaseDB";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ItemCard from "./ItemCard";
import { useFocusEffect } from "@react-navigation/native";

const TransactionsList = () => {
  const [loading, setLoading] = useState({
    isLoading: true,
    useArr: [],
  });

  // const db = getFirestore();
  // const firestoreRef = collection(db, "transactions");

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getDocs(firestoreRef).then((snapshot) => {
  //       let useArr = [];
  //       snapshot.docs.forEach((doc) => {
  //         useArr.push({ ...doc.data(), id: doc.id });
  //       });
  //       setLoading({
  //         isLoading: false,
  //         useArr,
  //       });
  //     });
  //   }, [])
  // );

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={loading.useArr}
        renderItem={({ item }) => <ItemCard name={item.name} dateTime={"date | time"} amount={item.amount} from={item.from} />}
      />
    </View>
  );
};

export default TransactionsList;
