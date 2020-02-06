import React, { useState } from "react";
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import styled from "styled-components";
import HeaderBase from "../../../components/Header/HeaderBase";

import useInput from "../../../hooks/useInput";
import HeaderRightStyles from "../../../components/Header/HeaderRight/HeaderRightStyles";
import SubTitle from "../../../components/Title/SubTitle";

import constants from "../../../constants";
import styles from "../../../styles";
import NewMemberItem from "../../../components/Item/Filter/Artist/NewMemberItem";
import SelectedDeleteBar from "../../../components/Item/Filter/SelectedDeleteBar";

import { useMutation } from "react-apollo-hooks";

import { ADD_ARTIST } from "../FilterQueries";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.KeyboardAvoidingView`
  flex-direction: column;
  flex: 1;
`;

const OptionBarActiveType = styled.View`
  flex-direction: row;
  margin-top: 27;
`;

const OptionActiveType = styled.View`
  flex-direction: row;
  width: ${constants.width / 2};
  height: 45;
  justify-content: center;
  align-items: center;
`;

const ActiveTypeText = styled.Text`
  color: ${props => (props.focus ? "#000000" : "#ACABAB")};
  font-size: 22;
  font-family: NanumBarunGothicBold;
`;

const Container = styled.View`
  flex-direction: column;
  flex: 1;
  flex-wrap: wrap;
`;

const TextInput = styled.TextInput`
  font-size: 13;
  font-family: NanumBarunGothic;
  width: ${constants.width};
  height: 54;
  padding-left: 14;
`;

///
const ContainerInScrollView = styled.View`
  flex-direction: column;
  width: ${constants.width};
  align-items: center;
`;

