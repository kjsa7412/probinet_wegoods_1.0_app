/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../../../../components/Loader";
import styles from "../../../../styles";
import constants from "../../../../constants";
import HeaderBase from "../../../../components/Header/HeaderBase";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";

///
import PostItem from "../../../../components/Item/Post/PostItem";

/// ----------
/// Graphql
export const SEE_INTEREST = gql`
  query seeInterest($loadNumber: Int, $postsId: [String!]) {
    seeInterest(loadNumber: $loadNumber, postsId: $postsId) {
      id
      files
      title
      type
      numberOfParticipants
      participantsCount
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
  background-color: #3897f0;
`;

const ScreenContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${styles.baseWidth};
  height: 100%;
`;

const InterestContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 14;
  padding-right: 14;
  margin-top: 14;
`;

/// ----------
let storagedPostsId = [];

export default ({ navigation }) => {
  /// ----------
  /// Init
  const [shouldFetch, setShouldFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  /// ----------
  /// Load Data

  // Interest - refresh
  let downInterestResult = useQuery(SEE_INTEREST, {
    variables: { loadNumber: 6 },
    fetchPolicy: "network-only"
  });

  // Interest - More Data
  let upInterestResult = useQuery(SEE_INTEREST, {
    variables: { loadNumber: 6, postsId: storagedPostsId },
    skip: !shouldFetch
  });

  /// ----------
  /// Function

  // 데이터 중복 제거를 위한 Id 저장
  if (!downInterestResult.loading) {
    storagedPostsId = [];
    downInterestResult.data.seeInterest.map(Post =>
      storagedPostsId.push(Post.id)
    );
  }

  // 새로운 데이터 저장
  if (upInterestResult.data !== undefined) {
    downInterestResult.data.seeInterest = downInterestResult.data.seeInterest.concat(
      upInterestResult.data.seeInterest
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

  // Scroll Down : 전체 데이터 다시 받아오기
  const refresh = async () => {
    try {
      setRefreshing(true);
      await downInterestResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  /// ----------
  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase isleftBackButton={true} centerTitle={"Interest"} />
        {downInterestResult.loading ? (
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
            <InterestContainer>
              {downInterestResult.data.seeInterest.map(value => (
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
            </InterestContainer>
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
