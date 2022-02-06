import { Text } from "react-native";

const MyAppText = (props) => {
  return <Text style={{ fontFamily: "poppins-regular", color: "#FFF", fontSize: 15, ...props.style }}>{props.children}</Text>;
};

// const styles = StyleSheet.create({

// })

export default MyAppText;
