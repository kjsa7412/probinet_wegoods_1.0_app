/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { Platform, View, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../../../../components/Loader";
import styles from "../../../../styles";
import constants from "../../../../constants";
import HeaderBase from "../../../../components/Header/HeaderBase";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";

///
import PostItem from "../../../../components/Item/Post/PostItem";

/// ----------
/// Graphql
export const SEE_MARKET = gql`
  query search($loadNumber: Int, $postsId: [String!], $location: String) {
    seeMarketListLocation(
      loadNumber: $loadNumber
      postsId: $postsId
      location: $location
    ) {
      id
      files
      title
      type
      numberOfParticipants
      participantsCount
    }
  }
`;

export const SEE_MYLOCATION = gql`
  {
    seeMyLocation {
      id
      num
      text
    }
  }
`;

/// ----------
/// Styled Components

/// ----------
const Touchable = styled.TouchableOpacity``;

///
const FullContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
  background-color: ${styles.containerTestColor};
`;

const ScreenContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${styles.baseWidth};
  height: 100%;
`;

const MarketContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 14;
  padding-right: 14;
  margin-top: 14;
`;

///
const LocationContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%
  height: 45;
  background-color: ${props => props.theme.whiteColor};
`;

const LocationText = styled.Text`
  color: black;
  text-align: center;
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-right: 5;
`;

/// ----------
let storagedId = [];

export default ({ navigation }) => {
  /// ----------
  /// Init
  const [refreshing, setRefreshing] = useState(false);
  const [shouldFetching, setShouldFetching] = useState(false);
  const [reloading, setReloading] = useState(false);

  const [locationId, setLocationId] = useState("");
  const [locationTitle, setLocationTitle] = useState("");

  /// ----------
  /// Load Data
  let myLocationResult = useQuery(SEE_MYLOCATION, {
    fetchPolicy: "network-only"
  });

  let downMarketResult = useQuery(SEE_MARKET, {
    variables: { loadNumber: 5, location: locationId },
    fetchPolicy: "network-only"
  });

  let upMarketResult = useQuery(SEE_MARKET, {
    variables: {
      loadNumber: 5,
      location: locationId,
      postsId: storagedId
    },
    skip: !shouldFetching
  });

  /// ----------
  /// Function
  const refresh = async () => {
    try {
      setRefreshing(true);
      await downMarketResult.refetch();
      await myLocationResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  updateLocation = async (id = "", text = "", navigation) => {
    try {
      setReloading(true);
      navigation.goBack();
      locationId === id ? await downMarketResult.refetch() : setLocationId(id);
      locationTitle === text
        ? await myLocationResult.refetch()
        : setLocationTitle(text);
    } catch (e) {
      console.log(e);
    } finally {
      setReloading(false);
    }
  };

  updateMyLocation = async navigation => {
    try {
      setReloading(true);
      navigation.goBack();
      locationId === "" ? await downMarketResult.refetch() : setLocationId("");
      locationTitle === ""
        ? await myLocationResult.refetch()
        : setLocationTitle("");
    } catch (e) {
      console.log(e);
    } finally {
      setReloading(false);
    }
  };

  // 데이터 중복 제거를 위한 Id 저장
  if (!downMarketResult.loading) {
    storagedId = [];
    downMarketResult.data.seeMarketListLocation.map(value =>
      storagedId.push(value.id)
    );
  }

  // 새로운 데이터 저장
  if (upMarketResult.data !== undefined) {
    downMarketResult.data.seeMarketListLocation = downMarketResult.data.seeMarketListLocation.concat(
      upMarketResult.data.seeMarketListLocation
    );
    setShouldFetching(false);
  }

  // 페이지 마지막까지 스크롤을 했는지 확인
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }) => {
    const paddingToBottom = 1;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  /// ----------
  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase isleftBackButton={true} centerTitle={"Market"} />
        {downMarketResult.loading || myLocationResult.loading || reloading ? (
          <Loader />
        ) : (
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent) && !shouldFetching) {
                setShouldFetching(true);
              }
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <Touchable
              onPress={() =>
                navigation.push("LocationSearch", {
                  updateLocation: this.updateLocation,
                  updateMyLocation: this.updateMyLocation
                })
              }
            >
              <LocationContainer>
                <LocationText>
                  {locationTitle !== ""
                    ? locationTitle
                    : myLocationResult.data.seeMyLocation.length !== 0
                    ? myLocationResult.data.seeMyLocation[0].text
                    : "모든 지역"}
                </LocationText>
                <Ionicons
                  name={
                    Platform.OS === "ios"
                      ? "ios-arrow-down"
                      : "md-arrow-dropdown"
                  }
                  color={styles.blackColor}
                  size={15}
                />
              </LocationContainer>
            </Touchable>
            <MarketContainer>
              {downMarketResult.data.seeMarketListLocation.map(value => (
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
            </MarketContainer>
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
