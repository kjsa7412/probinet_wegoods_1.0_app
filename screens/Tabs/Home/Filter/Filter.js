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
import FilterCardItem from "../../../../components/Item/FilterCardItem";

/// ----------
/// Graphql
export const SEE_FILTER = gql`
  query search($loadNumber: Int, $onFilterIndex: [Int!]) {
    seePopularFilterList(
      loadNumber: $loadNumber
      onFilterIndex: $onFilterIndex
    ) {
      id
      postFilter {
        id
        files
      }
      artist {
        id
        name
        activeType
      }
      postType
      kind {
        id
        text
      }
      keyword {
        id
        text
      }
      location {
        id
        text
      }
      filterIndex
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

const FilterContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200;
`;

/// ----------
let storagedId = [];

export default ({ navigation }) => {
  /// ----------
  /// Init
  const [refreshing, setRefreshing] = useState(false);
  const [shouldFetch, setShouldFetching] = useState(false);

  /// ----------
  /// Load Data
  let downFilterResult = useQuery(SEE_FILTER, {
    variables: { loadNumber: 4 },
    fetchPolicy: "network-only"
  });

  let upFilterResult = useQuery(SEE_FILTER, {
    variables: { loadNumber: 4, onFilterIndex: storagedId },
    skip: !shouldFetch
  });

  /// ----------
  /// Function
  const refresh = async () => {
    try {
      setRefreshing(true);
      await downFilterResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  // 데이터 중복 제거를 위한 Id 저장
  if (!downFilterResult.loading) {
    storagedId = [];
    downFilterResult.data.seePopularFilterList.map(Filter =>
      storagedId.push(Filter.filterIndex)
    );
  }

  // 새로운 데이터 저장
  if (upFilterResult.data !== undefined) {
    downFilterResult.data.seePopularFilterList = downFilterResult.data.seePopularFilterList.concat(
      upFilterResult.data.seePopularFilterList
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
        <HeaderBase isleftBackButton={true} centerTitle={"Filter"} />
        {downFilterResult.loading ? (
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
            {downFilterResult.data.seePopularFilterList.map(value => (
              <FilterContainer key={value.id}>
                <FilterCardItem
                  onPress={() =>
                    navigation.push("OneFilter", {
                      filterId: value.id
                    })
                  }
                  posts={value.postFilter}
                  artist={value.artist}
                  type={value.postType}
                  kind={value.kind}
                  location={value.location}
                  keyword={value.keyword}
                />
              </FilterContainer>
            ))}
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
