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
const Line = styled.View`
  border: 0.1px solid #F7F7F7
  border-top-width: 0.5;
  width: ${styles.baseWidth};
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

const AnswerContentsText = styled.Text`
  color: ${styles.redColor};
  text-align: left;
  font-size: 15;
  font-family: NanumBarunGothicBold;
  margin-left: 5;
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

/// ----------
export const SEE_MY_QUIZ = gql`
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

export const SEE_QUIZ = gql`
  query search($id: String!) {
    seeOneQuiz(id: $id) {
      id
      title
      question
      answers
      rightAnswer
    }
  }
`;

export const EDIT_QUIZ = gql`
  mutation editQuiz(
    $id: String!
    $title: String!
    $question: String!
    $answers: [String!]!
    $rightAnswer: Int
    $action: ACTIONS!
  ) {
    editQuiz(
      id: $id
      title: $title
      question: $question
      answers: $answers
      rightAnswer: $rightAnswer
      action: $action
    ) {
      id
    }
  }
`;

export default ({ navigation }) => {
  /// state ----------
  const [checking, setChecking] = useState(false);
  const [loading, setLoading] = useState(true);

  const caption = navigation.getParam("caption");
  const quizId = navigation.getParam("quizId");

  const titleInput = useInput(navigation.getParam("title", ""));
  const questionInput = useInput(navigation.getParam("question", ""));
  const [answers, setAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(-1);

  /// 쿼리 ----------
  let quizResult = useQuery(SEE_QUIZ, {
    variables: {
      id: quizId
    },
    fetchPolicy: "network-only"
  });

  const [editQuizMutation] = useMutation(EDIT_QUIZ, {
    refetchQueries: () => [{ query: SEE_MY_QUIZ }]
  });

  /// 초기세팅 ----------
  if (!quizResult.loading && loading) {
    if (quizResult.data !== undefined) {
      /// title
      titleInput.setValue(quizResult.data.seeOneQuiz.title);

      /// question
      questionInput.setValue(quizResult.data.seeOneQuiz.question);

      /// rightAnswer
      setRightAnswer(quizResult.data.seeOneQuiz.rightAnswer);

      /// answers
      const tempAnswers = [];

      quizResult.data.seeOneQuiz.answers.map((value, index) => {
        if (index === quizResult.data.seeOneQuiz.rightAnswer) {
          tempAnswers.push({
            answer: value,
            rightAnswer: true,
            isChecked: false
          });
        } else {
          tempAnswers.push({
            answer: value,
            rightAnswer: false,
            isChecked: false
          });
        }
      });

      setAnswers(tempAnswers);
    }
    setLoading(false);
  }

  /// Function ----------

  const selectAnswer = id => {
    checking ? setChecking(false) : setChecking(true);

    answers.map((value, index) => {
      if (index === id) {
        value.isChecked ? (value.isChecked = false) : (value.isChecked = true);
      }
    });
  };

  const selectRightAnswer = id => {
    checking ? setChecking(false) : setChecking(true);

    answers.map((value, index) => {
      if (index === id) {
        value.rightAnswer = true;
        setRightAnswer(index);
      } else {
        value.rightAnswer = false;
      }
    });
  };

  const deleteAnswer = () => {
    const tempAnswers = [];

    setRightAnswer(-1);

    answers.map((value, index) => {
      if (!value.isChecked) {
        tempAnswers.push(value);

        if (value.rightAnswer) {
          setRightAnswer(index);
        }
      }
    });

    setAnswers(tempAnswers);
  };

  addAnswer = async (text = "", navigation) => {
    checking ? setChecking(false) : setChecking(true);
    navigation.goBack();

    if (text !== "") {
      const tempAnswers = answers;

      tempAnswers.push({
        answer: text,
        rightAnswer: false,
        isChecked: false
      });

      setAnswers(tempAnswers);
    }
  };

  const completeQuiz = async () => {
    if (titleInput.value === "") {
      Alert.alert("1");
    } else if (questionInput.value === "") {
      Alert.alert("2");
    } else if (answers.length === 0) {
      Alert.alert("3");
    } else if (rightAnswer === -1) {
      Alert.alert("4");
    } else if (rightAnswer >= answers.length) {
      Alert.alert("5");
    } else {
      try {
        let val = [];
        answers.map(value => {
          val.push(value.answer);
        });

        const {
          data: { editQuiz }
        } = await editQuizMutation({
          variables: {
            id: quizId,
            title: titleInput.value,
            question: questionInput.value,
            answers: val,
            rightAnswer: rightAnswer,
            action: "EDIT"
          }
        });

        if (editQuiz) {
          Alert.alert("OK");
        }
      } catch (e) {
      } finally {
        navigation.goBack();
      }
    }
  };

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        centerTitle={caption}
        rightButton={HeaderRightStyles.COMPLETE}
        rightButtonLink={completeQuiz}
      />
      {quizResult.loading || loading ? (
        <Loader />
      ) : (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <TitleContainer>
            <TitleText>퀴즈 제목</TitleText>
          </TitleContainer>
          <BaseInput
            {...titleInput}
            placeholder="퀴즈제목을 입력해주세요"
            keyboardType="default"
            returnKeyType="next"
            autoCorrect={false}
          />
          <Line />
          <TitleContainer>
            <TitleText>질문</TitleText>
          </TitleContainer>
          <BaseInput
            {...questionInput}
            placeholder="질문을 입력해주세요"
            keyboardType="default"
            returnKeyType="next"
            autoCorrect={false}
          />
          <Line />
          <TitleContainer>
            <TitleText>문항</TitleText>
          </TitleContainer>
          <OptionContainer>
            <Touchable onPress={deleteAnswer}>
              <OptionItemContainer>
                <DeleteItemImage
                  source={require("../../../../../assets/iconmonstr-check-mark-thin-240.png")}
                />
                <DeleteItemText>선택삭제</DeleteItemText>
              </OptionItemContainer>
            </Touchable>
          </OptionContainer>
          {answers.map((value, index) => {
            return (
              <ContentsContainer key={index}>
                <Touchable
                  onPress={() => {
                    selectRightAnswer(index);
                  }}
                >
                  <ContentsTextContainer>
                    <ContentsText>{value.answer}</ContentsText>
                    {value.rightAnswer ? (
                      <AnswerContentsText>(정답)</AnswerContentsText>
                    ) : null}
                  </ContentsTextContainer>
                </Touchable>
                <Touchable
                  onPress={() => {
                    selectAnswer(index);
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
          <Touchable
            onPress={() =>
              navigation.push("NewAnswer", { addAnswer: this.addAnswer })
            }
          >
            <NewContainer>
              <NewImage
                source={require("../../../../../assets/iconmonstr-plus-5-240.png")}
              />
              <NewText>New</NewText>
            </NewContainer>
          </Touchable>
        </ScrollView>
      )}
    </MainContainer>
  );
};
