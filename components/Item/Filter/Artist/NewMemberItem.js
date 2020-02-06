import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback } from "react-native";
import constants from "../../../../constants";
import styles from "../../../../styles";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  width: ${constants.width};
  height: 162;
  justify-content: center;
`;

const Container = styled.View`
  width: ${constants.width};
  height: 54;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 13;
  font-family: NanumBarunGothicBold;
  margin-left: 14;
`;

const CheckImage = styled.Image`
  margin-right: 14;
  width: 27;
  height: 27;
`;

const EmptyCheckBox = styled.View`
  margin-right: 14;
  width: 27;
  height: 27;
  border-radius: 50;
  border: 2px solid ${styles.myFilterCheckBorderColor};
`;

const TextInput = styled.TextInput`
  font-size: 13;
  font-family: NanumBarunGothic;
  width: ${constants.width};
  height: 54;
  padding-left: 14;
`;

const NewMemberItem = ({ text, memberListState, index }) => {
  const [nameHan, setNameHan] = useState("");
  const [nameEng, setNameEng] = useState("");

  return (
    <TouchableWithoutFeedback>
      <MainContainer>
        <Container>
          <TitleText>{text}</TitleText>

          <Touchable
            onPress={() => {
              // memberList 의 check 상태 변경
              let newMemberList = memberListState.memberList.slice();

              newMemberList.splice(index, 1, {
                focus: memberListState.memberList[index].focus ? false : true,
                inputNameHan: memberListState.memberList[index].inputNameHan,
                inputNameEng: memberListState.memberList[index].inputNameEng
              });
              memberListState.setMemberList(newMemberList);
            }}
          >
            {memberListState.memberList[index].focus ? (
              <CheckImage
                source={require("../../../../assets/iconmonstr-check-mark-4-240.png")}
              />
            ) : (
              <EmptyCheckBox />
            )}
          </Touchable>
        </Container>
        <Container>
          <TextInput
            returnKeyType="done"
            onChangeText={text => {
              setNameHan(text);

              let newMemberList = memberListState.memberList.slice();
              newMemberList.splice(index, 1, {
                focus: memberListState.memberList[index].focus,
                inputNameHan: text,
                inputNameEng: memberListState.memberList[index].inputNameEng
              });

              memberListState.setMemberList(newMemberList);
            }}
            value={memberListState.memberList[index].inputNameHan}
            placeholder={"( 한글 )"}
            placeholderTextColor={styles.textInputPlaceholderColor}
          ></TextInput>
        </Container>
        <Container>
          <TextInput
            returnKeyType="done"
            onChangeText={text => {
              setNameEng(text);

              let newMemberList = memberListState.memberList.slice();
              newMemberList.splice(index, 1, {
                focus: memberListState.memberList[index].focus,
                inputNameHan: memberListState.memberList[index].inputNameHan,
                inputNameEng: text
              });

              memberListState.setMemberList(newMemberList);
            }}
            value={memberListState.memberList[index].inputNameEng}
            placeholder={"( 영문 )"}
            placeholderTextColor={styles.textInputPlaceholderColor}
          ></TextInput>
        </Container>
      </MainContainer>
    </TouchableWithoutFeedback>
  );
};

NewMemberItem.propTypes = {
  text: PropTypes.string.isRequired,
  memberListState: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default NewMemberItem;
