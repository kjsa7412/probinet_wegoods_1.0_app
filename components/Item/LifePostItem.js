/// ----------
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, Platform, Text } from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import PropTypes from "prop-types";

/// ----------
import constants from "../../constants";
import styles from "../../styles";

/// ----------
const Touchable = styled.TouchableOpacity``;

const LifePostContainer = styled.View`
  background-color: ${props => props.theme.whiteColor};
  width: ${styles.baseWidth - 28};
`;

const SwiperContainer = styled.View`
  width: 100%;
  height: ${styles.baseWidth - 28};
`;

const LifePostImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const LifeStatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80;
`;

const OtherItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  height: 80;
`;

const StatusItemContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserItemImage = styled.Image`
  width: 32;
  height: 32;
  border-radius: 16;
`;

const OtherItemImage = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${styles.darkWeGoodsColor};
  width: 32;
  height: 32;
  border-radius: 16;
`;

const InnerImage = styled.Image`
  width: 16;
  height: 16;
`;

const ItemText = styled.Text`
  text-align: center;
  font-size: 13;
  font-family: NanumBarunGothicBold;
  margin-top: 10;
`;

const DescContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const DescText = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothicLight;
  line-height: 25;
`;

const LifePostItem = ({
  navigation,
  postId,
  postFiles,
  userId,
  userAvatar,
  username,
  created,
  updated,
  likeCount,
  commentCount,
  postTitle
}) => {
  return (
    <LifePostContainer>
      <SwiperContainer>
        <Swiper activeDotColor={"#FFFFFF"} autoplay={true} autoplayTimeout={2}>
          {postFiles.map(value => (
            <LifePostImage key={value} source={{ uri: value }} />
          ))}
        </Swiper>
      </SwiperContainer>
      <LifeStatusContainer>
        <Touchable
          onPress={() =>
            navigation.push("UserProfile", {
              userId: userId
            })
          }
        >
          <StatusItemContainer>
            <UserItemImage key={userId} source={{ uri: userAvatar }} />
            <ItemText>{username}</ItemText>
          </StatusItemContainer>
        </Touchable>
        <OtherItemContainer>
          <StatusItemContainer>
            <OtherItemImage>
              <InnerImage
                source={require("../../assets/iconmonstr-time-1-240.png")}
              />
            </OtherItemImage>
            <ItemText>1일 전</ItemText>
          </StatusItemContainer>

          <Touchable
            onPress={() => {
              navigation.push("Like", {
                postId: postId
              });
            }}
          >
            <StatusItemContainer>
              <OtherItemImage>
                <InnerImage
                  source={require("../../assets/iconmonstr-favorite-3-240.png")}
                />
              </OtherItemImage>
              <ItemText>{likeCount}</ItemText>
            </StatusItemContainer>
          </Touchable>
          <Touchable
            onPress={() => {
              navigation.push("CommentNavigation", {
                postId: postId,
                fromScreen: navigation.state.routeName
              });
            }}
          >
            <StatusItemContainer>
              <OtherItemImage>
                <InnerImage
                  source={require("../../assets/iconmonstr-speech-bubble-13-240.png")}
                />
              </OtherItemImage>
              <ItemText>{commentCount}</ItemText>
            </StatusItemContainer>
          </Touchable>
        </OtherItemContainer>
      </LifeStatusContainer>
      {postTitle === "" || postTitle === null ? null : (
        <Touchable>
          <DescContainer>
            <DescText> {postTitle} </DescText>
          </DescContainer>
        </Touchable>
      )}
    </LifePostContainer>
  );
};
LifePostItem.propTypes = {
  postId: PropTypes.string,
  postFiles: PropTypes.array,
  userId: PropTypes.string,
  userAvatar: PropTypes.string,
  username: PropTypes.string,
  created: PropTypes.string,
  updated: PropTypes.string,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  postTitle: PropTypes.string
};

export default LifePostItem;
