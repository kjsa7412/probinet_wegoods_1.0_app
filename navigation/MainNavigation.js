import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import FilterNavigation from "./FilterNavigation";
import CommentNavigation from "./CommentNavigation";
import ChatNavigation from "./ChatNavigation";
import { stackStyles } from "./config";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation,
    FilterNavigation,
    CommentNavigation,
    ChatNavigation
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      }
    },
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(MainNavigation);
