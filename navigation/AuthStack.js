import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import OnboardingScreen from "../screens/Student/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentStack from "./StudentStack";
import TicketManStack from "./TicketManStack";
import { Text } from "react-native-paper";
import Loader from "../components/Loader";
import Register from "../screens/Auth/Register";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  React.useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch == null) {
    return <Loader />;
  } else if (isFirstLaunch === true) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="onBoarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentStack"
          component={StudentStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TicketManStack"
          component={TicketManStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
};

export default AuthStack;
