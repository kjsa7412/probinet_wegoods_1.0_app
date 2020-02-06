/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, Platform } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../../../components/Loader";
import styles from "../../../styles";
import constants from "../../../constants";
import Swiper from "react-native-swiper";
import HeaderBase from "../../../components/Header/HeaderBase";
import HeaderRightStyles from "../../../components/Header/HeaderRight/HeaderRightStyles";

/// Graphql
import { SEE_ME, SEE_POST, SEE_INPOST, SEE_LIFEPOST } from "./ProfileQueries";
import PostItem from "../../../components/Item/Post/PostItem";

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
  Text
} from "./ProfileComponent";

/// ----------
export default ({ navigation }) => {
  /// ----------
  /// Init
  const [shouldFetch, setShouldFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [way, setWay] = useState(0);

  /// ----------
  /// Load Data
  let meResult = useQuery(SEE_ME);
  let lifePostResult = useQuery(SEE_LIFEPOST);
  let postResult = useQuery(SEE_POST);
  let inPostResult = useQuery(SEE_INPOST);

  /// Initial Data
  const [initial, setInitial] = useState(false);

  const [isAvatar, setIsAvatar] = useState(false);
  const [isBackground, setIsBackground] = useState(false);
  const [isBio, setIsBio] = useState(false);

  if (!initial) {
    if (meResult.loading === false && meResult.data !== undefined) {
      if (meResult.data.me.avatar !== null && meResult.data.me.avatar !== "") {
        setIsAvatar(true);
      }

      if (
        meResult.data.me.background !== null &&
        meResult.data.me.background !== ""
      ) {
        setIsBackground(true);
      }

      if (meResult.data.me.bio !== null && meResult.data.me.bio !== "") {
        setIsBio(true);
      }

      setInitial(true);
    }
  }

  /// ----------
  /// Function
  const refresh = async () => {
    try {
      setRefreshing(true);
      await meResult.refetch();
      await lifePostResult.refetch();
      await postResult.refetch();
      await inPostResult.refetch();
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
      console.log(this.swiper.state.width);
    }
  };

  return (
    <FullContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <ScreenContainer>
        {meResult.loading ||
        lifePostResult.loading ||
        postResult.loading ||
        inPostResult.loading ||
        !initial ? (
          <Loader />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
            showsVerticalScrollIndicator={false}
          >
            <ProfileContainer>
              {isBackground ? (
                <ProfileImage source={{ uri: meResult.data.me.background }} />
              ) : null}
              <ProfileCover />
              <HeaderBase
                isInputBox={false}
                rightButton={HeaderRightStyles.PROFILE_SETTING}
                rightButtonLink={() => navigation.push("ProfileSetting")}
              />
              <ProfileTopContainer>
                <InnerTopContainer>
                  <Touchable onPress={() => navigation.push("Alram")}>
                    <IconContainer>
                      <IconImage
                        source={require("../../../assets/iconmonstr-bell-2-240.png")}
                      />
                      <Text size={14} type={"Bold"}>
                        {meResult.data.me.alarmsCount}
                      </Text>
                    </IconContainer>
                  </Touchable>
                  <UserContainer>
                    {isAvatar ? (
                      <UserImage source={{ uri: meResult.data.me.avatar }} />
                    ) : null}
                  </UserContainer>
                  <Touchable onPress={() => navigation.push("MyMessage")}>
                    <IconContainer>
                      <IconImage
                        source={require("../../../assets/iconmonstr-speech-bubble-8-240.png")}
                      />
                      <Text size={14} type={"Bold"}>
                        100
                      </Text>
                    </IconContainer>
                  </Touchable>
                </InnerTopContainer>
                <InnerBottomContainer>
                  <Text size={18} type={"Bold"}>
                    {meResult.data.me.username}
                  </Text>
                  {meResult.data.me.favorites.map((value, index) => (
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
                      userId: meResult.data.me.id,
                      whichOption: 0
                    })
                  }
                >
                  <IconContainer>
                    <Text size={14} type={"Bold"}>
                      {meResult.data.me.followersCount}
                    </Text>
                    <Text size={14} type={"Light"}>
                      followers
                    </Text>
                  </IconContainer>
                </Touchable>
                <Touchable
                  onPress={() =>
                    navigation.push("Follow", {
                      userId: meResult.data.me.id,
                      whichOption: 1
                    })
                  }
                >
                  <IconContainer>
                    <Text size={14} type={"Bold"}>
                      {meResult.data.me.followingCount}
                    </Text>
                    <Text size={14} type={"Light"}>
                      following
                    </Text>
                  </IconContainer>
                </Touchable>
                <Touchable>
                  <IconContainer>
                    <Text size={14} type={"Bold"}>
                      {meResult.data.me.postsCount}
                    </Text>
                    <Text size={14} type={"Light"}>
                      posts
                    </Text>
                  </IconContainer>
                </Touchable>
              </ProfileBottomContainer>
            </ProfileContainer>
            {isBio ? (
              <BioContainer>
                <Text size={14} type={"Light"} bgColor={styles.blackColor}>
                  {meResult.data.me.bio}
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
              <Touchable
                onPress={() => {
                  scrollToIndex(2);
                }}
              >
                <OptionBarItemContainer>
                  <OptionBarItemText bgColor={way === 2 ? true : false}>
                    참여
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
                    {lifePostResult.data.seeMyLifePostList.map(value => (
                      <Touchable key={value.id}>
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
                    {postResult.data.seeMyPostList.map(value => (
                      <PostItem key={value.id} post={value} />
                    ))}
                  </BottomPostContainer>
                </ScrollView>
                <ScrollView
                  bounces={false}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                >
                  <BottomPostContainer>
                    {inPostResult.data.seeMyInPostList.map(value => (
                      <PostItem key={value.id} post={value} />
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
