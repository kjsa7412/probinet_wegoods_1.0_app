import React from "react";
import {
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import styled from "styled-components";
import HeaderBase from "../../../components/Header/HeaderBase";

import useInput from "../../../hooks/useInput";
import HeaderRightStyles from "../../../components/Header/HeaderRight/HeaderRightStyles";
import SubTitle from "../../../components/Title/SubTitle";

import { useMutation } from "react-apollo-hooks";

import { ADD_KEYWORD } from "../FilterQueries";

const MainContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

const TextInput = styled.TextInput`
  font-size: 13;
  font-family: NanumBarunGothicLight;
  margin-top: 20;
  margin-bottom: 20;
  margin-right: 14;
  margin-left: 14;
`;

const NewKeyword = ({ navigation }) => {
  const inputText = useInput("");
  const selectedContents = navigation.getParam("selectedContents", () => {});
  const latestContents = navigation.getParam("latestContents", () => {});

  // mutation 쿼리
  const [addKeywordMutation] = useMutation(ADD_KEYWORD, {
    variables: { text: inputText.value }
  });

  const handleSelected = addKeyword => {
    ///-------------------  selected Contents 부분
    // useState 의 set 함수를 쓸때 새로 object 를 만든다음 넣어 줘야 한다.
    const addValueResult = Object.assign({}, selectedContents.contentStatus);
    addValueResult.keyword.push(addKeyword);
    selectedContents.setContentStatus(addValueResult);
  };

  const handleAsyncStorage = async addKeyword => {
    ///------------------- async 부분
    const contentsHistory = await AsyncStorage.getItem("ContentsHistory");

    if (contentsHistory === null) {
      /// 한번도 저장된 적이 없는 경우임
      /// Object를 만들어서 저장을 하자.
      let obj = {
        artist: [],
        kind: [],
        keyword: [addKeyword],
        location: []
      };
      await AsyncStorage.setItem("ContentsHistory", JSON.stringify(obj));
      latestContents.setLatestStatus(obj);
    } else {
      /// 이미 저장된 경우가 있는 경우
      /// 각 content 구분별로 처리해야 한다.
      let contentsHistoryObj = await JSON.parse(contentsHistory);

      let checkArray = contentsHistoryObj.keyword;

      /// 선택한 value 가 이미 있는 경우인지 아닌지 판단해서 처리한다.
      /// 그냥 기존에서 없애고 새로 앞에 삽입
      if (checkArray.lenght !== 0) {
        checkArray = checkArray
          .filter(element => {
            // 최근 사용 history 저장은 5개로 제한하도록 하자
            return element.id !== addKeyword.id;
          })
          .slice(0, 4);
        checkArray.unshift(addKeyword);
      }
      contentsHistoryObj.keyword = checkArray;

      await AsyncStorage.setItem(
        "ContentsHistory",
        JSON.stringify(contentsHistoryObj)
      );

      ///-------------------  latestContents부분
      latestContents.setLatestStatus(contentsHistoryObj);
    }
  };

  const handleComplete = async () => {
    return Alert.alert(inputText.value, "등록 하시겠습니까?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          const {
            data: { addKeyword }
          } = await addKeywordMutation();

          if (addKeyword !== undefined && addKeyword.id !== undefined) {
            let selectedCheckArray = selectedContents.contentStatus.keyword;

            // 현재 선택된 것이 아닐 경우만 처리해야 한다.
            if (
              selectedCheckArray.findIndex(element => {
                return element.id === addKeyword.id;
              }) === -1
            ) {
              handleSelected(addKeyword);
              handleAsyncStorage(addKeyword);
            }
          }
          // 일단 마지막은 goback
          navigation.goBack();
        }
      }
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <MainContainer>
        <HeaderBase
          isleftBackButton={true}
          centerTitle={"New Keyword"}
          isInputBox={false}
          rightButton={HeaderRightStyles.COMPLETE}
          rightButtonLink={handleComplete}
        />

        <SubTitle text={"키워드"} />

        <TextInput
          returnKeyType="done"
          onChangeText={inputText.onChange}
          value={inputText.value}
          placeholder={"명칭을 입력해 주세요."}
        ></TextInput>
      </MainContainer>
    </TouchableWithoutFeedback>
  );
};

export default NewKeyword;
