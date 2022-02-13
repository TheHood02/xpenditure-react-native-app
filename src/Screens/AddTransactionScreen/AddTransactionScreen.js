import * as React from "react";
import { View } from "react-native";
import AddTransactionForm from "./AddTransactionForm";

const AddTransactionScreen = (navigation) => {
  return (
    <View style={{ backgroundColor: "#031442", height: "100%" }}>
      <AddTransactionForm navigation={navigation} />
    </View>
  );
};

export default AddTransactionScreen;
