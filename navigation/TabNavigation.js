import React from "react";
import { View, Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

/// ----------
import NavIcon from "../components/NavIcon";
import HomeStackFactory from "./StackFactory/TabStackFactory/HomeStackFactory";
import GoodsStackFactory from "./StackFactory/TabStackFactory/GoodsStackFactory";
import SearchStackFactory from "./StackFactory/TabStackFactory/SearchStackFactory";
import ProfileStackFactory from "./StackFactory/TabStackFactory/ProfileStackFactory";

/// ----------;
import Add from "../screens/Tabs/Add/Add";

/// ----------
const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: { height: 0, borderStyle: "dotted", elevation: 0 },
        headerLeft: <View></View>
      }
    }
  );

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackFactory(),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
        )
      }
    },
    Goods: {
      screen: GoodsStackFactory(),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-star" : "md-star"}
          />
        )
      }
    },
    Add: {
      screen: stackFactory(Add),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
          />
        )
      }
    },
    Search: {
      screen: SearchStackFactory(),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-leaf" : "md-leaf"}
          />
        )
      }
    },
    Profile: {
      screen: ProfileStackFactory(),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 45,
        backgroundColor: "#FFFFFF",
        borderStyle: "dotted",
        borderTopWidth: 0
      }
    }
  }
);
