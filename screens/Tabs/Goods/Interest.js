import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderBase from "../../../components/Header/HeaderBase";
import Loader from "../../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";
import PostItem from "../../../components/Item/Post/PostItem";

import { SEE_INTEREST } from "./GoodsQueries";

import constants from "../../../constants";
import styles from "../../../styles";

const MainContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const Container = styled.View`
  width: ${constants.width};
  align-items: center;
`;

const InterestContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: ${styles.baseWidth};
  margin-top: 15;
`;

let storagedPostsId = [];

export default ({ navigation }) => {
  const [shouldFetch, setShouldFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        centerTitle={"Interest"}
        isInputBox={false}
      />

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
        >
          <Container>
            <InterestContainer>
              {downInterestResult.data.seeInterest.map(function(value, index) {
                return (
                  <PostItem
                    // Map으로 Component 생성 시 Key는 여기에 할당하자
                    // PostItem 내부에 Key를 할당해봤자 인식하지 못함
                    key={value.id}
                    post={value}
                    index={index}
                  />
                );
              })}
            </InterestContainer>
          </Container>
        </ScrollView>
      )}
    </MainContainer>
  );
};
