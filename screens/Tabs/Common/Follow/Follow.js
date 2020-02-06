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
import { SEE_USER, FOLLOW_USER, UNFOLLOW_USER } from "./FollowQueries";

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

/// Option
const OptionBarContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${styles.headerHeight};
`;

const OptionBarItemContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth / 2};
  height: ${styles.headerHeight};
`;

const OptionBarText = styled.Text`
  color: ${props =>
    props.bgColor === true ? props.theme.blackColor : "#CECECE"};
  text-align: center;
  font-size: 18;
  font-family: NanumBarunGothicBold;
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
  const userId = navigation.getParam("userId", "");
  const whichOption = navigation.getParam("whichOption", 0);

  const [refreshing, setRefreshing] = useState(false);
  const [way, setWay] = useState(whichOption);

  /// ----------
  /// Load Data
  let userResult = useQuery(SEE_USER, {
    variables: { userId: userId },
    fetchPolicy: "network-only"
  });

  const [followMutation] = useMutation(FOLLOW_USER);

  const [unfollowMutation] = useMutation(UNFOLLOW_USER);

  /// ----------
  /// Function
  const refresh = async () => {
    try {
      setRefreshing(true);
      await userResult.refetch();
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
        await userResult.refetch();
        console.log(unfollow);
      } else {
        const {
          data: { follow }
        } = await followMutation({
          variables: {
            userId: id
          }
        });
        await userResult.refetch();
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
        <OptionBarContainer>
          <Touchable
            onPress={() => {
              scrollToIndex(0);
            }}
          >
            <OptionBarItemContainer>
              <OptionBarText bgColor={way === 0 ? true : false}>
                follower
              </OptionBarText>
            </OptionBarItemContainer>
          </Touchable>
          <Touchable
            onPress={() => {
              scrollToIndex(1);
            }}
          >
            <OptionBarItemContainer>
              <OptionBarText bgColor={way === 1 ? true : false}>
                following
              </OptionBarText>
            </OptionBarItemContainer>
          </Touchable>
        </OptionBarContainer>
        {userResult.loading ? (
          <Loader />
        ) : (
          <BottomContainer>
            <Swiper
              ref={swiper => {
                this.swiper = swiper;
              }}
              showsButtons={false}
              loop={false}
              showsPagination={false}
              index={way}
              onIndexChanged={index => setWay(index)}
            >
              <ScrollView
                bounces={false}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
              >
                <UserContainer>
                  {userResult.data.seeUser.followers.map(value => (
                    <UserItemContainer key={value.id}>
                      <UserItem
                        avatarUri={value.avatar}
                        username={value.username}
                        onPress={() =>
                          navigation.push("UserProfile", {
                            userId: value.id
                          })
                        }
                      />
                      {value.isSelf ? null : (
                        <FollowButton
                          onPress={() => {
                            pushFollowButton(value.id, value.isFollowing);
                          }}
                          following={value.isFollowing}
                        >
                          <FollowText following={value.isFollowing}>
                            Follow
                          </FollowText>
                        </FollowButton>
                      )}
                    </UserItemContainer>
                  ))}
                </UserContainer>
              </ScrollView>
              <ScrollView
                bounces={false}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
              >
                <UserContainer>
                  {userResult.data.seeUser.following.map(value => (
                    <UserItemContainer key={value.id}>
                      <UserItem
                        avatarUri={value.avatar}
                        username={value.username}
                        onPress={() =>
                          navigation.push("UserProfile", {
                            userId: value.id
                          })
                        }
                      />

                      {value.isSelf ? null : (
                        <FollowButton
                          onPress={() => {
                            pushFollowButton(value.id, value.isFollowing);
                          }}
                          following={value.isFollowing}
                        >
                          <FollowText following={value.isFollowing}>
                            Follow
                          </FollowText>
                        </FollowButton>
                      )}
                    </UserItemContainer>
                  ))}
                </UserContainer>
              </ScrollView>
            </Swiper>
          </BottomContainer>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
