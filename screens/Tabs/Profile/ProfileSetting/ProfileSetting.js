/// ----------
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, Platform } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

/// ----------
import constants from "../../../../constants";
import styles from "../../../../styles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";

/// ----------
const Touchable = styled.TouchableOpacity``;

///
const MainContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
`;

///
const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${styles.baseWidth};
  height: 64;
`;

const ItemImageContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.headerHeight};
  height: 64;
`;

const ItemImage = styled.Image`
  width: 20;
  height: 20;
`;

const ItemLink = styled.Image`
  width: 20;
  height: 20;
`;

const ItemTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${styles.baseWidth - styles.headerHeight * 2};
  height: 64;
`;

const ItemText = styled.Text`
  color: #6d6d6d;
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-left: 10;
`;

export default ({ navigation }) => {
  return (
    <MainContainer>
      <HeaderBase isleftBackButton={true} centerTitle={"Setting"}></HeaderBase>
      <Touchable onPress={() => navigation.push("StatusSetting")}>
        <ItemContainer>
          <ItemImageContainer>
            <ItemImage
              source={require("../../../../assets/iconmonstr-pencil-4-240.png")}
            />
          </ItemImageContainer>
          <ItemTextContainer>
            <ItemText>프로필설정</ItemText>
          </ItemTextContainer>
          <ItemImageContainer>
            <ItemLink
              source={require("../../../../assets/iconmonstr-angel-right-thin-240.png")}
            />
          </ItemImageContainer>
        </ItemContainer>
      </Touchable>
      <Touchable onPress={() => navigation.push("AccountSetting")}>
        <ItemContainer>
          <ItemImageContainer>
            <ItemImage
              source={require("../../../../assets/iconmonstr-user-19-240.png")}
            />
          </ItemImageContainer>
          <ItemTextContainer>
            <ItemText>계정설정</ItemText>
          </ItemTextContainer>
          <ItemImageContainer>
            <ItemLink
              source={require("../../../../assets/iconmonstr-angel-right-thin-240.png")}
            />
          </ItemImageContainer>
        </ItemContainer>
      </Touchable>
      <Touchable onPress={() => navigation.push("QuizSetting")}>
        <ItemContainer>
          <ItemImageContainer>
            <ItemImage
              source={require("../../../../assets/iconmonstr-puzzle-3-240.png")}
            />
          </ItemImageContainer>
          <ItemTextContainer>
            <ItemText>퀴즈관리</ItemText>
          </ItemTextContainer>
          <ItemImageContainer>
            <ItemLink
              source={require("../../../../assets/iconmonstr-angel-right-thin-240.png")}
            />
          </ItemImageContainer>
        </ItemContainer>
      </Touchable>
      <Touchable onPress={() => navigation.push("ConfirmPolicy")}>
        <ItemContainer>
          <ItemImageContainer>
            <ItemImage
              source={require("../../../../assets/iconmonstr-info-1-240.png")}
            />
          </ItemImageContainer>
          <ItemTextContainer>
            <ItemText>약관확인</ItemText>
          </ItemTextContainer>
          <ItemImageContainer>
            <ItemLink
              source={require("../../../../assets/iconmonstr-angel-right-thin-240.png")}
            />
          </ItemImageContainer>
        </ItemContainer>
      </Touchable>
      <Touchable onPress={() => {}}>
        <ItemContainer>
          <ItemImageContainer>
            <ItemImage
              source={require("../../../../assets/iconmonstr-power-on-off-8-240.png")}
            />
          </ItemImageContainer>
          <ItemTextContainer>
            <ItemText>로그아웃</ItemText>
          </ItemTextContainer>
          <ItemImageContainer>
            <ItemLink />
          </ItemImageContainer>
        </ItemContainer>
      </Touchable>
    </MainContainer>
  );
};
