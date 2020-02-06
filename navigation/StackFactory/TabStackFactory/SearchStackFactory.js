import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

/// ----------
import Search from "../../../screens/Tabs/Search/Search";

/// ------------------------
/// Common
/// Common - Post
import Post from "../../../screens/Tabs/Common/Post/Post";
import Participants from "../../../screens/Tabs/Common/Post/Participants";
import RegistedMiniPosts from "../../../screens/Tabs/Common/Post/RegistedMiniPosts";
import RegistedMiniPostList from "../../../screens/Tabs/Common/Post/RegistedMiniPostList";
/// Common - UserProfile
import UserProfile from "../../../screens/Tabs/Common/UserProfile/UserProfile";
/// Common - Search
import UserSearch from "../../../screens/Tabs/Common/Search/UserSearch";
import LocationSearch from "../../../screens/Tabs/Common/Search/LocationSearch";
/// Common - Follow
import Follow from "../../../screens/Tabs/Common/Follow/Follow";
/// Common - Like
import Like from "../../../screens/Tabs/Common/Like/Like";
/// Common - Group
import Group from "../../../screens/Tabs/Common/Group/Group";
import AddGroup from "../../../screens/Tabs/Common/Group/AddGroup";
import JoinGroup from "../../../screens/Tabs/Common/Group/JoinGroup";
/// ------------------------

/// ----------
export default () =>
  createStackNavigator(
    {
      InitialRoute: { screen: Search },

      /// ------------------------
      /// Common
      Post: { screen: Post },
      Participants: { screen: Participants },
      RegistedMiniPosts: { screen: RegistedMiniPosts },
      RegistedMiniPostList: { screen: RegistedMiniPostList },
      UserProfile: { screen: UserProfile },
      LocationSearch: { screen: LocationSearch },
      UserSearch: { screen: UserSearch },
      Follow: { screen: Follow },
      Like: { screen: Like },
      Group: { screen: Group },
      AddGroup: { screen: AddGroup },
      JoinGroup: { screen: JoinGroup }
      /// ------------------------
    },
    {
      defaultNavigationOptions: {
        headerStyle: { height: 0, borderStyle: "dotted", elevation: 0 },
        headerLeft: <View></View>
      }
    }
  );
