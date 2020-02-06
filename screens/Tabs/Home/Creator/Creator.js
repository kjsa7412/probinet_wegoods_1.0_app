/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../../../../components/Loader";
import styles from "../../../../styles";
import CreatorCardItem from "../../../../components/Item/CreatorCardItem";
import HeaderBase from "../../../../components/Header/HeaderBase";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";

/// ----------
/// Graphql
export const SEE_CREATOR_CARD = gql`
  query search($loadNumber: Int, $creatorId: [String!]) {
    seeCreatorCardList(loadNumber: $loadNumber, creatorId: $creatorId) {
      id
      user {
        id
        username
        avatar
        posts {
          id
          files
        }
      }
      rank
    }
  }
`;

/// ----------
/// Styled Components

///
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

const CreatorContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 15;
  margin-bottom: 25;
`;

/// ----------
let storagedCreatorId = [];

export default ({ navigation }) => {
  /// ----------
  /// Init
  const [refreshing, setRefreshing] = useState(false);
  const [shouldFetch, setShouldFetching] = useState(false);

  /// ----------
  /// Load Data
  let downCreatorResult = useQuery(SEE_CREATOR_CARD, {
    variables: { loadNumber: 3 },
    fetchPolicy: "network-only"
  });

  let upCreatorResult = useQuery(SEE_CREATOR_CARD, {
    variables: { loadNumber: 3, creatorId: storagedCreatorId },
    skip: !shouldFetch
  });

  /// ----------
  /// Function
  const refresh = async () => {
    try {
      setRefreshing(true);
      await downCreatorResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  // 데이터 중복 제거를 위한 Id 저장
  if (!downCreatorResult.loading) {
    storagedCreatorId = [];
    downCreatorResult.data.seeCreatorCardList.map(Creator =>
      storagedCreatorId.push(Creator.id)
    );
  }

  // 새로운 데이터 저장
  if (upCreatorResult.data !== undefined) {
    downCreatorResult.data.seeCreatorCardList = downCreatorResult.data.seeCreatorCardList.concat(
      upCreatorResult.data.seeCreatorCardList
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

  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase isleftBackButton={true} centerTitle={"Creator"} />
        {downCreatorResult.loading ? (
          <Loader />
        ) : (
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent) && !shouldFetch) {
                setShouldFetching(true);
              }
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            {downCreatorResult.data.seeCreatorCardList.map(Creator => (
              <CreatorContainer key={Creator.id}>
                <CreatorCardItem
                  userId={Creator.user.id}
                  avatar={Creator.user.avatar}
                  username={Creator.user.username}
                  posts={Creator.user.posts}
                  onPress={() =>
                    navigation.push("UserProfile", {
                      userId: Creator.user.id
                    })
                  }
                />
              </CreatorContainer>
            ))}
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
