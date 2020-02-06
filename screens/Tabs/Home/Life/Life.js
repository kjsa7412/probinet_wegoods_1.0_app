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
import { SEE_RANDOM_LIFEPOST } from "./LifeQueries";

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

const LifePostContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 14;
  padding-right: 14;
  margin-top: 14;
`;

const LifeImage = styled.Image`
  width: 167;
  height: 167;
  margin-bottom: 14;
`;

/// ----------
let lifePostId = [];

/// ----------
export default ({ navigation }) => {
  /// ----------
  /// Init
  const [lifePostRefreshing, setLifePostRefreshing] = useState(false);
  const [lifePostFethcing, setLifePostFethcing] = useState(false);

  /// ----------
  /// Load Data
  let downLifePostResult = useQuery(SEE_RANDOM_LIFEPOST, {
    variables: { loadNumber: 7 }
  });

  let upLifePostResult = useQuery(SEE_RANDOM_LIFEPOST, {
    variables: { loadNumber: 7, id: lifePostId },
    skip: !lifePostFethcing
  });

  /// ----------
  /// Function

  const lifePostRefresh = async () => {
    try {
      setLifePostRefreshing(true);
      await downLifePostResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setLifePostRefreshing(false);
    }
  };

  if (!downLifePostResult.loading) {
    lifePostId = [];
    downLifePostResult.data.seeRandomLifePost.map(value =>
      lifePostId.push(value.id)
    );
  }

  if (upLifePostResult.data !== undefined) {
    downLifePostResult.data.seeRandomLifePost = downLifePostResult.data.seeRandomLifePost.concat(
      upLifePostResult.data.seeRandomLifePost
    );
    setLifePostFethcing(false);
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
        <HeaderBase
          isleftBackButton={true}
          centerTitle={"Life"}
          isInputBox={false}
          rightButton={HeaderRightStyles.ADD}
          rightButtonLink={() => navigation.push("AddLife")}
        />
        {downLifePostResult.loading ? (
          <Loader />
        ) : (
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent) && !lifePostFethcing) {
                setLifePostFethcing(true);
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={lifePostRefreshing}
                onRefresh={lifePostRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <LifePostContainer>
              {downLifePostResult.data.seeRandomLifePost.map(value => (
                <Touchable
                  key={value.id}
                  onPress={() => navigation.push("LifePost")}
                >
                  <LifeImage source={{ uri: value.files[0] }} />
                </Touchable>
              ))}
            </LifePostContainer>
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
