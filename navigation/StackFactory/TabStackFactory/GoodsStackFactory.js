import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

/// ----------
import Goods from "../../../screens/Tabs/Goods/Goods";
import Interest from "../../../screens/Tabs/Goods/Interest";
import MyFilter from "../../../screens/Tabs/Goods/MyFilter";
import NewMyFilter from "../../../screens/Tabs/Goods/NewMyFilter";
import Search from "../../../screens/Tabs/Search/Search";
/// ----------
export default () =>
  createStackNavigator(
    {
      InitialRoute: { screen: Goods },
      Interest: { screen: Interest },
      MyFilter: { screen: MyFilter },
      NewMyFilter: { screen: NewMyFilter },
      Search: { screen: Search }
    },
    {
      defaultNavigationOptions: {
        headerStyle: { height: 0, borderStyle: "dotted", elevation: 0 },
        headerLeft: <View></View>
      }
    }
  );
