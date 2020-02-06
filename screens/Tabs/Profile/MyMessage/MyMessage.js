/// ----------
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  Platform,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import Swiper from "react-native-swiper";
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import { gql } from "apollo-boost";

/// ----------
import styles from "../../../../styles";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";
import GatheringItem from "../../../../components/Item/GatheringItem";

/// ----------
const Touchable = styled.TouchableOpacity``;

///
const MainContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
`;

/// ----------
const OptionBarContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth};
  height: 100;
`;

const OptionBarItemContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth / 2};
  height: ${styles.headerHeight};
`;

const OptionBarText = styled.Text`
  color: ${props => (props.bgColor ? props.theme.blackColor : "#CECECE")};
  text-align: center;
  font-size: 22;
  font-family: NanumBarunGothicBold;
`;

/// ----------
const SwaiperContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: ${styles.baseWidth};
  flex-grow: 1;
`;

const GatheringContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 15;
  margin-bottom: 15;
`;

/// ----------
const ChatContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${styles.baseWidth};
  height: 90;
`;

const UserImage = styled.Image`
  width: 56;
  height: 56;
  border-radius: 28;
  margin-left: 14;
`;

const TextContainer = styled.View`
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10;
`;

const UsernameText = styled.Text`
  color: black;
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicLight;
`;

const LastChatText = styled.Text`
  color: #acabab;
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothicLight;
  margin-top: 5;
`;

const LastDateText = styled.Text`
  color: ${styles.blackColor};
  text-align: right;
  font-size: 12;
  font-family: NanumBarunGothicLight;
  margin-right: 14;
`;

export default ({ navigation }) => {
  const [way, setWay] = useState(0);

  /// ----------
  const scrollToIndex = index => {
    if (this.swiper && this.swiper.scrollView) {
      setWay(index);
      if (Platform.OS === "android") {
        this.swiper.scrollView.setPage(index);
      } else {
        this.swiper.scrollView.scrollTo({ x: this.swiper.state.width * index });
      }
    }
  };

  /// ----------
  const rightButtonFunction = () => {
    if (way === 0) {
      navigation.push("UserSearch");
    } else {
      navigation.push("AddGroup");
    }
  };

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        centerTitle={"Message"}
        rightButton={HeaderRightStyles.ADD}
        rightButtonLink={rightButtonFunction}
      />
      <OptionBarContainer>
        <Touchable
          onPress={() => {
            scrollToIndex(0);
          }}
        >
          <OptionBarItemContainer>
            <OptionBarText bgColor={way === 0 ? true : false}>
              대화
            </OptionBarText>
          </OptionBarItemContainer>
        </Touchable>
        <Touchable
          onPress={() => {
            scrollToIndex(1);
          }}
        >
          <OptionBarItemContainer>
            <OptionBarText bgColor={way === 1 ? true : false}>
              모임
            </OptionBarText>
          </OptionBarItemContainer>
        </Touchable>
      </OptionBarContainer>
      {false ? (
        <Loader />
      ) : (
        <SwaiperContainer>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            showsButtons={false}
            loop={false}
            showsPagination={false}
            onIndexChanged={index => setWay(index)}
          >
            <ScrollView
              bounces={false}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              <ChatContainer>
                <UserImage
                  source={{
                    uri:
                      "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                  }}
                />
                <TextContainer>
                  <UsernameText>사용자</UsernameText>
                  <LastChatText>마지막 대화 내용</LastChatText>
                </TextContainer>
                <LastDateText>1시간 전</LastDateText>
              </ChatContainer>
            </ScrollView>
            <ScrollView
              bounces={false}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              <GatheringContainer>
                <View style={{ marginBottom: 30 }} key={"aa"}>
                  <GatheringItem
                    onPress={() => {}}
                    id={"aaa"}
                    file={
                      "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                    }
                    title={"aa"}
                    subTitle={"bb"}
                  />
                </View>
              </GatheringContainer>
            </ScrollView>
          </Swiper>
        </SwaiperContainer>
      )}
    </MainContainer>
  );
};
