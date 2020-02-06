/// ----------
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, Platform } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

/// ----------
import constants from "../../../../../constants";
import styles from "../../../../../styles";
import Loader from "../../../../../components/Loader";
import HeaderBase from "../../../../../components/Header/HeaderBase";

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
const ItemLink = styled.Image`
  width: 20;
  height: 20;
`;

const ItemTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${styles.baseWidth - styles.headerHeight};
  height: 64;
`;

const ItemText = styled.Text`
  color: #6d6d6d;
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-left: 15;
`;

export default ({ navigation }) => {
  return (
    <MainContainer>
      <HeaderBase isleftBackButton={true} centerTitle={"계정설정"}></HeaderBase>
      <Touchable onPress={() => navigation.push("PasswordSetting")}>
        <ItemContainer>
          <ItemTextContainer>
            <ItemText>비밀번호관리</ItemText>
          </ItemTextContainer>
          <ItemImageContainer>
            <ItemLink
              source={require("../../../../../assets/iconmonstr-angel-right-thin-240.png")}
            />
          </ItemImageContainer>
        </ItemContainer>
      </Touchable>
      <Touchable onPress={() => navigation.push("PaymentMethodSetting")}>
        <ItemContainer>
          <ItemTextContainer>
            <ItemText>결제수단관리</ItemText>
          </ItemTextContainer>
          <ItemImageContainer>
            <ItemLink
              source={require("../../../../../assets/iconmonstr-angel-right-thin-240.png")}
            />
          </ItemImageContainer>
        </ItemContainer>
      </Touchable>
      <Touchable onPress={() => navigation.push("AccountNumberSetting")}>
        <ItemContainer>
          <ItemTextContainer>
            <ItemText>계좌관리</ItemText>
          </ItemTextContainer>
          <ItemImageContainer>
            <ItemLink
              source={require("../../../../../assets/iconmonstr-angel-right-thin-240.png")}
            />
          </ItemImageContainer>
        </ItemContainer>
      </Touchable>
      <Touchable onPress={() => navigation.push("PhoneNumberSetting")}>
        <ItemContainer>
          <ItemTextContainer>
            <ItemText>휴대폰인증</ItemText>
          </ItemTextContainer>
          <ItemImageContainer>
            <ItemLink
              source={require("../../../../../assets/iconmonstr-angel-right-thin-240.png")}
            />
          </ItemImageContainer>
        </ItemContainer>
      </Touchable>
    </MainContainer>
  );
};
