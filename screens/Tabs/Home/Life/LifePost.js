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

/// ----------
import { SEE_RELATED_LIFEPOST } from "./LifeQueries";
import LifePostItem from "../../../../components/Item/LifePostItem";

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

const LifePostContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15;
  margin-bottom: 15;
`;

/// ----------
let storagedId = [];

/// ----------
export default ({ navigation }) => {
  /// ----------
  const [shouldFetch, setShouldFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  /// ----------
  let downLifePostResult = useQuery(SEE_RELATED_LIFEPOST, {
    variables: { loadNumber: 4 }
  });

  let upLifePostResult = useQuery(SEE_RELATED_LIFEPOST, {
    variables: { loadNumber: 4, id: storagedId },
    skip: !shouldFetch
  });

  /// ----------

  if (!downLifePostResult.loading) {
    storagedId = [];
    downLifePostResult.data.seeRelatedLifePost.map(value =>
      storagedId.push(value.id)
    );
  }

  if (upLifePostResult.data !== undefined) {
    downLifePostResult.data.seeRelatedLifePost = downLifePostResult.data.seeRelatedLifePost.concat(
      upLifePostResult.data.seeRelatedLifePost
    );
    setShouldFetching(false);
  }

  /// ----------
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

  const refresh = async () => {
    try {
      setRefreshing(true);
      await downLifePostResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase
          isleftBackButton={true}
          centerTitle={"Life"}
          isInputBox={false}
        />
        {downLifePostResult.loading ? (
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
            {downLifePostResult.data.seeRelatedLifePost.map(value => (
              <LifePostContainer key={value.id}>
                <LifePostItem
                  navigation={navigation}
                  postId={value.id}
                  postFiles={value.files}
                  postTitle={value.title}
                  userId={value.user.id}
                  userAvatar={value.user.avatar}
                  username={value.user.username}
                  created={value.createdAt}
                  updated={value.updatedAt}
                  likeCount={value.likeCount}
                  commentCount={value.commentCount}
                />
              </LifePostContainer>
            ))}
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
