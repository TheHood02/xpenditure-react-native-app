import { useState } from "react";
import * as Fonts from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Screens/HomeScreen/HomeScreen";
import AddTransactionScreen from "./src/Screens/AddTransactionScreen/AddTransactionScreen";
import Sandbox from "./Sandbox";

const getFonts = () =>
  Fonts.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
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
      // <Sandbox />
      // <AddTransactionScreen />
    );
  } else {
    return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} onError={(err) => console.log(err)} />;
  }
}
