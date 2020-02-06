/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, Platform } from "react-native";
import { useMutation, useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../../../../components/Loader";
import styles from "../../../../styles";
import constants from "../../../../constants";
import Swiper from "react-native-swiper";
import HeaderBase from "../../../../components/Header/HeaderBase";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";

/// Query
import { FOLLOW_USER, UNFOLLOW_USER } from "../UserProfile/UserProfileQueries";

const SEE_LIKE = gql`
  query seeLikeFromPost($postId: String!, $lifePostId: String!) {
    seeLikeFromPost(postId: $postId, lifePostId: $lifePostId) {
      id
      user {
        id
        avatar
        username
        isFollowing
        isSelf
      }
    }
  }
`;

/// Component
import UserItem from "../../../../components/Item/UserItem";

/// ----------
/// Styled Components

///
const Touchable = styled.TouchableOpacity``;

/// Base
const FullContainer = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: ${styles.containerTestColor};
  flex: 1;
`;

const ScreenContainer = styled.View`
flex-direction: column;
align-items: center;
width: ${styles.baseWidth}
height: 100%;
`;

/// Body
const BottomContainer = styled.View`
  flex-grow: 1;
  width: 100%;
`;

const UserContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const UserItemContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 33.3%;
  padding-top: 30;
  padding-bottom: 30;
`;

/// Button
const FollowButton = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 30;
  border-radius: 5px;
  background-color: ${props =>
    props.following ? "#ACABAB" : styles.darkWeGoodsColor};
  margin-top: 5;
`;

const FollowText = styled.Text`
  color: ${props => (props.following ? styles.whiteColor : styles.whiteColor)};
  text-align: center;
  font-size: 11;
  font-family: NanumBarunGothicBold;
`;

export default ({ navigation }) => {
  /// ----------
  /// Init
  const postId = navigation.getParam("postId", "");
  const lifePostId = navigation.getParam("lifePostId", "");

  const [refreshing, setRefreshing] = useState(false);

  /// ----------
  /// Load Data
  let likeResult = useQuery(SEE_LIKE, {
    variables: { postId: postId, lifePostId: lifePostId },
    fetchPolicy: "network-only"
  });

  const [followMutation] = useMutation(FOLLOW_USER);
  const [unfollowMutation] = useMutation(UNFOLLOW_USER);

  /// ----------
  /// Function
  const refresh = async () => {
    try {
      setRefreshing(true);
      await likeResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const pushFollowButton = async (id, isFollowing) => {
    try {
      if (isFollowing) {
        const {
          data: { unfollow }
        } = await unfollowMutation({
          variables: {
            userId: id
          }
        });
        await likeResult.refetch();
        console.log(unfollow);
      } else {
        const {
          data: { follow }
        } = await followMutation({
          variables: {
            userId: id
          }
        });
        await likeResult.refetch();
        console.log(follow);
      }
    } catch (e) {
    } finally {
    }
  };

  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase isleftBackButton={true} />
        {likeResult.loading ? (
          <Loader />
        ) : (
          <ScrollView
            bounces={false}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <UserContainer>
              {likeResult.data.seeLikeFromPost.map(value => (
                <UserItemContainer key={value.user.id}>
                  <UserItem
                    avatarUri={value.user.avatar}
                    username={value.user.username}
                    onPress={() =>
                      navigation.push("UserProfile", {
                        userId: value.user.id
                      })
                    }
                  />
                  {value.user.isSelf ? null : (
                    <FollowButton
                      onPress={() => {
                        pushFollowButton(value.user.id, value.user.isFollowing);
                      }}
                      following={value.user.isFollowing}
                    >
                      <FollowText following={value.user.isFollowing}>
                        Follow
                      </FollowText>
                    </FollowButton>
                  )}
                </UserItemContainer>
              ))}
            </UserContainer>
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
