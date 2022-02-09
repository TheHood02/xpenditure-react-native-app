import * as React from "react";
import { useState } from "react";
import { View, FlatList } from "react-native";
import firebase from "../../../database/firebaseDB";
import { getFirestore, collection, getDocs, orderBy, query, onSnapshot } from "firebase/firestore";
import ItemCard from "./ItemCard";
import { useFocusEffect } from "@react-navigation/native";

const TransactionsList = () => {
  const [loading, setLoading] = useState({
    isLoading: true,
    useArr: [],
  });

  const db = getFirestore();
  const firestoreRef = collection(db, "transactions");
  const q = query(firestoreRef, orderBy("timestamp", "desc"));
  console.log(q);
  useFocusEffect(
    React.useCallback(() => {
      // getDocs(firestoreRef).then((snapshot) => {
      //   let useArr = [];
      //   snapshot.docs.forEach((doc) => {
      //     useArr.push({ ...doc.data(), id: doc.id });
      //   });
      //   setLoading({
      //     isLoading: false,
      //     useArr,
      //   });
      // });
      // used "onSnapshot" so that we can use queries(orderby, only fetch specific docs from collection, add conditions basically...)
      onSnapshot(q, (snapshot) => {
        let useArr = [];
        snapshot.docs.forEach((doc) => {
          useArr.push({ ...doc.data(), id: doc.id });
        });
        setLoading({
          isLoading: false,
          useArr,
        });
      });
    }, [])
  );

  const convertDate = (item) => {
    const formatDateOptions = { day: "numeric", month: "short", year: "2-digit" };
    let formatTimeOptions = { timeStyle: "short" };
    const date = new Date(item.seconds * 1000).toLocaleDateString(undefined, formatDateOptions);
    const time = new Date(item.seconds * 1000).toLocaleTimeString(undefined, formatTimeOptions);
    const output = [date, time];
    return output;
  };

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={loading.useArr}
        renderItem={({ item }) => <ItemCard name={item.name} dateTime={convertDate(item["timestamp"])} amount={item.amount} from={item.from} />}
      />
    </View>
  );
};

export default TransactionsList;
