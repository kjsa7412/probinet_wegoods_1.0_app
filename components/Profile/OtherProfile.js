/// ----------
/// Import
import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import styles from "../../styles";
import HeaderBase from "../Header/HeaderBase";
import HeaderRightStyles from "../Header/HeaderRight/HeaderRightStyles";

/// ----------
/// Styled Components

///
const Touchable = styled.TouchableOpacity``;

/// 베이스 ----------
const ProfileContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${styles.baseWidth};
  height: 400;
`;

const ProfileCover = styled.View`
  background-color: #828282;
  opacity: 0.5;
  position: absolute;
  width: ${styles.baseWidth};
  height: 400;
`;

const ProfileImage = styled.Image`
  position: absolute;
  width: ${styles.baseWidth};
  height: 400;
`;

/// 위에서 팬 이름까지 ----------
const ProfileTopContainer = styled.View`
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth};
`;

const InnerTopContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth};
  height: 105;
`;

const UserContainer = styled.View`
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

const UserImage = styled.Image`
  width: 100;
  height: 100;
  border-radius: 50;
`;

const UserBlank = styled.View`
  background-color: ${styles.weGoodsColor};
  width: 100;
  height: 100;
  border-radius: 50;
`;

const IconContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70;
  height: 50;
  margin-left: 20;
  margin-right: 20;
`;

const IconImage = styled.Image`
  width: 25;
  height: 25;
  margin-bottom: 5;
`;

/// 팔로워 팔로잉 포스트 개수 ----------
const InnerBottomContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth};
  height: 70;
`;

///
const ProfileBottomContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth};
  height: 105;
`;

///
const BioContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  width: ${styles.baseWidth};
  padding: 15px;
`;

///
const Text = styled.Text`
  color: ${props => (props.bgColor ? props.bgColor : props.theme.whiteColor)};
  text-align: left;
  font-size: ${props => (props.size ? props.size : 14)};
  font-family: ${props =>
    props.type === "Bold" ? "NanumBarunGothicBold" : "NanumBarunGothicLight"};
  margin-top: 5;
  line-height: 25;
`;

/// ------------
/// Button Container
const ButtonContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: ${styles.baseWidth};
  padding-top: ${styles.headerHeight};
  padding-right: 15;
  position: absolute;
`;

/// Follow
const FollowButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.following ? styles.whiteColor : styles.darkWeGoodsColor};
  width: 54;
  height: 54;
  border-radius: 27;
`;

const FollowButtonText = styled.Text`
  color: ${props => (props.following ? styles.blackColor : styles.whiteColor)};
  text-align: center;
  font-size: 11;
  font-family: NanumBarunGothicBold;
`;

/// Message
const MessageButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${styles.whiteColor};
  width: 54;
  height: 54;
  border-radius: 27;
  margin-top: 15;
`;

const MessageButtonText = styled.Image`
  width: 22;
  height: 20;
`;

/// ----------
const OtherProfile = withNavigation(
  ({
    navigation,
    id,
    background,
    avatar,
    username,
    fan,
    followingCount,
    followersCount,
    postsCount,
    bio = ""
  }) => {
    // fan
    var fanResult = "";

    for (var i = 0; i < fan.length; i++) {
      fanResult += fan[i].name;
      if (i !== fan.length - 1) {
        fanResult += " ";
      }
    }

    return (
      <View>
        <ProfileContainer>
          <ProfileImage source={{ uri: background }} />
          <ProfileCover />
          <HeaderBase isleftBackButton={true} isleftBackButtonColor={"white"} />
          <ButtonContainer>
            <Touchable>
              <FollowButtonContainer following={false}>
                <FollowButtonText following={false}>Follow</FollowButtonText>
              </FollowButtonContainer>
            </Touchable>
            <Touchable>
              <MessageButtonContainer>
                <MessageButtonText
                  source={require("../../assets/iconmonstr-speech-bubble-black.png")}
                />
              </MessageButtonContainer>
            </Touchable>
          </ButtonContainer>
          <ProfileTopContainer>
            <InnerTopContainer>
              <UserContainer>
                {avatar === null ? (
                  <UserBlank />
                ) : (
                  <UserImage source={{ uri: avatar }} />
                )}
              </UserContainer>
            </InnerTopContainer>
            <InnerBottomContainer>
              <Text size={18} type={"Bold"}>
                {username}
              </Text>
              <Text size={14} type={"Light"}>
                {fanResult}
              </Text>
            </InnerBottomContainer>
          </ProfileTopContainer>
          <ProfileBottomContainer>
            <Touchable>
              <IconContainer>
                <Text size={14} type={"Bold"}>
                  {followersCount}
                </Text>
                <Text size={14} type={"Light"}>
                  followers
                </Text>
              </IconContainer>
            </Touchable>
            <Touchable>
              <IconContainer>
                <Text size={14} type={"Bold"}>
                  {followingCount}
                </Text>
                <Text size={14} type={"Light"}>
                  following
                </Text>
              </IconContainer>
            </Touchable>
            <Touchable>
              <IconContainer>
                <Text size={14} type={"Bold"}>
                  {postsCount}
                </Text>
                <Text size={14} type={"Light"}>
                  posts
                </Text>
              </IconContainer>
            </Touchable>
          </ProfileBottomContainer>
        </ProfileContainer>
        <BioContainer>
          <Text size={14} type={"Light"} bgColor={styles.blackColor}>
            {bio}
          </Text>
        </BioContainer>
      </View>
    );
  }
);

OtherProfile.propTypes = {
  id: PropTypes.string.isRequired,
  background: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  fan: PropTypes.array.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  bio: PropTypes.string
};

export default OtherProfile;