///
const NewContainer = styled.View`
  flex-direction: column;
  width: ${constants.width};
  justify-content: center;
  align-items: center;
  height: 73;
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

const AddArtist = ({ navigation }) => {
  const inputGroupJobType = useInput("");
  const inputGroupNameHan = useInput("");
  const inputGroupNameEng = useInput("");

  const inputPersonJobType = useInput("");
  const inputPersonNameHan = useInput("");
  const inputPersonNameEng = useInput("");

  const [activeTypeState, setactiveTypeState] = useState("PERSON");

  const [memberList, setMemberList] = useState([
    { focus: false, inputNameHan: "", inputNameEng: "" }
  ]);
  const memberListState = { memberList, setMemberList };

  /// ------------------------
  // mutation 쿼리
  const [addArtistMutation] = useMutation(ADD_ARTIST, {
    variables: {
      name:
        activeTypeState === "GROUP"
          ? inputGroupNameHan.value !== ""
            ? inputGroupNameHan.value
            : undefined
          : activeTypeState === "PERSON"
          ? inputPersonNameHan.value !== ""
            ? inputPersonNameHan.value
            : undefined
          : "",
      engName:
        activeTypeState === "GROUP"
          ? inputGroupNameEng.value !== ""
            ? inputGroupNameEng.value
            : undefined
          : activeTypeState === "PERSON"
          ? inputPersonNameEng.value !== ""
            ? inputPersonNameEng.value
            : undefined
          : "",
      jopType:
        activeTypeState === "GROUP"
          ? inputGroupJobType.value !== ""
            ? inputGroupJobType.value
            : undefined
          : activeTypeState === "PERSON"
          ? inputPersonJobType.value !== ""
            ? inputPersonJobType.value
            : undefined
          : "",
      action: activeTypeState
    }
  });

  /// ------------------------

  /// 멤버수 추가할때 component 뿌리는 용도로 쓰인다.
  /// memberList 로 하려고 했으나. map 내부에서 textinput 으로 인한 값의 변경으로 안됨
  const [memberIndexArray, setMemberIndexArray] = useState([true]);

  // console.log("addArtist memberIndexArray", memberIndexArray);
  // console.log("addArtist memberList", memberList);

  /// ------------------------
  /// 함수부분
  const handleComplete = async ({
    groupContinueFlag = false,
    personContinueFlag = false
  }) => {
    /// ------------------------
    /// 예외처리들
    // 1. 이름을 적지 않았을 때 처리
    if (
      inputGroupNameHan.value === "" &&
      inputGroupNameEng.value === "" &&
      inputPersonNameHan.value === "" &&
      inputPersonNameEng.value === ""
    ) {
      return Alert.alert("그룹/개인 명칭을 입력해 주세요");
    }
    // 1. 멤버가 적혀 있는데 그룹을 적지 않은 경우
    if (
      memberList.findIndex(element => {
        return element.inputNameHan !== "" || element.inputNameEng !== "";
      }) !== -1 &&
      (inputGroupNameHan.value === "" && inputGroupNameEng.value === "")
    ) {
      return Alert.alert("그룹명을 입력해주세요");
    }

    // 주의 문구
    // 1. 그룹의 직업을 넣지 않았을 경우
    if (
      groupContinueFlag === false &&
      (inputGroupNameHan.value !== "" || inputGroupNameEng.value !== "") &&
      inputGroupJobType.value === ""
    ) {
      return Alert.alert(
        "그룹의 직업을 입력하지 않으셨습니다.",
        "그대로 진행하시겠습니다",
        [
          {
            text: "Yes",
            onPress: () => {
              handleComplete({
                groupContinueFlag: true,
                personContinueFlag: personContinueFlag
              });
            }
          },
          {
            text: "No"
          }
        ]
      );
    }

    // 2. 개인의 직업을 넣지 않았을 경우
    if (
      personContinueFlag === false &&
      (inputPersonNameHan.value !== "" || inputPersonNameEng.value !== "") &&
      inputPersonJobType.value === ""
    ) {
      return Alert.alert(
        "개인의 직업을 입력하지 않으셨습니다.",
        "그대로 진행하시겠습니다",
        [
          {
            text: "Yes",
            onPress: () => {
              handleComplete({
                groupContinueFlag: groupContinueFlag,
                personContinueFlag: true
              });
            }
          },
          {
            text: "No"
          }
        ]
      );
    }

    /// ------------------------

    /// ------------------------

    const {
      data: { addArtist }
    } = await addArtistMutation();

    return navigation.navigate("AddArtistResult", {
      addedArtistList: addArtist
    });
  };

  const handleNew = async () => {
    let array = memberIndexArray.slice();
    array.push(true);
    setMemberIndexArray(array);

    let newArrayMemberList = memberList.slice();
    newArrayMemberList.push({
      focus: false,
      inputNameHan: "",
      inputNameEng: ""
    });
    setMemberList(newArrayMemberList);
  };

  const handleSelectedDelete = async () => {
    try {
      const deletedList = memberList.filter(element => {
        /// focus 가 true 인 것은 삭제 한다
        return element.focus === false;
      });

      setMemberIndexArray(memberIndexArray.slice(0, deletedList.length));
      setMemberList(deletedList);
    } catch (e) {}
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <MainContainer behavior="padding" enabled keyboardVerticalOffset={50}>
        <HeaderBase
          isleftBackButton={true}
          centerTitle={"New Artist"}
          isInputBox={false}
          rightButton={HeaderRightStyles.COMPLETE}
          rightButtonLink={handleComplete}
        />
        <OptionBarActiveType>
          <Touchable
            onPress={() => {
              setactiveTypeState("GROUP");
              Keyboard.dismiss();
            }}
          >
            <OptionActiveType>
              <ActiveTypeText
                focus={activeTypeState === "GROUP" ? true : false}
              >
                {"그룹"}
              </ActiveTypeText>
            </OptionActiveType>
          </Touchable>
          <Touchable
            onPress={() => {
              setactiveTypeState("PERSON");
              Keyboard.dismiss();
            }}
          >
            <OptionActiveType>
              <ActiveTypeText
                focus={activeTypeState === "PERSON" ? true : false}
              >
                {"개인"}
              </ActiveTypeText>
            </OptionActiveType>
          </Touchable>
        </OptionBarActiveType>

        <Container>
          <ScrollView
            bounces={false}
            contentContainerStyle={{
              alignItems: "center",
              width: constants.width
            }}
          >
            {activeTypeState === "GROUP" ? (
              <ContainerInScrollView>
                <SubTitle text={"직업"} />
                <TextInput
                  returnKeyType="done"
                  onChangeText={inputGroupJobType.onChange}
                  value={inputGroupJobType.value}
                  placeholder={"( 가수, 배우, 코미디언 등 )"}
                  placeholderTextColor={styles.textInputPlaceholderColor}
                ></TextInput>
                <SubTitle text={"그룹명"} />
                <TextInput
                  returnKeyType="done"
                  onChangeText={inputGroupNameHan.onChange}
                  value={inputGroupNameHan.value}
                  placeholder={"( 한글 )"}
                  placeholderTextColor={styles.textInputPlaceholderColor}
                ></TextInput>
                <TextInput
                  returnKeyType="done"
                  onChangeText={inputGroupNameEng.onChange}
                  value={inputGroupNameEng.value}
                  placeholder={"( 영문 )"}
                  placeholderTextColor={styles.textInputPlaceholderColor}
                ></TextInput>

                <SubTitle text={"멤버"} />
                <SelectedDeleteBar deleteFunc={handleSelectedDelete} />

                {memberIndexArray.map((member, index) =>
                  index < memberListState.memberList.length ? (
                    <NewMemberItem
                      key={index}
                      text={"멤버명 (" + String(index) + ")"}
                      memberListState={memberListState}
                      index={index}
                    ></NewMemberItem>
                  ) : null
                )}

                <Touchable onPress={() => handleNew()}>
                  <NewContainer>
                    <NewImage
                      source={require("../../../assets/iconmonstr-plus-5-240.png")}
                    />
                    <NewText>New</NewText>
                  </NewContainer>
                </Touchable>
              </ContainerInScrollView>
            ) : (
              <ContainerInScrollView>
                <SubTitle text={"직업"} />
                <TextInput
                  returnKeyType="done"
                  onChangeText={inputPersonJobType.onChange}
                  value={inputPersonJobType.value}
                  placeholder={"( 가수, 배우, 코미디언 등 )"}
                  placeholderTextColor={styles.textInputPlaceholderColor}
                ></TextInput>
                <SubTitle text={"이름"} />
                <TextInput
                  returnKeyType="done"
                  onChangeText={inputPersonNameHan.onChange}
                  value={inputPersonNameHan.value}
                  placeholder={"( 한글 )"}
                  placeholderTextColor={styles.textInputPlaceholderColor}
                ></TextInput>
                <TextInput
                  returnKeyType="done"
                  onChangeText={inputPersonNameEng.onChange}
                  value={inputPersonNameEng.value}
                  placeholder={"( 영문 )"}
                  placeholderTextColor={styles.textInputPlaceholderColor}
                ></TextInput>
              </ContainerInScrollView>
            )}
          </ScrollView>
        </Container>
      </MainContainer>
    </TouchableWithoutFeedback>
  );
};

export default AddArtist;
