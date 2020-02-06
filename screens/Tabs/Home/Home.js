/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, Image } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Swiper from "react-native-swiper";

///
import {
  SEE_ADVERTISEMENT,
  SEE_CREATOR,
  SEE_FILTER,
  SEE_INTEREST,
  SEE_MARKET,
  SEE_LIFEPOST,
  SEE_GATHERING
} from "./HomeQueries";
import styles from "../../../styles";
import Loader from "../../../components/Loader";
import ExplainTitle from "../../../components/Title/ExplainTitle";
import UserItem from "../../../components/Item/UserItem";
import FilterCardItem from "../../../components/Item/FilterCardItem";
import PostItemOfHome from "../../../components/Item/Post/PostItemOfHome";
import GatheringItemOfHome from "../../../components/Item/GatheringItemOfHome";

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

///
const AdContainer = styled.View`
  width: 100%;
  height: ${styles.adHeight};
`;

const CreatorContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth / 4};
  height: ${styles.creatorHeight};
`;

const FilterContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(styles.baseWidth / 5) * 4};
  height: ${styles.filterHeight};
`;

const PostContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth / 2.5};
  height: ${styles.postHeight};
`;

const LifePostContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth / 2.5};
  height: ${styles.lifepostHeight};
`;

const GroupContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(styles.baseWidth / 5) * 4};
  height: ${styles.groupHeight};
`;

///
const CopyrightContainer = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: ${styles.copyrightHeight};
  margin-bottom: 15;
`;

const Copyright = styled.Text`
  color: #acabab;
  text-align: center;
  font-size: 8;
  font-family: NanumBarunGothicLight;
`;

