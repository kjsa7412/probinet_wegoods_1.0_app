import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

/// ----------
import Chat from "../screens/Chat/Chat";
import ChatSetting from "../screens/Chat/ChatSetting";
import KickUser from "../screens/Chat/KickUser";
import InviteUser from "../screens/Chat/InviteUser";

/// ----------
export default createStackNavigator(
  {
    InitialRoute: { screen: Chat },
    ChatSetting: { screen: ChatSetting },
    KickUser: { screen: KickUser },
    InviteUser: { screen: InviteUser }
  },
  {
    defaultNavigationOptions: {
      headerStyle: { height: 0, borderStyle: "dotted", elevation: 0 },
      headerLeft: <View></View>
    }
  }
);
