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
import styled from "styled-components";

/// ----------
import useInput from "../../../../../hooks/useInput";
import constants from "../../../../../constants";
import styles from "../../../../../styles";
import HeaderRightStyles from "../../../../../components/Header/HeaderRight/HeaderRightStyles";
import HeaderBase from "../../../../../components/Header/HeaderBase";
import BaseInput from "../../../../../components/Input/BaseInput";

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
const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${styles.baseWidth};
  height: 54;
`;

const TitleText = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-left: 15;
`;

export default ({ navigation }) => {
  const answerInput = useInput(navigation.getParam("answer", ""));

  const sendNewAnswer = () => {
    navigation.state.params.addAnswer(answerInput.value, navigation);
  };

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        centerTitle={"New Item"}
        rightButton={HeaderRightStyles.COMPLETE}
        rightButtonLink={sendNewAnswer}
      />
      <TitleContainer>
        <TitleText>퀴즈 제목</TitleText>
      </TitleContainer>
      <BaseInput
        {...answerInput}
        placeholder="새 문항을 입력해주세요"
        keyboardType="default"
        returnKeyType="next"
        autoCorrect={false}
      />
    </MainContainer>
  );
};
