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
import styles from "../../../../styles";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";
import UserItem from "../../../../components/Item/UserItem";
import BaseInput from "../../../../components/Input/BaseInput";

///
import { ADD_GROUP, SEE_USERS } from "./GroupQueries";

/// ----------
const Touchable = styled.TouchableOpacity``;

///
const FullContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
  background-color: #3897f0;
`;

const ScreenContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${styles.baseWidth};
  height: 100%;
`;

const Line = styled.View`
  border: 0.1px solid #F7F7F7
  border-top-width: 0.5;
  width: ${styles.baseWidth};
`;

///
const PictureContainer = styled.View`
  flex-direction: row;
`;

const PictureImage = styled.Image`
  width: 136;
  height: 136;
  margin-right: 5;
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

///
const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: ${styles.baseWidth};
  height: 37;
`;

const OptionItemContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: ${styles.baseWidth / 3};
  height: 37;
`;

const DeleteItemText = styled.Text`
  color: ${styles.weGoodsColor};
  text-align: center;
  font-size: 14;
  font-family: NanumBarunGothic;
  margin-right: 15;
`;

const DeleteItemImage = styled.Image`
  width: 12;
  height: 12;
  margin-right: 2;
`;

///
const NewContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth};
  height: 90;
`;

const NewImage = styled.Image`
  width: 32;
  height: 32;
  border-radius: 16;
`;

const NewText = styled.Text`
  color: ${styles.weGoodsColor};
  text-align: center;
  font-size: 11;
  font-family: NanumBarunGothicLight;
  margin-top: 2;
`;

///
const UserContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15;
  width: ${styles.baseWidth};
`;

const UserItemContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth / 3};
  height: 130;
`;

export default ({ navigation }) => {
  const titleInput = useInput(navigation.getParam("title", ""));
  const contentInput = useInput(navigation.getParam("content", ""));

  const [file, setFile] = useState(
    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
  );

  const [participants, setParticipants] = useState([]);

  const [reloading, setReloading] = useState(false);

  const [addGroupMutation] = useMutation(ADD_GROUP, {
    variables: {
      participants: participants,
      title: titleInput.value,
      subTitle: contentInput.value,
      file: file
    }
  });

  /// --------------------------------------
  const [initUserResult, setInitUserResult] = useState(true);

  let userResult = useQuery(SEE_USERS, {
    variables: { id: participants },
    fetchPolicy: "network-only"
  });

  if (initUserResult === true && userResult.loading === true) {
    setInitUserResult(false);
  }

  if (
    initUserResult === false &&
    userResult.loading === false &&
    userResult.data !== undefined
  ) {
    userResult.data.seeUsers.map(value => {
      value.isChecked = false;
    });
    setInitUserResult(true);
  }
  /// --------------------------------------

  selectUser = async (id = [], navigation) => {
    try {
      setReloading(true);
      navigation.goBack();

      /// 합친 후 중복제거
      if (id.length !== 0) {
        let tempParticipants = participants;

        tempParticipants = tempParticipants.concat(id);

        const result = tempParticipants.filter(
          (item, index) => tempParticipants.indexOf(item) === index
        );

        setParticipants(result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setReloading(false);
    }
  };

  const completeGroup = async () => {
    if (titleInput.value === "") {
      Alert.alert("1");
    } else if (file === "") {
      Alert.alert("3");
    } else if (participants.length === 0) {
      Alert.alert("4");
    } else {
      try {
        const {
          data: { addRoom }
        } = await addGroupMutation({
          variables: {
            participants: participants,
            title: titleInput.value,
            subTitle: contentInput.value,
            file: file
          }
        });

        if (addRoom) {
          Alert.alert("OK");
        }
      } catch (e) {
      } finally {
        navigation.goBack();
      }
    }
  };

  /// todo
  /// 1. 체크
  /// 2. 선택삭제

  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase
          isleftBackButton={true}
          centerTitle={"새 모임"}
          rightButton={HeaderRightStyles.COMPLETE}
          rightButtonLink={completeGroup}
        />
        <ScrollView
          bounces={false}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <PictureContainer>
              <PictureImage
                source={{
                  uri:
                    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                }}
              />
              <PictureImage
                source={{
                  uri:
                    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                }}
              />
              <PictureImage
                source={{
                  uri:
                    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                }}
              />
              <PictureImage
                source={{
                  uri:
                    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
                }}
              />
            </PictureContainer>
          </ScrollView>
          <TitleContainer>
            <TitleText>모임명</TitleText>
          </TitleContainer>
          <BaseInput
            {...titleInput}
            placeholder="모임명을 입력해주세요"
            keyboardType="default"
            returnKeyType="next"
            autoCorrect={false}
          />
          <Line />
          <TitleContainer>
            <TitleText>모임정보</TitleText>
          </TitleContainer>
          <BaseInput
            {...contentInput}
            placeholder="모임에 대한 설명을 입력해주세요"
            keyboardType="default"
            returnKeyType="next"
            autoCorrect={false}
          />
          <Line />
          <TitleContainer>
            <TitleText>참석자</TitleText>
          </TitleContainer>
          <OptionContainer>
            <Touchable onPress={() => {}}>
              <OptionItemContainer>
                <DeleteItemImage
                  source={require("../../../../assets/iconmonstr-check-mark-thin-240.png")}
                />
                <DeleteItemText>선택삭제</DeleteItemText>
              </OptionItemContainer>
            </Touchable>
          </OptionContainer>
          <Touchable
            onPress={() => {
              navigation.push("UserSearch", {
                selectUser: this.selectUser
              });
            }}
          >
            <NewContainer>
              <NewImage
                source={require("../../../../assets/iconmonstr-plus-5-240.png")}
              />
              <NewText>New</NewText>
            </NewContainer>
          </Touchable>
          {userResult.loading || !initUserResult ? (
            <Loader />
          ) : (
            <UserContainer>
              {userResult.data.seeUsers.map(value => (
                <UserItemContainer key={value.id}>
                  <UserItem
                    avatarUri={value.avatar}
                    username={value.username}
                  />
                </UserItemContainer>
              ))}
            </UserContainer>
          )}
        </ScrollView>
      </ScreenContainer>
    </FullContainer>
  );
};
