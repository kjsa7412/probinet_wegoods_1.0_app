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

/// Component
import {
  Touchable,
  CreatedDateContainer,
  CreatedDateText,
  TitleContainer,
  TitleText,
  ParticipantsContainer,
  ParticipantsText1,
  ParticipantsText2,
  WantContainer,
  WantText,
  CountContainer,
  CountText,
  FilterContainer,
  FilterTitleText,
  FilterContentText,
  WantFilterContentText,
  SomethingButton,
  SomethingText,
  PostContainer,
  LifeImage,
  UserContainer,
  UserItemContainer,
  BottomContainer
} from "./PostComponent";

import LifePostItem from "../../../../components/Item/LifePostItem";
import UserItem from "../../../../components/Item/UserItem";
import CommentItem from "../../../../components/Item/CommentItem";

/// Graphql
import { SEE_POST } from "./PostQueries";

/// ----------
/// Styled Components

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
  justify-content: flex-end;
  background-color: ${styles.redColor};
`;

/// ----------

let isPrice = false;
let isWant = false;
let isParticipation = false;
let isMiniPost = false;
let isComment = false;

let isPay = false;
let isApply = false;
let isJoin = false;

let isAuth = false;
let isQuiz = false;

let tradeType = "";

let artistOfPostFilter = "";
let kindOfPostFilter = "";
let keywordOfPostFilter = "";
let locationOfPostFilter = "";

let artistOfWantFilter = "";
let kindOfWantFilter = "";
let keywordOfWantFilter = "";
let locationOfWantFilter = "";

/// ----------
export default ({ navigation }) => {
  /// ----------
  /// Init
  const postId = navigation.getParam("postId", "");
  const postTitle = navigation.getParam("postTitle", "");

  /// ----------
  /// Load Data
  let postResult = useQuery(SEE_POST, {
    variables: { postId: postId },
    fetchPolicy: "network-only"
  });

  /// ----------
  /// Init Data

  /// Init Data - 선언
  const [initData, setInitData] = useState(false);

  if (!initData) {
    if (!postResult.loading && postResult.data !== undefined) {
      /// Init Data - 사용할 컨텐츠 체크
      switch (postResult.data.seeOnePost.type) {
        case 0:
          isPrice = true;
          isComment = true;
          isPay = true;
          break;
        case 1:
          isParticipation = true;
          isComment = true;
          isJoin = true;
          break;
        case 2:
          isWant = true;
          isMiniPost = true;
          isComment = true;
          isApply = true;
          break;
        case 3:
          isParticipation = true;
          isMiniPost = true;
          isComment = true;
          isApply = true;
          isJoin = true;
          break;
        default:
        // code block
      }

      if (postResult.data.seeOnePost.postQuiz.length !== 0) {
        isQuiz = true;
      }

      if (postResult.data.seeOnePost.varifyDesc !== null && varifyDesc !== "") {
        isAuth = true;
      }

      /// Init Data - 개발용
      isPrice = true;
      isWant = true;
      isParticipation = true;
      isMiniPost = true;
      isComment = true;
      isPay = true;
      isApply = true;
      isJoin = true;
      isAuth = true;
      isQuiz = true;

      /// Init Data - 거래유형
      switch (postResult.data.seeOnePost.tradeType) {
        case 1:
          tradeType = "배송";
          break;
        case 2:
          tradeType = "무료배송";
          break;
        case 3:
          tradeType = "직거래";
          break;
        default:
        // code block
      }

      /// Init Data - 포스트필터
      if (postResult.data.seeOnePost.postFilter !== null) {
        postResult.data.seeOnePost.postFilter.artist.map((value, index) => {
          if (index !== 0) {
            artistOfPostFilter += " ";
          }
          artistOfPostFilter += value.name;
        });

        postResult.data.seeOnePost.postFilter.kind.map((value, index) => {
          if (index !== 0) {
            kindOfPostFilter += " ";
          }
          kindOfPostFilter += value.text;
        });

        postResult.data.seeOnePost.postFilter.keyword.map((value, index) => {
          if (index !== 0) {
            keywordOfPostFilter += " ";
          }
          keywordOfPostFilter += value.text;
        });

        postResult.data.seeOnePost.postFilter.location.map((value, index) => {
          if (index !== 0) {
            locationOfPostFilter += " ";
          }
          locationOfPostFilter += value.text;
        });
      }

      /// Init Data - 교환필터
      if (postResult.data.seeOnePost.wantFilter !== null) {
        postResult.data.seeOnePost.wantFilter.artist.map((value, index) => {
          if (index !== 0) {
            artistOfWantFilter += " ";
          }
          artistOfWantFilter += value.name;
        });

        postResult.data.seeOnePost.wantFilter.kind.map((value, index) => {
          if (index !== 0) {
            kindOfWantFilter += " ";
          }
          kindOfWantFilter += value.text;
        });

        postResult.data.seeOnePost.wantFilter.keyword.map((value, index) => {
          if (index !== 0) {
            keywordOfWantFilter += " ";
          }
          keywordOfWantFilter += value.text;
        });

        postResult.data.seeOnePost.wantFilter.location.map((value, index) => {
          if (index !== 0) {
            locationOfWantFilter += " ";
          }
          locationOfWantFilter += value.text;
        });
      }

      setInitData(true);
    }
  }

  /// ----------
  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase isleftBackButton={true} centerTitle={postTitle} />
        {postResult.loading || !initData ? (
          <Loader />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: styles.baseWidth - 28 }}
          >
            <CreatedDateContainer>
              <CreatedDateText>7월 29일 작성</CreatedDateText>
            </CreatedDateContainer>
            <LifePostItem
              navigation={navigation}
              postId={postResult.data.seeOnePost.id}
              postFiles={postResult.data.seeOnePost.files}
              postTitle={postResult.data.seeOnePost.description}
              userId={postResult.data.seeOnePost.user.id}
              userAvatar={postResult.data.seeOnePost.user.avatar}
              username={postResult.data.seeOnePost.user.username}
              created={postResult.data.seeOnePost.createdAt}
              updated={postResult.data.seeOnePost.updatedAt}
              likeCount={postResult.data.seeOnePost.likeCount}
              commentCount={postResult.data.seeOnePost.commentCount}
            />
            <TitleContainer>
              <TitleText>상세정보</TitleText>
              {isWant ? (
                <WantContainer>
                  <WantText>-교환 물품 정보</WantText>
                </WantContainer>
              ) : null}
            </TitleContainer>

            {isPrice ? (
              <View>
                <FilterContainer>
                  <FilterTitleText>가격</FilterTitleText>
                </FilterContainer>
                <FilterContainer>
                  <FilterContentText>
                    {postResult.data.seeOnePost.price === null
                      ? "0원"
                      : postResult.data.seeOnePost.price + "원"}
                  </FilterContentText>
                </FilterContainer>
              </View>
            ) : null}

            {tradeType !== "" ? (
              <View>
                <FilterContainer>
                  <FilterTitleText>판매정보</FilterTitleText>
                </FilterContainer>
                <FilterContainer>
                  <FilterContentText>{tradeType}</FilterContentText>
                </FilterContainer>
              </View>
            ) : null}

            {artistOfPostFilter !== "" ? (
              <View>
                <FilterContainer>
                  <FilterTitleText>아티스트</FilterTitleText>
                </FilterContainer>
                <FilterContainer>
                  <FilterContentText>{artistOfPostFilter}</FilterContentText>
                </FilterContainer>
                {artistOfWantFilter !== "" ? (
                  <FilterContainer>
                    <WantFilterContentText>
                      {artistOfWantFilter}
                    </WantFilterContentText>
                  </FilterContainer>
                ) : null}
              </View>
            ) : null}

            {kindOfPostFilter !== "" ? (
              <View>
                <FilterContainer>
                  <FilterTitleText>품목</FilterTitleText>
                </FilterContainer>
                <FilterContainer>
                  <FilterContentText>{kindOfPostFilter}</FilterContentText>
                </FilterContainer>
                {kindOfWantFilter !== "" ? (
                  <FilterContainer>
                    <WantFilterContentText>
                      {kindOfWantFilter}
                    </WantFilterContentText>
                  </FilterContainer>
                ) : null}
              </View>
            ) : null}

            {locationOfPostFilter !== "" ? (
              <View>
                <FilterContainer>
                  <FilterTitleText>지역</FilterTitleText>
                </FilterContainer>
                <FilterContainer>
                  <FilterContentText>{locationOfPostFilter}</FilterContentText>
                </FilterContainer>
                {locationOfWantFilter !== "" ? (
                  <FilterContainer>
                    <WantFilterContentText>
                      {locationOfWantFilter}
                    </WantFilterContentText>
                  </FilterContainer>
                ) : null}
              </View>
            ) : null}

            {keywordOfPostFilter !== "" ? (
              <View>
                <FilterContainer>
                  <FilterTitleText>키워드</FilterTitleText>
                </FilterContainer>
                <FilterContainer>
                  <FilterContentText>{keywordOfPostFilter}</FilterContentText>
                </FilterContainer>
                {keywordOfWantFilter !== "" ? (
                  <FilterContainer>
                    <WantFilterContentText>
                      {keywordOfWantFilter}
                    </WantFilterContentText>
                  </FilterContainer>
                ) : null}
              </View>
            ) : null}

            {isParticipation ? (
              <View>
                <Touchable
                  onPress={() =>
                    navigation.push("Participants", {
                      postId: postResult.data.seeOnePost.id
                    })
                  }
                >
                  <TitleContainer>
                    <TitleText>참여자</TitleText>
                    {postResult.data.seeOnePost.numberOfParticipants === null ||
                    postResult.data.seeOnePost.numberOfParticipants ===
                      0 ? null : (
                      <ParticipantsContainer>
                        <ParticipantsText1>
                          {postResult.data.seeOnePost.participantsCount}
                        </ParticipantsText1>
                        <ParticipantsText2>
                          {"/" +
                            postResult.data.seeOnePost.numberOfParticipants}
                        </ParticipantsText2>
                      </ParticipantsContainer>
                    )}
                    <CountContainer>
                      <CountText>20개 모두보기</CountText>
                    </CountContainer>
                  </TitleContainer>
                </Touchable>
                <UserContainer>
                  {postResult.data.seeOnePost.participants.map(value => (
                    <UserItemContainer key={value.id}>
                      <UserItem
                        avatarUri={value.avatar}
                        username={value.username}
                      />
                    </UserItemContainer>
                  ))}
                </UserContainer>
              </View>
            ) : null}

            {isMiniPost ? (
              <View>
                <Touchable
                  onPress={() =>
                    navigation.push("RegistedMiniPosts", {
                      postId: postResult.data.seeOnePost.id
                    })
                  }
                >
                  <TitleContainer>
                    <TitleText>등록물품</TitleText>
                    <CountContainer>
                      <CountText>20개 모두보기</CountText>
                    </CountContainer>
                  </TitleContainer>
                </Touchable>
                <PostContainer>
                  {postResult.data.seeOnePost.registedMiniPosts.map(value => (
                    <View key={value.id}>
                      <Touchable
                        onPress={() =>
                          navigation.push("RegistedMiniPostList", {
                            postId: postResult.data.seeOnePost.id,
                            minipostId: value.id
                          })
                        }
                      >
                        <LifeImage source={{ uri: value.files[0] }} />
                      </Touchable>
                    </View>
                  ))}
                </PostContainer>
              </View>
            ) : null}

            <Touchable
              onPress={() =>
                navigation.push("CommentNavigation", {
                  postId: postResult.data.seeOnePost.id,
                  fromScreen: navigation.state.routeName
                })
              }
            >
              <TitleContainer>
                <TitleText>댓글</TitleText>
                <CountContainer>
                  <CountText>20개 모두보기</CountText>
                </CountContainer>
              </TitleContainer>
            </Touchable>
            {postResult.data.seeOnePost.comments.map(value => (
              <CommentItem key={value.id} comment={value} main={false} />
            ))}
            <BottomContainer>
              {isAuth ? (
                <Touchable>
                  <SomethingButton enable={true}>
                    <SomethingText>인증</SomethingText>
                  </SomethingButton>
                </Touchable>
              ) : null}

              {isQuiz ? (
                <Touchable>
                  <SomethingButton enable={true}>
                    <SomethingText>퀴즈</SomethingText>
                  </SomethingButton>
                </Touchable>
              ) : null}

              {isPay ? (
                <Touchable>
                  <SomethingButton enable={true}>
                    <SomethingText>결제</SomethingText>
                  </SomethingButton>
                </Touchable>
              ) : null}

              {isJoin ? (
                <Touchable>
                  <SomethingButton enable={false}>
                    <SomethingText>참여</SomethingText>
                  </SomethingButton>
                </Touchable>
              ) : null}

              {isApply ? (
                <Touchable>
                  <SomethingButton enable={false}>
                    <SomethingText>등록</SomethingText>
                  </SomethingButton>
                </Touchable>
              ) : null}
            </BottomContainer>
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
