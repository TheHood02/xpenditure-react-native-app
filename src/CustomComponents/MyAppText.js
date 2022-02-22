import { Text } from "react-native";

const MyAppText = (props) => {
  return <Text style={{ 
      fontFamily: "poppins-medium", 
      color: "#FFF", 
      fontSize: 18,
      ...props.style 
    }}
  >
    {props.children}
  </Text>;
};

// const styles = StyleSheet.create({

// })

export default MyAppText;
