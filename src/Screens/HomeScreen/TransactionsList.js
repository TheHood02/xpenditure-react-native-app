import * as React from "react";
import { useState } from "react";
import { View, FlatList } from "react-native";
import { getFirestore, collection, orderBy, query, onSnapshot } from "firebase/firestore";
import ItemCard from "./ItemCard";
import { useFocusEffect } from "@react-navigation/native";

const TransactionsList = () => {
  const [loading, setLoading] = useState({
    isLoading: true,
    useArr: [],
  });

  // const [isMounted, setIsMounted] = useState();

  const db = getFirestore();
  const firestoreRef = collection(db, "transactions");
  const q = query(firestoreRef, orderBy("timestamp", "desc"));
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      // used "onSnapshot" so that we can use queries(orderby, only fetch specific docs from collection, add conditions basically...)
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let useArr = [];
        snapshot.docs.forEach((doc) => {
          if (isMounted) {
            useArr.push({ ...doc.data(), id: doc.id });
          }
        });
        setLoading({
          isLoading: false,
          useArr,
        });
      });

      return () => {
        isMounted = false;
        unsubscribe();
      };
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
        renderItem={({ item }) => <ItemCard name={item.name} dateTime={convertDate(item.timestamp)} amount={item.amount} from={item.from} />}
      />
    </View>
  );
};

export default TransactionsList;