/// ----------
export default ({ navigation }) => {
  /// ---------------
  /// Init
  const [shouldFetch, setShouldFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const bumperOfFilter = (styles.baseWidth - (styles.baseWidth / 5) * 4) / 2;
  const bumperOfGroup = (styles.baseWidth - 284) / 2;

  /// ----------
  /// Load Data

  // 광고
  let adResult = useQuery(SEE_ADVERTISEMENT, {
    variables: { loadNumber: 3 },
    fetchPolicy: "network-only"
  });
  // 크리에이터
  let creatorResult = useQuery(SEE_CREATOR, {
    variables: { loadNumber: 30 },
    fetchPolicy: "network-only"
  });
  // 필터
  let filterResult = useQuery(SEE_FILTER, {
    variables: { loadNumber: 30 },
    fetchPolicy: "network-only"
  });
  // 인기
  let interestResult = useQuery(SEE_INTEREST, {
    variables: { loadNumber: 20 },
    fetchPolicy: "network-only"
  });
  // 마켓
  let marketResult = useQuery(SEE_MARKET, {
    variables: { loadNumber: 20 },
    fetchPolicy: "network-only"
  });
  // 일상
  let lifeResult = useQuery(SEE_LIFEPOST, {
    variables: { loadNumber: 10 },
    fetchPolicy: "network-only"
  });
  // 모임
  let groupResult = useQuery(SEE_GATHERING, {
    variables: { loadNumber: 10 },
    fetchPolicy: "network-only"
  });

  /// ----------
  /// Function
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
      await adResult.refetch();
      await creatorResult.refetch();
      await filterResult.refetch();
      await interestResult.refetch();
      await marketResult.refetch();
      await lifeResult.refetch();
      await groupResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  /// ---------------
  return (
    <FullContainer>
      <ScreenContainer>
        {adResult.loading ||
        creatorResult.loading ||
        filterResult.loading ||
        interestResult.loading ||
        marketResult.loading ||
        lifeResult.loading ||
        groupResult.loading ? (
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
            <AdContainer>
              <Swiper
                activeDotColor={"#FFFFFF"}
                autoplay={true}
                autoplayTimeout={2}
              >
                {adResult.data.seeAdvertisement.map(Advertisement => (
                  <Image
                    key={Advertisement.id}
                    source={{ uri: Advertisement.files }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ))}
              </Swiper>
            </AdContainer>

            <ExplainTitle
              onPress={() => navigation.push("Creator")}
              text="Creator"
              explainText="인기 크리에이터들의 게시물을 구경해보세요."
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              {creatorResult.data.seeCreatorList.map(Creator => (
                <CreatorContainer key={Creator.user.id}>
                  <UserItem
                    avatarUri={Creator.user.avatar}
                    username={Creator.user.username}
                    onPress={() =>
                      navigation.push("UserProfile", {
                        userId: Creator.user.id
                      })
                    }
                  />
                </CreatorContainer>
              ))}
            </ScrollView>

            <ExplainTitle
              onPress={() => navigation.push("Filter")}
              text="Filter"
              explainText="사람들이 자주 사용하는 필터를 구경하고 나만의 필터로 등록해보세요."
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              <View style={{ width: bumperOfFilter }} />
              {filterResult.data.seePopularFilterListHorizontal.map(Filter => (
                <FilterContainer key={Filter.id}>
                  <FilterCardItem
                    onPress={() =>
                      navigation.push("OneFilter", {
                        filterId: Filter.id
                      })
                    }
                    posts={Filter.postFilter}
                    artist={Filter.artist}
                    type={Filter.postType}
                    kind={Filter.kind}
                    location={Filter.location}
                    keyword={Filter.keyword}
                  />
                </FilterContainer>
              ))}
              <View style={{ width: bumperOfFilter }} />
            </ScrollView>

            <ExplainTitle
              onPress={() => navigation.push("Interest")}
              text="Interest"
              explainText="어떤 마켓이 열릴지 확인해보세요."
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              {interestResult.data.seeInterest.map(function(value) {
                return (
                  <PostContainer key={value.id}>
                    <PostItemOfHome
                      post={value}
                      onPress={() => {
                        navigation.push("Post", {
                          postId: "ck0x016rctwfr0b406dtoq6li",
                          postTitle: "타이틀"
                        });
                      }}
                    />
                  </PostContainer>
                );
              })}
            </ScrollView>

            <ExplainTitle
              onPress={() => navigation.push("Market")}
              text="Market"
              explainText="어떤 마켓이 열릴지 확인해보세요."
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              {marketResult.data.seeMarketList.map(function(value) {
                return (
                  <PostContainer key={value.id}>
                    <PostItemOfHome
                      // Map으로 Component 생성 시 Key는 여기에 할당하자
                      // PostItem 내부에 Key를 할당해봤자 인식하지 못함
                      key={value.id}
                      post={value}
                      onPress={() => {
                        navigation.push("Post", {
                          postId: "ck0x016rctwfr0b406dtoq6li",
                          postTitle: "타이틀"
                        });
                      }}
                    />
                  </PostContainer>
                );
              })}
            </ScrollView>

            <ExplainTitle
              onPress={() => navigation.push("Life")}
              text="Life"
              explainText="어떤 마켓이 열릴지 확인해보세요."
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              {lifeResult.data.seeRandomLifePost.map(function(value) {
                return (
                  <LifePostContainer key={value.id}>
                    <Touchable onPress={() => navigation.push("LifePost")}>
                      <Image
                        source={{ uri: value.files[0] }}
                        style={{
                          width: 135,
                          height: 135
                        }}
                      />
                    </Touchable>
                  </LifePostContainer>
                );
              })}
            </ScrollView>

            <ExplainTitle
              onPress={() => navigation.push("Group")}
              text="Group"
              explainText="어떤 마켓이 열릴지 확인해보세요."
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              <View style={{ width: bumperOfGroup }} />
              {groupResult.data.seeRandomGathering.map(value => (
                <GroupContainer key={value.id}>
                  <GatheringItemOfHome
                    onPress={() =>
                      navigation.push("JoinGroup", { groupId: value.id })
                    }
                    id={value.id}
                    file={value.file}
                    title={value.title}
                    subTitle={value.subTitle}
                  />
                </GroupContainer>
              ))}
              <View style={{ width: bumperOfGroup }} />
            </ScrollView>

            <CopyrightContainer>
              <Copyright>
                COPYRIGHT © Probinet Crop. 2019. ALL RIGHTS RESERVED.
              </Copyright>
            </CopyrightContainer>
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
