import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home.js";
import Ai from "./screens/Ai.js";
import Ai2 from "./screens/Ai2.js";
import Ai3 from "./screens/Ai3.js";
import Ai4 from "./screens/Ai4.js";
import Ai5 from "./screens/Ai5.js";
import Navbar from "./components/Navbar.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <Navbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AI" component={Ai} />
      <Tab.Screen name="AI2" component={Ai2} />
      <Tab.Screen name="AI4" component={Ai4} />

      {/* <Tab.Screen name="AI3" component={Ai3} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="AI3" component={Ai3} />
        <Stack.Screen name="AI5" component={Ai5} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
