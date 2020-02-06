import React, { useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import Loader from "../../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import ExplainTitle from "../../../components/Title/ExplainTitle";
import PostSmall from "../../../components/Item/Post/PostSmall";
import MyFilterItemInGoods from "../../../components/Item/Filter/MyFilterItemInGoods";
import PostItem from "../../../components/Item/Post/PostItem";
import {
  SEE_INTEREST,
  SEE_MY_FILTER_LIST,
  GET_POST_ID,
  SEE_POST_LIST
} from "./GoodsQueries";
import constants from "../../../constants";
import styles from "../../../styles";
import action from "../../../action";
import SmallOptionBar from "../../../components/Item/OptionBar/SmallOptionBar";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  align-items: center;
  flex-wrap: wrap;
`;

const Container = styled.View`
  width: ${constants.width};
  flex-direction: column;
  align-items: center;
`;

const ScrollViewContainer = styled.View`
  width: ${styles.baseWidth};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
`;

const MarketContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 14;
  padding-right: 14;
  margin-top: 14;
  width: ${styles.baseWidth};
`;

// ordering 되서 가져온 전체 id list
let orderAllPostList = [];

// load 할 id List
let firstLoadPostIdList = [];
let loadPostIdList = [];
let loadCount = 0;

const firstLoadNumber = 4;
const loadNumber = 2;

export default ({ navigation }) => {
  /// ---------------
  /// Init
  const [shouldFetch, setShouldFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orderByOption, setOrderByOption] = useState(action.LATEST);
  const [optionChange, setOptionChange] = useState(false);

  // // Interest
  // let interestResult = useQuery(SEE_INTEREST, {
  //   variables: { loadNumber: 30 },
  //   fetchPolicy: "network-only"
  // });

  // My Filter List
  let myfilterResult = useQuery(SEE_MY_FILTER_LIST, {
    fetchPolicy: "network-only"
  });

  // postIdList
  let postIdList = useQuery(GET_POST_ID, {
    variables: { orderby: orderByOption },
    fetchPolicy: "network-only"
  });

  // seePostList
  let downPostList = useQuery(SEE_POST_LIST, {
    variables: { postsId: firstLoadPostIdList, orderby: orderByOption },
    fetchPolicy: "network-only"
  });

  // seePostList
  let upPostList = useQuery(SEE_POST_LIST, {
    variables: { postsId: loadPostIdList, orderby: orderByOption },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });

  /// ---------------
  /// 데이터 처리
  // orderAllPostList, firstLoadPostIdList, loadPostIdList 초기화
  if (
    !postIdList.loading &&
    postIdList.data !== undefined &&
    postIdList.data !== [] &&
    (orderAllPostList.length === 0 ||
      refreshing === true ||
      optionChange === true)
  ) {
    // 데이터 초기화
    loadCount = 0;
    orderAllPostList = [];
    orderAllPostList = postIdList.data.getPostIdList;

    firstLoadPostIdList = [];
    firstLoadPostIdList = orderAllPostList.slice(0, firstLoadNumber);

    loadPostIdList = [];
    loadPostIdList = orderAllPostList.slice(
      firstLoadNumber,
      firstLoadNumber + loadNumber
    );
  }

  // 쿼리 결과가 바뀌지 않으면
  // downPostList 가 계속 남아 있어 reflash 해도 초기 load 상태가 되지 않아 넣었음
  if (
    downPostList.data !== undefined &&
    downPostList.data.seePostList.length >= firstLoadNumber &&
    (refreshing === true || optionChange === true)
  ) {
    downPostList.data.seePostList = downPostList.data.seePostList.splice(
      0,
      firstLoadNumber
    );

    optionChange ? setOptionChange(false) : null;
  }

  // scroll 했을 때 불러오는 데이터 처리
  if (
    downPostList.data !== undefined &&
    downPostList != [] &&
    !upPostList.loading &&
    upPostList.data !== undefined &&
    upPostList.data.seePostList != [] &&
    shouldFetch === true
  ) {
    loadCount++;
    loadPostIdList = [];
    loadPostIdList = orderAllPostList.slice(
      firstLoadNumber + loadCount * loadNumber,
      firstLoadNumber + (loadCount + 1) * loadNumber
    );

    downPostList.data.seePostList = downPostList.data.seePostList.concat(
      upPostList.data.seePostList
    );

    setShouldFetching(false);
  }

  /// ---------------
  /// 함수
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
      //await interestResult.refetch();
      await myfilterResult.refetch();
      await postIdList.refetch();
      await downPostList.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  /// ---------------
  return (
    <View>
      {myfilterResult.loading ? (
        <Loader />
      ) : (
        <MainContainer>
          <ScrollView
            onScroll={({ nativeEvent }) => {
              // optionChange 를 할때 loader 가 돌면서 scroll 끝으로 한것 처럼 되서.
              // shouldFetch 가 자동으로 된다. 그래서 optionChange 을 추가 했음.
              if (
                isCloseToBottom(nativeEvent) &&
                !shouldFetch &&
                !optionChange
              ) {
                setShouldFetching(true);
              }
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
          >
            <Container>
              {/* <ExplainTitle
                onPress={() => navigation.navigate("Interest")}
                text="Interest"
                explainText="인기 크리에이터들의 게시물을 만나보세요."
              />
              <ScrollViewContainer>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {interestResult.data.seeInterest.map(post => (
                    <PostSmall key={post.id} postUri={post.files[0]} />
                  ))}
                </ScrollView>
              </ScrollViewContainer> */}

              <ExplainTitle
                onPress={() => navigation.navigate("MyFilter")}
                text="My Filter"
                explainText="내가 설정한 필터의 목록으로 선택하여 상세 게시물을 볼 수 있습니다."
              />

              <ScrollViewContainer marginBottom={16}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {myfilterResult.data.seeMyFilterList.map(myfilter => (
                    <MyFilterItemInGoods
                      key={myfilter.id}
                      myFilterImageUri={myfilter.file}
                      title={myfilter.title}
                      condition={action.NEW}
                      conditionMessage={null}
                    />
                  ))}
                </ScrollView>
              </ScrollViewContainer>
              <SmallOptionBar
                orderByOption={[
                  { text: "최신순", optionKey: action.LATEST },
                  { text: "인기순", optionKey: action.POPULAR },
                  { text: "높은가격순", optionKey: action.HIGH_PRICE },
                  { text: "낮은가격순", optionKey: action.LOW_PRICE }
                ]}
                currentOptionKey={orderByOption}
                orderByOptionSetFunc={setOrderByOption}
                changeStateFunc={setOptionChange}
                touchableStatus={
                  postIdList.loading ||
                  downPostList.loading ||
                  optionChange ||
                  shouldFetch
                    ? false
                    : true
                }
              ></SmallOptionBar>
              <MarketContainer>
                {postIdList.loading || downPostList.loading || optionChange ? (
                  <Loader />
                ) : (
                  downPostList.data.seePostList.map(function(value) {
                    return (
                      <PostItem
                        // Map으로 Component 생성 시 Key는 여기에 할당하자
                        // PostItem 내부에 Key를 할당해봤자 인식하지 못함
                        key={value.id}
                        post={value}
                      />
                    );
                  })
                )}
              </MarketContainer>
            </Container>
          </ScrollView>
        </MainContainer>
      )}
    </View>
  );
};
