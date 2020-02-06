/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../../components/Loader";
import styles from "../../styles";
import constants from "../../constants";
import HeaderBase from "../../components/Header/HeaderBase";
import HeaderRightStyles from "../../components/Header/HeaderRight/HeaderRightStyles";

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
const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 64;
  padding-left: 14;
`;

const ItemImageContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 64;
  height: 100%;
`;
const ItemLink = styled.Image`
  width: 20;
  height: 20;
`;

const ItemTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  height: 100%;
`;

const ItemText = styled.Text`
  color: #6d6d6d;
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicBold;
`;

export default ({ navigation }) => {
  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase isleftBackButton={true} centerTitle={"Setting"} />
        <Touchable onPress={() => navigation.push("InviteUser")}>
          <ItemContainer>
            <ItemTextContainer>
              <ItemText>유저 초대</ItemText>
            </ItemTextContainer>
            <ItemImageContainer>
              <ItemLink
                source={require("../../assets/iconmonstr-angel-right-thin-240.png")}
              />
            </ItemImageContainer>
          </ItemContainer>
        </Touchable>
        <Touchable onPress={() => navigation.push("KickUser")}>
          <ItemContainer>
            <ItemTextContainer>
              <ItemText>참여자 추방</ItemText>
            </ItemTextContainer>
            <ItemImageContainer>
              <ItemLink
                source={require("../../assets/iconmonstr-angel-right-thin-240.png")}
              />
            </ItemImageContainer>
          </ItemContainer>
        </Touchable>
        <Touchable onPress={() => {}}>
          <ItemContainer>
            <ItemTextContainer>
              <ItemText>모임방 나가기</ItemText>
            </ItemTextContainer>
          </ItemContainer>
        </Touchable>
      </ScreenContainer>
    </FullContainer>
  );
};
