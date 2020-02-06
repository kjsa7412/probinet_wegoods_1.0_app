/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, Platform } from "react-native";
import { useMutation, useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../../../../components/Loader";
import styles from "../../../../styles";
import Swiper from "react-native-swiper";
import HeaderBase from "../../../../components/Header/HeaderBase";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";

/// Query
import {
  SEE_USER,
  SEE_USER_POST,
  SEE_USER_LIFEPOST,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "./UserProfileQueries";

/// Component
import {
  Touchable,
  FullContainer,
  ScreenContainer,
  OptionBarContainer,
  OptionBarItemContainer,
  OptionBarItemText,
  BottomContainer,
  BottomPostContainer,
  BottomLifePostImage,
  ProfileContainer,
  ProfileCover,
  ProfileImage,
  ProfileTopContainer,
  InnerTopContainer,
  UserContainer,
  UserImage,
  UserBlank,
  IconContainer,
  IconImage,
  InnerBottomContainer,
  ProfileBottomContainer,
  BioContainer,
  Text,
  ButtonContainer,
  FollowButtonContainer,
  FollowButtonText,
  MessageButtonContainer,
  MessageButtonText
} from "./UserProfileComponent";

import PostItem from "../../../../components/Item/Post/PostItem";

/// ----------
export default ({ navigation }) => {
  /// ----------
  /// Init
  const userId = navigation.getParam("userId", "");

  const [loading, setLoading] = useState(false);
  const [shouldFetch, setShouldFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [way, setWay] = useState(0);

  /// ----------
  /// Load Data
  let userResult = useQuery(SEE_USER, {
    variables: { userId: userId },
    fetchPolicy: "network-only"
  });

  let lifePostResult = useQuery(SEE_USER_LIFEPOST, {
    variables: { userId: userId },
    fetchPolicy: "network-only"
  });

  let postResult = useQuery(SEE_USER_POST, {
    variables: { userId: userId },
    fetchPolicy: "network-only"
  });

  const [followMutation] = useMutation(FOLLOW_USER, {
    variables: { userId: userId }
  });

  const [unfollowMutation] = useMutation(UNFOLLOW_USER, {
    variables: { userId: userId }
  });

  /// Initial Data
  const [initial, setInitial] = useState(false);

  const [isAvatar, setIsAvatar] = useState(false);
  const [isBackground, setIsBackground] = useState(false);
  const [isBio, setIsBio] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!initial) {
    if (userResult.loading === false && userResult.data !== undefined) {
      if (
        userResult.data.seeUser.avatar !== null &&
        userResult.data.seeUser.avatar !== ""
      ) {
        setIsAvatar(true);
      }

      if (
        userResult.data.seeUser.background !== null &&
        userResult.data.seeUser.background !== ""
      ) {
        setIsBackground(true);
      }

      if (
        userResult.data.seeUser.bio !== null &&
        userResult.data.seeUser.bio !== ""
      ) {
        setIsBio(true);
      }

      setIsFollowing(userResult.data.seeUser.isFollowing);
      setInitial(true);
    }
  }

  /// ----------
  /// Function
  const refresh = async () => {
    try {
      setRefreshing(true);
      await userResult.refetch();
      await lifePostResult.refetch();
      await postResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const scrollToIndex = index => {
    if (this.swiper && this.swiper.scrollView) {
      setWay(index);
      if (Platform.OS === "android") {
        this.swiper.scrollView.setPage(index);
      } else {
        this.swiper.scrollView.scrollTo({ x: this.swiper.state.width * index });
      }
    }
  };

  const pushFollowButton = async () => {
    try {
      if (isFollowing) {
        const {
          data: { unfollow }
        } = await unfollowMutation();

        setIsFollowing(false);
      } else {
        const {
          data: { follow }
        } = await followMutation();

        setIsFollowing(true);
      }
    } catch (e) {
    } finally {
    }
  };

  return (
    <FullContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <ScreenContainer>
        {userResult.loading ||
        lifePostResult.loading ||
        postResult.loading ||
        !initial ? (
          <Loader />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            contentContainerStyle={{
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <ProfileContainer>
              {isBackground ? (
                <ProfileImage
                  source={{ uri: userResult.data.seeUser.background }}
                />
              ) : null}
              <ProfileCover />
              <HeaderBase
                isleftBackButton={true}
                isleftBackButtonColor={"white"}
              />
              {userResult.data.seeUser.isSelf ? null : (
                <ButtonContainer>
                  <Touchable onPress={pushFollowButton}>
                    <FollowButtonContainer following={isFollowing}>
                      <FollowButtonText following={isFollowing}>
                        Follow
                      </FollowButtonText>
                    </FollowButtonContainer>
                  </Touchable>

                  <Touchable>
                    <MessageButtonContainer>
                      <MessageButtonText
                        source={require("../../../../assets/iconmonstr-speech-bubble-black.png")}
                      />
                    </MessageButtonContainer>
                  </Touchable>
                </ButtonContainer>
              )}
              <ProfileTopContainer>
                <InnerTopContainer>
                  <UserContainer>
                    {isAvatar ? (
                      <UserImage
                        source={{ uri: userResult.data.seeUser.avatar }}
                      />
                    ) : null}
                  </UserContainer>
                </InnerTopContainer>
                <InnerBottomContainer>
                  <Text size={18} type={"Bold"}>
                    {userResult.data.seeUser.username}
                  </Text>
                  {userResult.data.seeUser.favorites.map((value, index) => (
                    <Text key={value.id} size={14} type={"Light"}>
                      {value.name}
                    </Text>
                  ))}
                </InnerBottomContainer>
              </ProfileTopContainer>
              <ProfileBottomContainer>
                <Touchable
                  onPress={() =>
                    navigation.push("Follow", {
                      userId: userId,
                      whichOption: 0
                    })
                  }
                >
                  <IconContainer>
                    <Text size={14} type={"Bold"}>
                      {userResult.data.seeUser.followersCount}
                    </Text>
                    <Text size={14} type={"Light"}>
                      followers
                    </Text>
                  </IconContainer>
                </Touchable>
                <Touchable
                  onPress={() =>
                    navigation.push("Follow", {
                      userId: userId,
                      whichOption: 1
                    })
                  }
                >
                  <IconContainer>
                    <Text size={14} type={"Bold"}>
                      {userResult.data.seeUser.followingCount}
                    </Text>
                    <Text size={14} type={"Light"}>
                      following
                    </Text>
                  </IconContainer>
                </Touchable>
                <IconContainer>
                  <Text size={14} type={"Bold"}>
                    {userResult.data.seeUser.postsCount}
                  </Text>
                  <Text size={14} type={"Light"}>
                    posts
                  </Text>
                </IconContainer>
              </ProfileBottomContainer>
            </ProfileContainer>
            {isBio ? (
              <BioContainer>
                <Text size={14} type={"Light"} bgColor={styles.blackColor}>
                  {userResult.data.seeUser.bio}
                </Text>
              </BioContainer>
            ) : (
              <View style={{ height: 10 }} />
            )}
            <OptionBarContainer>
              <Touchable
                onPress={() => {
                  scrollToIndex(0);
                }}
              >
                <OptionBarItemContainer>
                  <OptionBarItemText bgColor={way === 0 ? true : false}>
                    일상
                  </OptionBarItemText>
                </OptionBarItemContainer>
              </Touchable>
              <Touchable
                onPress={() => {
                  scrollToIndex(1);
                }}
              >
                <OptionBarItemContainer>
                  <OptionBarItemText bgColor={way === 1 ? true : false}>
                    굿즈
                  </OptionBarItemText>
                </OptionBarItemContainer>
              </Touchable>
            </OptionBarContainer>
            <BottomContainer scHeight={baseSize.height - styles.headerHeight}>
              <Swiper
                ref={swiper => {
                  this.swiper = swiper;
                }}
                showsButtons={false}
                loop={false}
                showsPagination={false}
                onIndexChanged={index => setWay(index)}
              >
                <ScrollView
                  bounces={false}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                >
                  <BottomPostContainer>
                    {lifePostResult.data.seeLifePostFromUser.map(value => (
                      <Touchable
                        key={value.id}
                        onPress={() => navigation.push("LifePost")}
                      >
                        <BottomLifePostImage source={{ uri: value.files[0] }} />
                      </Touchable>
                    ))}
                  </BottomPostContainer>
                </ScrollView>
                <ScrollView
                  bounces={false}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                >
                  <BottomPostContainer>
                    {postResult.data.seePostListFromUser.map(value => (
                      <PostItem
                        key={value.id}
                        post={value}
                        onPress={() => {
                          navigation.push("Post", {
                            postId: value.id,
                            postTitle: value.title
                          });
                        }}
                      />
                    ))}
                  </BottomPostContainer>
                </ScrollView>
              </Swiper>
            </BottomContainer>
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
