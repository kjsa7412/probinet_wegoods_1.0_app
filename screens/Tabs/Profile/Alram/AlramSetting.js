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
  width: ${styles.baseWidth / 2};
  height: ${styles.headerHeight};
`;

const OptionBarText = styled.Text`
  color: ${props => (props.bgColor ? props.theme.blackColor : "#CECECE")};
  text-align: center;
  font-size: 22;
  font-family: NanumBarunGothicBold;
`;

///
const ContentsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${styles.baseWidth};
  height: 90;
`;

const ContentsTextContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: ${(styles.baseWidth / 4) * 3};
  height: 90;
`;

const FilterImage = styled.Image`
  width: 56;
  height: 56;
  border-radius: 20;
  margin-left: 14;
`;

const ContentsText = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicLight;
  margin-left: 15;
`;

const ContentsImageContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: ${styles.baseWidth / 4};
  height: 90;
`;

const ContentsImage = styled.Image`
  width: 28;
  height: 28;
  border-radius: 14;
  margin-right: 15;
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
      <HeaderBase isleftBackButton={true} centerTitle={"Setting"} />
      <OptionBarContainer>
        <Touchable
          onPress={() => {
            scrollToIndex(0);
          }}
        >
          <OptionBarItemContainer>
            <OptionBarText bgColor={way === 0 ? true : false}>
              팝업
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
            <Touchable>
              <ContentsContainer>
                <ContentsTextContainer>
                  <ContentsText>일상</ContentsText>
                </ContentsTextContainer>
                <ContentsImageContainer>
                  <ContentsImage
                    source={
                      true
                        ? require("../../../../assets/iconmonstr-check-mark-16-240.png")
                        : require("../../../../assets/iconmonstr-circle-2-240.png")
                    }
                  />
                </ContentsImageContainer>
              </ContentsContainer>
            </Touchable>
          </ScrollView>
          <ScrollView
            bounces={false}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <Touchable>
              <ContentsContainer>
                <ContentsTextContainer>
                  <FilterImage
                    source={{
                      uri:
                        "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                    }}
                  />
                  <ContentsText>아이유 모든 상품</ContentsText>
                </ContentsTextContainer>
                <ContentsImageContainer>
                  <ContentsImage
                    source={
                      true
                        ? require("../../../../assets/iconmonstr-check-mark-16-240.png")
                        : require("../../../../assets/iconmonstr-circle-2-240.png")
                    }
                  />
                </ContentsImageContainer>
              </ContentsContainer>
            </Touchable>
          </ScrollView>
        </Swiper>
      </SwaiperContainer>
    </MainContainer>
  );
};
