import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MyMap from "../screens/Student/MyMap";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "react-native-paper";
import TicketStack from "./Ticket/TicketStack";
import HomeStack from "./Student/HomeStack";
import SettingsStack from "./Settings/SettingsStack";

const Tab = createBottomTabNavigator();

const StudentTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          borderRadius: 15,
          display: getTabBarVisibility(route),
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: theme.colors.white,
        },
        tabBarInactiveTintColor: theme.colors.tabInactiveColor,
        tabBarActiveTintColor: theme.colors.tabActiveColor,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="home-outline"
              color={color}
              size={focused ? 30 : 25}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Map"
        component={MyMap}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5 name="map" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="YTickets"
        component={TicketStack}
        options={{
          title: "Your Tickets",
          tabBarBadge: 7,
          tabBarBadgeStyle: { backgroundColor: "tomato" },
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="ticket-alt"
              size={focused ? 30 : 25}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5 name="user" color={color} size={focused ? 30 : 25} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  console.log(routeName);

  if (
    routeName == "home" ||
    routeName == "Feed" ||
    routeName == "Profile7" ||
    routeName == "TicketDetails" ||
    routeName == "Home" ||
    routeName == "Settingss"
  ) {
    return "flex";
  }
  return "none";
};

export default StudentTabNavigator;
