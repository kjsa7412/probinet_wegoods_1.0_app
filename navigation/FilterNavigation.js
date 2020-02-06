import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

/// ----------
import Filter from "../screens/Filter/Filter";
import NewArtist from "../screens/Filter/NewArtist/NewArtist";
import AddArtist from "../screens/Filter/NewArtist/AddArtist";
import AddArtistResult from "../screens/Filter/NewArtist/AddArtistResult";
import NewKind from "../screens/Filter/NewKind/NewKind";
import NewKeyword from "../screens/Filter/NewKeyword/NewKeyword";
/// ----------

/// ----------

export default createStackNavigator(
  {
    InitialRoute: { screen: Filter },
    NewArtist: { screen: NewArtist },
    AddArtist: { screen: AddArtist },
    AddArtistResult: { screen: AddArtistResult },
    NewKind: { screen: NewKind },
    NewKeyword: { screen: NewKeyword }
  },
  {
    defaultNavigationOptions: {
      headerStyle: { height: 0, borderStyle: "dotted", elevation: 0 },
      headerLeft: <View></View>
    }
  }
);
