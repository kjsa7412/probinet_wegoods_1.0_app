/// ----------
/// Import
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Alert, ScrollView } from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import useInput from "../../../../hooks/useInput";
import styles from "../../../../styles";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";
import BaseInput from "../../../../components/Input/BaseInput";

///
import { ADD_LIFEPOST } from "./LifeQueries";

/// ----------
/// Styled Components

///
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
const Line = styled.View`
  border: 0.1px solid #F7F7F7
  border-top-width: 0.5;
  width: ${styles.baseWidth};
`;

export default ({ navigation }) => {
  const contentInput = useInput(navigation.getParam("content", ""));

  const [files, setFiles] = useState([
    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png",
    "https://phinf.pstatic.net/tvcast/20190125_50/dfLUO_1548408484414UoxSn_PNG/r38Nh24APaqS.png"
  ]);

  const [addLifePostMutation] = useMutation(ADD_LIFEPOST, {
    variables: { files: files, title: contentInput.value }
  });

  const completeLifePost = async () => {
    if (contentInput.value === "") {
      Alert.alert("1");
    } else if (files.length === 0) {
      Alert.alert("2");
    } else {
      try {
        const {
          data: { addLifePost }
        } = await addLifePostMutation({
          variables: {
            files: files,
            title: contentInput.value
          }
        });

        if (addLifePost) {
          Alert.alert("OK");
        }
      } catch (e) {
      } finally {
        navigation.goBack();
      }
    }
  };

  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase
          isleftBackButton={true}
          centerTitle={"새 일상"}
          isInputBox={false}
          rightButton={HeaderRightStyles.COMPLETE}
          rightButtonLink={completeLifePost}
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
            <TitleText>내용</TitleText>
          </TitleContainer>
          <BaseInput
            {...contentInput}
            placeholder="내용을 입력해주세요"
            keyboardType="default"
            returnKeyType="next"
            autoCorrect={false}
          />
          <Line />
        </ScrollView>
      </ScreenContainer>
    </FullContainer>
  );
};
