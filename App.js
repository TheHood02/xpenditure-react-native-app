import { useState } from 'react';
import * as Fonts from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen/HomeScreen'
import AddTransactionScreen from './src/Screens/AddTransactionScreen/AddTransactionScreen';
import Sandbox from './Sandbox';

const getFonts = () => Fonts.loadAsync({
  'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
  'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf')
});

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen"
        component={HomeScreen}
        options={{title:'Home Screen'}}
      />
      <Stack.Screen 
        name="AddTransactionScreen"
        component={AddTransactionScreen}
      />
    </Stack.Navigator>
  )
}

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
    return(
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }  
}
