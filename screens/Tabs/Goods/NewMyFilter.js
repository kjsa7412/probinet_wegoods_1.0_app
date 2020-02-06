import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import HeaderBase from "../../../components/Header/HeaderBase";
import useInput from "../../../hooks/useInput";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import HeaderRightStyles from "../../../components/Header/HeaderRight/HeaderRightStyles";
import styles from "../../../styles";
import SubTitle from "../../../components/Title/SubTitle";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  flex-direction: column;
`;

const ImageContainer = styled.View`
  height: 118;
  width: 118;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-right: 14;
  margin-left: 14;
  margin-top: 9;
  margin-bottom: 9;
`;

const Title = styled.Text`
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-top: 16;
  margin-bottom: 16;
  margin-right: 14;
  margin-left: 14;
`;

const Image = styled.Image`
  height: 118;
  width: 118;
  background-color: ${props =>
    props.source ? styles.weGoodsColor + "00" : styles.weGoodsColor};
  border-radius: 60;
`;

const TextInput = styled.TextInput`
  font-size: 13;
  font-family: NanumBarunGothicLight;
  margin-top: 20;
  margin-bottom: 20;
  margin-right: 14;
  margin-left: 14;
`;

const NewMyFilter = ({ navigation }) => {
  const filterNameInput = useInput("");

  const imageUrl = navigation.getParam("imageUrl", []);

  const handleNext = async () => {
    // 예외 처리) 입력을 하지 않은 경우
    if (filterNameInput.value === "") {
      return Alert.alert("Filter Name is empty");
    }

    if (imageUrl === undefined || imageUrl.length === 0) {
      return Alert.alert(
        "Filter Image 를 지정하지 않으셨습니다",
        "그대로 진행하시겠습니까?",
        [
          { text: "No" },
          {
            text: "Yes",
            onPress: () => navigation.navigate("FilterNavigation")
          }
        ]
      );
    } else {
      navigation.navigate("FilterNavigation");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <MainContainer>
        <HeaderBase
          isleftBackButton={true}
          centerTitle={"New Filter"}
          isInputBox={false}
          rightButton={HeaderRightStyles.NEXT}
          rightButtonLink={handleNext}
        />

        <SubTitle text={"필터 이미지"} />

        <ImageContainer>
          <Touchable
            onPress={() =>
              navigation.navigate("PhotoNavigation", {
                isMultiSelect: false,
                leftBackButtonFunc: () => navigation.navigate("NewMyFilter"),
                rightButtonFunc: imageUrl =>
                  navigation.navigate("NewMyFilter", { imageUrl })
              })
            }
          >
            {imageUrl !== undefined && imageUrl.length !== 0 ? (
              <Image source={{ uri: imageUrl[0] }} />
            ) : (
              <Image />
            )}
          </Touchable>
        </ImageContainer>

        <SubTitle text={"필터 제목"} />

        <TextInput
          returnKeyType="done"
          onChangeText={filterNameInput.onChange}
          value={filterNameInput.value}
          placeholder={"필터이름을 설정하세요."}
        ></TextInput>
      </MainContainer>
    </TouchableWithoutFeedback>
  );
};

export default NewMyFilter;
