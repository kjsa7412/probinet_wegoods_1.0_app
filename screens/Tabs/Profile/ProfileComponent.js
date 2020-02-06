import styled from "styled-components";
import styles from "../../../styles";

/// ---------------------------------
export const Touchable = styled.TouchableOpacity``;
/// ---------------------------------

/// ---------------------------------
/// Base
export const FullContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
  background-color: ${styles.containerTestColor};
`;

export const ScreenContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${styles.baseWidth};
  height: 100%;
`;
/// ---------------------------------

/// ---------------------------------
/// Option Bar
export const OptionBarContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${styles.headerHeight};
`;

export const OptionBarItemContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth / 3};
  height: ${styles.headerHeight};
`;

export const OptionBarItemText = styled.Text`
  color: ${props =>
    props.bgColor === true ? props.theme.blackColor : "#CECECE"};
  text-align: center;
  font-size: 18;
  font-family: NanumBarunGothicBold;
`;
/// ---------------------------------

/// ---------------------------------
/// Bottom Post
export const BottomContainer = styled.View`
  width: 100%;
  height: ${props => (props.scHeight ? props.scHeight : styles.baseHeight)};
`;

export const BottomPostContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 14;
  padding-right: 14;
  margin-top: 14;
`;

export const BottomLifePostImage = styled.Image`
  width: 167;
  height: 167;
  margin-bottom: 14;
`;
/// ---------------------------------

/// ---------------------------------
/// Profile

/// Profile - Cover
export const ProfileContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${styles.baseWidth};
  height: 400;
`;

export const ProfileCover = styled.View`
  background-color: #828282;
  opacity: 0.5;
  position: absolute;
  width: ${styles.baseWidth};
  height: 400;
`;

export const ProfileImage = styled.Image`
  position: absolute;
  width: ${styles.baseWidth};
  height: 400;
`;

/// 프로필 - 위에서 팬 이름까지
export const ProfileTopContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`;

export const InnerTopContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 50%;
  padding-bottom: 5;
`;

export const UserContainer = styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
background-color:${styles.whiteColor}
width: 105;
height: 105;
margin-left: 5;
margin-right: 5;
border-radius: 52.5;
`;

export const UserImage = styled.Image`
  width: 100;
  height: 100;
  border-radius: 50;
`;

export const UserBlank = styled.View`
  background-color: ${styles.weGoodsColor};
  width: 100;
  height: 100;
  border-radius: 50;
`;

export const IconContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70;
  height: 105;
  margin-left: 20;
  margin-right: 20;
`;

export const IconImage = styled.Image`
  width: 25;
  height: 25;
  margin-bottom: 5;
`;

/// 프로필 - 팔로워 팔로잉 포스트 개수
export const InnerBottomContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50%;
`;

export const ProfileBottomContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth};
  height: 105;
`;

export const BioContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  width: ${styles.baseWidth};
  padding: 15px;
`;

export const Text = styled.Text`
  color: ${props => (props.bgColor ? props.bgColor : props.theme.whiteColor)};
  text-align: left;
  font-size: ${props => (props.size ? props.size : 14)};
  font-family: ${props =>
    props.type === "Bold" ? "NanumBarunGothicBold" : "NanumBarunGothicLight"};
  margin-top: 5;
  line-height: 25;
`;
