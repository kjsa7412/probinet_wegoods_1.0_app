import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

/// ----------
import Profile from "../../../screens/Tabs/Profile/Profile";

/// MyMessage
import MyMessage from "../../../screens/Tabs/Profile/MyMessage/MyMessage";

/// ProfileSetting
import ProfileSetting from "../../../screens/Tabs/Profile/ProfileSetting/ProfileSetting";
import ConfirmPolicy from "../../../screens/Tabs/Profile/ProfileSetting/ConfirmPolicy";
import StatusSetting from "../../../screens/Tabs/Profile/ProfileSetting/StatusSetting";

/// ProfileSetting - AccountSetting
import AccountSetting from "../../../screens/Tabs/Profile/ProfileSetting/AccountSetting/AccountSetting";
import AccountNumberSetting from "../../../screens/Tabs/Profile/ProfileSetting/AccountSetting/AccountNumberSetting";
import PasswordSetting from "../../../screens/Tabs/Profile/ProfileSetting/AccountSetting/PasswordSetting";
import PaymentMethodSetting from "../../../screens/Tabs/Profile/ProfileSetting/AccountSetting/PaymentMethodSetting";
import PhoneNumberSetting from "../../../screens/Tabs/Profile/ProfileSetting/AccountSetting/PhoneNumberSetting";

/// ProfileSetting - QuizSetting
import QuizSetting from "../../../screens/Tabs/Profile/ProfileSetting/QuizSetting/QuizSetting";
import NewAnswer from "../../../screens/Tabs/Profile/ProfileSetting/QuizSetting/NewAnswer";
import EditQuiz from "../../../screens/Tabs/Profile/ProfileSetting/QuizSetting/EditQuiz";
import AddQuiz from "../../../screens/Tabs/Profile/ProfileSetting/QuizSetting/AddQuiz";

/// Alram
import Alram from "../../../screens/Tabs/Profile/Alram/Alram";
import AlramSetting from "../../../screens/Tabs/Profile/Alram/AlramSetting";

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
      InitialRoute: { screen: Profile },
      ProfileSetting: { screen: ProfileSetting },
      AccountSetting: { screen: AccountSetting },
      ConfirmPolicy: { screen: ConfirmPolicy },
      QuizSetting: { screen: QuizSetting },
      StatusSetting: { screen: StatusSetting },
      AccountNumberSetting: { screen: AccountNumberSetting },
      PasswordSetting: { screen: PasswordSetting },
      PaymentMethodSetting: { screen: PaymentMethodSetting },
      PhoneNumberSetting: { screen: PhoneNumberSetting },
      NewAnswer: { screen: NewAnswer },
      EditQuiz: { screen: EditQuiz },
      AddQuiz: { screen: AddQuiz },
      MyMessage: { screen: MyMessage },
      AddGroup: { screen: AddGroup },
      Alram: { screen: Alram },
      AlramSetting: { screen: AlramSetting },
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
