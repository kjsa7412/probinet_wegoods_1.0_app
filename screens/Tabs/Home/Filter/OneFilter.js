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
import RegisterFilterButton from "../../../../components/Button/RegisterFilterButton";
import SmallOptionBar from "../../../../components/Item/OptionBar/SmallOptionBar";
import PostItem from "../../../../components/Item/Post/PostItem";

/// ----------
/// Graphql
export const SEE_FILTER = gql`
  query search($id: String!) {
    seeOneFilter(id: $id) {
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

export const SEE_FILTER_POST = gql`
  query search($filterId: String, $loadNumber: Int, $postsId: [String!]) {
    seeFilterPost(
      filterId: $filterId
      loadNumber: $loadNumber
      postsId: $postsId
    ) {
      id
      files
      title
      type
      price
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
  background-color: ${styles.containerTestColor};
`;

const ScreenContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${styles.baseWidth};
  height: 100%;
`;

///
const FilterContainer = styled.View`
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%
height: 200;
`;

const ButtonContainer = styled.View`
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%
height: 80;
`;

const PostContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 14;
  padding-right: 14;
  margin-top: 14;
`;

/// ----------
let storagedId = [];

export default ({ navigation }) => {
  /// ----------
  /// Init
  const [refreshing, setRefreshing] = useState(false);
  const [shouldFetch, setShouldFetching] = useState(false);
  const filterId = navigation.getParam("filterId");

  /// ----------
  /// Load Data
  let filterResult = useQuery(SEE_FILTER, {
    variables: { id: filterId },
    fetchPolicy: "network-only"
  });

  let downPostResult = useQuery(SEE_FILTER_POST, {
    variables: { filterId: filterId, loadNumber: 4 },
    fetchPolicy: "network-only"
  });

  let upPostResult = useQuery(SEE_FILTER_POST, {
    variables: { filterId: filterId, loadNumber: 4, postsId: storagedId },
    skip: !shouldFetch
  });

  /// ----------
  /// Function
  const refresh = async () => {
    try {
      setRefreshing(true);
      await filterResult.refetch();
      await downPostResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  // 데이터 중복 제거를 위한 Id 저장
  if (!downPostResult.loading) {
    storagedId = [];
    downPostResult.data.seeFilterPost.map(Post => storagedId.push(Post.id));
  }

  // 새로운 데이터 저장
  if (upPostResult.data !== undefined) {
    downPostResult.data.seeFilterPost = downPostResult.data.seeFilterPost.concat(
      upPostResult.data.seeFilterPost
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
        {filterResult.loading || downPostResult.loading ? (
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
            <FilterContainer>
              <FilterCardItem
                posts={filterResult.data.seeOneFilter.postFilter}
                artist={filterResult.data.seeOneFilter.artist}
                type={filterResult.data.seeOneFilter.postType}
                kind={filterResult.data.seeOneFilter.kind}
                location={filterResult.data.seeOneFilter.location}
                keyword={filterResult.data.seeOneFilter.keyword}
              />
            </FilterContainer>
            <ButtonContainer>
              <RegisterFilterButton
                text={"내 필터로 등록하기"}
                loading={false}
                bgColor={styles.weGoodsColor}
                onPress={() => {}}
              />
            </ButtonContainer>
            <SmallOptionBar
              orderByOption={[
                { text: "최신순" },
                { text: "인기순" },
                { text: "높은가격순" },
                { text: "낮은가격순" }
              ]}
            />
            <PostContainer>
              {downPostResult.data.seeFilterPost.map((value, index) => (
                <PostItem
                  key={value.id}
                  post={value}
                  index={index}
                  onPress={() => {
                    navigation.push("Post", {
                      postId: value.id,
                      postTitle: value.title
                    });
                  }}
                />
              ))}
            </PostContainer>
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
