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
import { SEE_GATHERING } from "./GroupQueries";
import GatheringItem from "../../../../components/Item/GatheringItem";

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

const GatheringContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200;
`;

/// ----------
let gatheringId = [];

/// ----------
export default ({ navigation }) => {
  /// ----------
  /// Init
  const [gatheringRefreshing, setGatheringRefreshing] = useState(false);
  const [gatheringFethcing, setGatheringFethcing] = useState(false);

  /// ----------
  /// Load Data
  let downGatheringResult = useQuery(SEE_GATHERING, {
    variables: { loadNumber: 7 }
  });

  let upGatheringResult = useQuery(SEE_GATHERING, {
    variables: { loadNumber: 7, id: gatheringId },
    skip: !gatheringFethcing
  });

  /// ----------
  /// Function
  const gatheringRefresh = async () => {
    try {
      setGatheringRefreshing(true);
      await downGatheringResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setGatheringRefreshing(false);
    }
  };

  if (!downGatheringResult.loading) {
    gatheringId = [];
    downGatheringResult.data.seeRandomGathering.map(value =>
      gatheringId.push(value.id)
    );
  }

  if (upGatheringResult.data !== undefined) {
    downGatheringResult.data.seeRandomGathering = downGatheringResult.data.seeRandomGathering.concat(
      upGatheringResult.data.seeRandomGathering
    );
    setGatheringFethcing(false);
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
          centerTitle={"Group"}
          isInputBox={false}
          rightButton={HeaderRightStyles.ADD}
          rightButtonLink={() => navigation.push("AddGroup")}
        />

        {downGatheringResult.loading ? (
          <Loader />
        ) : (
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent) && !gatheringFethcing) {
                setGatheringFethcing(true);
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={gatheringRefreshing}
                onRefresh={gatheringRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            {downGatheringResult.data.seeRandomGathering.map(value => (
              <GatheringContainer key={value.id}>
                <GatheringItem
                  onPress={() =>
                    navigation.push("JoinGroup", { groupId: value.id })
                  }
                  id={value.id}
                  file={value.file}
                  title={value.title}
                  subTitle={value.subTitle}
                />
              </GatheringContainer>
            ))}
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
