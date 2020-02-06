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
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import { gql } from "apollo-boost";

/// ----------
import useInput from "../../../../hooks/useInput";
import constants from "../../../../constants";
import styles from "../../../../styles";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";
import BaseInput from "../../../../components/Input/BaseInput";

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
const Line = styled.View`
  border: 0.1px solid #F7F7F7
  border-top-width: 0.5;
  width: ${styles.baseWidth};
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

const ContentsText = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothicLight;
  margin-left: 15;
`;

const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${styles.baseWidth};
  height: 135;
`;

const AvatarBlank = styled.View`
  background-color: ${styles.weGoodsColor};
  width: 118;
  height: 118;
  border-radius: ${118 / 2};
  margin-left: 15;
`;

const AvatarImage = styled.Image`
  width: 118;
  height: 118;
  border-radius: ${118 / 2};
  margin-left: 15;
`;

const BackgroundBlank = styled.View`
  background-color: ${styles.weGoodsColor};
  width: 118;
  height: 118;
  margin-left: 15;
`;

const BackgroundImage = styled.Image`
  width: 118;
  height: 118;
  margin-left: 15;
`;

/// ----------
const SEE_ME = gql`
  {
    me {
      id
      background
      avatar
      username
      favorites {
        id
        name
      }
      bio
    }
  }
`;

const EDIT_USER = gql`
  mutation editUser(
    $avatar: String
    $background: String
    $username: String
    $bio: String
  ) {
    editUser(
      avatar: $avatar
      background: $background
      username: $username
      bio: $bio
    ) {
      avatar
      background
      username
      bio
    }
  }
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);

  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const usernameInput = useInput(navigation.getParam("username", ""));
  const bioInput = useInput(navigation.getParam("bio", ""));

  let meResult = useQuery(SEE_ME);

  const [editUsertMutation] = useMutation(EDIT_USER, {
    variables: {
      avatar: avatar,
      background: background,
      username: usernameInput.value,
      bio: bioInput.value
    }
  });

  if (status) {
    if (meResult.loading || meResult.data !== undefined) {
      if (meResult.data.me.avatar !== null) {
        setAvatar(meResult.data.me.avatar);
      }

      if (meResult.data.me.background !== null) {
        setBackground(meResult.data.me.background);
      }

      if (meResult.data.me.username !== null) {
        usernameInput.setValue(meResult.data.me.username);
      }

      if (meResult.data.me.bio !== null) {
        bioInput.setValue(meResult.data.me.bio);
      }
    }
    setStatus(false);
  }

  const handleComplete = async () => {
    try {
      setLoading(true);
      console.log(avatar);
      console.log(background);
      console.log(usernameInput.value);
      console.log(bioInput.value);

      const {
        data: { editUser }
      } = await editUsertMutation();

      if (editUser) {
        Alert.alert("수정되었습니다.", "Log in now!");
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
      Alert.alert("문제발생", "Log in instead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      style={{ flex: 1 }}
      behavior="padding"
      enabled
    >
      <MainContainer>
        <HeaderBase
          isleftBackButton={true}
          centerTitle={"프로필설정"}
          rightButton={HeaderRightStyles.COMPLETE}
          rightButtonLink={handleComplete}
        />
        {meResult.loading || status ? (
          <Loader />
        ) : (
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <TitleContainer>
              <TitleText>필터 사진</TitleText>
            </TitleContainer>
            <Touchable onPress={() => {}}>
              <ImageContainer>
                {meResult.data.me.avatar === null ? (
                  <AvatarBlank />
                ) : (
                  <AvatarImage source={{ uri: avatar }} />
                )}
              </ImageContainer>
            </Touchable>
            <Line />
            <TitleContainer>
              <TitleText>프로필 배경 사진</TitleText>
            </TitleContainer>
            <Touchable onPress={() => {}}>
              <ImageContainer>
                {meResult.data.me.background === null ? (
                  <BackgroundBlank />
                ) : (
                  <BackgroundImage source={{ uri: background }} />
                )}
              </ImageContainer>
            </Touchable>
            <Line />
            <TitleContainer>
              <TitleText>이름</TitleText>
            </TitleContainer>
            <BaseInput
              {...usernameInput}
              placeholder="이름을 입력해주세요"
              keyboardType="default"
              returnKeyType="next"
              autoCorrect={false}
            />
            <Line />
            <TitleContainer>
              <TitleText>팬</TitleText>
            </TitleContainer>
            <TitleContainer>
              <ContentsText>청하</ContentsText>
            </TitleContainer>
            <Line />
            <TitleContainer>
              <TitleText>소개</TitleText>
            </TitleContainer>
            <BaseInput
              {...bioInput}
              placeholder="소개를 입력해주세요"
              keyboardType="default"
              returnKeyType="next"
              autoCorrect={false}
              multiline={true}
            />
            <Line />
          </ScrollView>
        )}
      </MainContainer>
    </KeyboardAvoidingView>
  );
};
