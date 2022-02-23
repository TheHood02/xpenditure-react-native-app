import { useState } from "react";
import * as Fonts from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Screens/HomeScreen/HomeScreen";
import AddTransactionScreen from "./src/Screens/AddTransactionScreen/AddTransactionScreen";
import EditCardsScreen from "./src/Screens/EditCardsScreen/EditCardsScreen";

const getFonts = () =>
  Fonts.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        // screenOptions={{ headerShown: false }}
        options={{ headerShown: false }}
        //   title: "Home Screen",
        //   headerTintColor: "#fff",
        //   headerStyle: {
        //     backgroundColor: "#AD00FF",
        //   },
        // }}
      />
      <Stack.Screen
        name="AddTransactionScreen"
        component={AddTransactionScreen}
        options={{
          title: "Add A Transaction",
          headerTintColor: "#Ad00FF",
          headerStyle: {
            backgroundColor: "#031442",
          },
        }}
      />
      <Stack.Screen
        name="EditCardsScreen"
        component={EditCardsScreen}
        options={{
          title: "Edit Cards"
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
      // <HomeScreen />
      // <AddTransactionScreen />
      // <EditCardsScreen />
    );
  } else {
    return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} onError={(err) => console.log(err)} />;
  }
}
