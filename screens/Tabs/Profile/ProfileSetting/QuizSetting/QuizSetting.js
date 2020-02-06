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
import useInput from "../../../../../hooks/useInput";
import constants from "../../../../../constants";
import styles from "../../../../../styles";
import HeaderRightStyles from "../../../../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../../../../components/Loader";
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
const ContentsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${styles.baseWidth};
  height: 90;
`;

const ContentsTextContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: ${(styles.baseWidth / 4) * 3};
  height: 90;
`;

const ContentsText = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicLight;
  margin-left: 15;
`;

const ContentsImageContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: ${styles.baseWidth / 4};
  height: 90;
`;

const ContentsImage = styled.Image`
  width: 28;
  height: 28;
  border-radius: 14;
  margin-right: 15;
`;

/// ----------
export const SEE_QUIZ = gql`
  {
    seeMyQuizList {
      id
      title
      question
      answers
      rightAnswer
    }
  }
`;

const DELETE_QUIZ = gql`
  mutation deleteQuiz($quizId: [String!]!) {
    deleteQuiz(quizId: $quizId) {
      count
    }
  }
`;

let deleteId = [];

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [checking, setChecking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  let quizResult = useQuery(SEE_QUIZ, { fetchPolicy: "network-only" });

  const [deleteQuizMutation] = useMutation(DELETE_QUIZ, {
    variables: {
      quizId: deleteId
    }
  });

  const refresh = async () => {
    try {
      setRefreshing(true);

      deleteId = [];

      await quizResult.refetch();

      if (quizResult.data !== undefined) {
        quizResult.data.seeMyQuizList.map(value => {
          value.isChecked = false;
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  if (!quizResult.loading && loading) {
    if (quizResult.data !== undefined) {
      quizResult.data.seeMyQuizList.map(value => {
        value.isChecked = false;
      });
    }
    setLoading(false);
  }

  const handleQuiz = id => {
    checking ? setChecking(false) : setChecking(true);

    deleteId = [];

    quizResult.data.seeMyQuizList.map(value => {
      if (value.id === id) {
        value.isChecked ? (value.isChecked = false) : (value.isChecked = true);
      }

      if (value.isChecked) {
        deleteId.push(value.id);
      }
    });
  };

  const deleteQuiz = async () => {
    try {
      if (deleteId.length !== 0) {
        setDeleting(true);

        const {
          data: { deleteQuiz }
        } = await deleteQuizMutation();

        if (deleteQuiz) {
          Alert.alert("삭제되었습니다.");
        }

        await refresh();
      }
    } catch (e) {
      console.log(e);
      Alert.alert("문제발생", "Log in instead");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        centerTitle={"퀴즈관리"}
        rightButton={HeaderRightStyles.ADD}
        rightButtonLink={() =>
          navigation.push("AddQuiz", { caption: "새 퀴즈" })
        }
      />
      <OptionContainer>
        <Touchable onPress={deleteQuiz}>
          <OptionItemContainer>
            <DeleteItemImage
              source={require("../../../../../assets/iconmonstr-check-mark-thin-240.png")}
            />
            <DeleteItemText>선택삭제</DeleteItemText>
          </OptionItemContainer>
        </Touchable>
      </OptionContainer>
      {quizResult.loading || loading || deleting ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
          {quizResult.data.seeMyQuizList.map(value => {
            return (
              <ContentsContainer key={value.id}>
                <Touchable
                  onPress={() =>
                    navigation.push("EditQuiz", {
                      caption: "퀴즈 관리",
                      quizId: value.id
                    })
                  }
                >
                  <ContentsTextContainer>
                    <ContentsText>{value.title}</ContentsText>
                  </ContentsTextContainer>
                </Touchable>
                <Touchable
                  onPress={() => {
                    handleQuiz(value.id);
                  }}
                >
                  <ContentsImageContainer>
                    <ContentsImage
                      source={
                        value.isChecked
                          ? require("../../../../../assets/iconmonstr-check-mark-16-240.png")
                          : require("../../../../../assets/iconmonstr-circle-2-240.png")
                      }
                    />
                  </ContentsImageContainer>
                </Touchable>
              </ContentsContainer>
            );
          })}
        </ScrollView>
      )}
    </MainContainer>
  );
};
