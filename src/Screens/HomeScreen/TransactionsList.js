import * as React from "react";
import { useState } from "react";
import { View, FlatList } from "react-native";
import { getFirestore, collection, orderBy, query, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import ListItem from "./ListItem";
import { useFocusEffect } from "@react-navigation/native";
import app from "../../../database/firebaseDB.js"

const TransactionsList = () => {
  const [loading, setLoading] = useState({
    isLoading: true,
    useArr: [],
  });

  const db = getFirestore(app);
  const firestoreRef = collection(db, "transactions");
  const q = query(firestoreRef, orderBy("timestamp", "desc"));
  
  let total = 0;
  let budget = 0;
  const spentRef = doc(db, "spent", "4WIGNfepWhQXjtAOc7aV");
  const budgetRef = doc(db, "target", "rjT37hqQMDOPyViBWXcF");
  const remainingRef = doc(db, "remaining", "XdWGwuDFUmnnMzHyOmmX");
  
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
        })
        setLoading({
          isLoading: false,
          useArr,
        });
        // updateTotal();
      })

      getDoc(budgetRef).then((doc) => {
        budget = doc.data()["amount"];
      })

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

  const updateTotal = () => {
    if (total === 0) return;
    if (budget === 0) return;

    updateDoc(spentRef, {
      amount: total,
    })

    let remaining = budget - total;

    updateDoc(remainingRef, {
      amount: remaining,
    })
  }

  return (
    <View style={{ flex: 1,padding: 15 }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={loading.useArr}
        renderItem={({ item }) => {
        {
          total = total + Number(item.amount);
        }
        return <ListItem name={item.name} dateTime={convertDate(item.timestamp)} amount={item.amount} from={item.from} />
        }}
      />
      {updateTotal()}
    </View>
  );
};

export default TransactionsList;
