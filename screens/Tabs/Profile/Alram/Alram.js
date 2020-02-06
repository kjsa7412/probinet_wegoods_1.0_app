/// ----------
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, Platform } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Swiper from "react-native-swiper";

/// ----------
import constants from "../../../../constants";
import styles from "../../../../styles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";

/// ----------
const Touchable = styled.TouchableOpacity``;

///
const MainContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
`;

const SwaiperContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: ${styles.baseWidth};
  flex-grow: 1;
`;

///
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
  width: ${styles.baseWidth / 3};
  height: ${styles.headerHeight};
`;

const OptionBarText = styled.Text`
  color: ${props => (props.bgColor ? props.theme.blackColor : "#CECECE")};
  text-align: center;
  font-size: 22;
  font-family: NanumBarunGothicBold;
`;

/// ----------
const AlramContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${styles.baseWidth};
  height: 90;
`;

const AlramImage = styled.Image`
  width: 56;
  height: 56;
  margin-left: 14;
`;

const TextContainer = styled.View`
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10;
`;

const MainText = styled.Text`
  color: black;
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicLight;
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

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        centerTitle={"Alram"}
        rightButton={HeaderRightStyles.SETTING}
        rightButtonLink={() => navigation.push("AlramSetting")}
      />
      <OptionBarContainer>
        <Touchable
          onPress={() => {
            scrollToIndex(0);
          }}
        >
          <OptionBarItemContainer>
            <OptionBarText bgColor={way === 0 ? true : false}>
              일상
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
              필터
            </OptionBarText>
          </OptionBarItemContainer>
        </Touchable>
        <Touchable
          onPress={() => {
            scrollToIndex(2);
          }}
        >
          <OptionBarItemContainer>
            <OptionBarText bgColor={way === 2 ? true : false}>
              중요
            </OptionBarText>
          </OptionBarItemContainer>
        </Touchable>
      </OptionBarContainer>
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
            <AlramContainer>
              <AlramImage
                source={{
                  uri:
                    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                }}
              />
              <TextContainer>
                <MainText>알림내용</MainText>
              </TextContainer>
              <LastDateText>1시간 전</LastDateText>
            </AlramContainer>
          </ScrollView>
          <ScrollView
            bounces={false}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <AlramContainer>
              <AlramImage
                source={{
                  uri:
                    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                }}
              />
              <TextContainer>
                <MainText>알림내용</MainText>
              </TextContainer>
              <LastDateText>1시간 전</LastDateText>
            </AlramContainer>
          </ScrollView>
          <ScrollView
            bounces={false}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <AlramContainer>
              <AlramImage
                source={{
                  uri:
                    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                }}
              />
              <TextContainer>
                <MainText>알림내용</MainText>
              </TextContainer>
              <LastDateText>1시간 전</LastDateText>
            </AlramContainer>
          </ScrollView>
        </Swiper>
      </SwaiperContainer>
    </MainContainer>
  );
};
