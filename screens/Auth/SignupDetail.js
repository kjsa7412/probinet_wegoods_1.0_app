import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { EDIT_USER_SIGNUP } from "./AuthQueries";
import Logo from "../../components/Logo";
import { useMutation } from "react-apollo-hooks";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #d0f0f2;
`;

const Center = styled.View`
  margin-top: 45;
  align-items: center;
  flex: 1;
`;

const Bottom = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 19;
`;

const BottomText = styled.Text`
  margin-top: 21;
  font-size: 6;
`;

export default ({ navigation, shouldFetch }) => {
  const email = navigation.getParam("email", "");
  const confirmSecret = navigation.getParam("confirmSecret", "");
  const userId = navigation.getParam("userId", "");
  const usernameInput = useInput("");
  const passwordInput = useInput("");
  const passwordCheckInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);

  const [editUserSignUpMutation] = useMutation(EDIT_USER_SIGNUP, {
    variables: {
      id: userId,
      username: usernameInput.value,
      password: passwordInput.value
    }
  });

  const handleComplete = async () => {
    // 예외 처리 1. 입력을 하지 않은 경우
    if (usernameInput.value === "") {
      return Alert.alert("email can't be empty");
    }
    if (passwordInput.value === "") {
      return Alert.alert("password can't be empty");
    }
    if (passwordCheckInput.value === "") {
      return Alert.alert("passwordcheck can't be empty");
    }

    // 예외 처리 2. username 에 @를 사용한경우
    if (usernameInput.value.includes("@")) {
      // username 에는 @를 사용하지 못하도록 설정한다
      return Alert.alert("Don't use '@' to username");
    }

    // 예외 처리 3. passwordInput 와 passwordCheckInput 가 같지 않은 경우
    if (passwordInput.value !== passwordCheckInput.value) {
      // username 에는 @를 사용하지 못하도록 설정한다
      return Alert.alert("password check fail");
    }

    try {
      setLoading(true);
      const {
        data: { editUserSignUp }
      } = await editUserSignUpMutation();

      if (editUserSignUp.id) {
        Alert.alert("complete");
        logIn(confirmSecret);
      } else {
        console.log("username is duplicated");
        Alert.alert("username is duplicated");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("username set fail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Logo text={"WeGoods"} />
        <Center>
          <AuthInput
            {...usernameInput}
            placeholder="username"
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={handleComplete}
            autoCorrect={false}
          />
          <AuthInput
            {...passwordInput}
            placeholder="password"
            returnKeyType="send"
            onSubmitEditing={handleComplete}
            autoCorrect={false}
            secureTextEntry={true}
          />
          <AuthInput
            {...passwordCheckInput}
            placeholder="password check"
            returnKeyType="send"
            onSubmitEditing={handleComplete}
            autoCorrect={false}
            secureTextEntry={true}
          />
          <AuthButton
            text="complete"
            loading={loading}
            onPress={handleComplete}
            bgColor="#57989E"
          />
        </Center>
        <Bottom>
          <BottomText>
            "가입 진행 시 , 이용약관 및 개인정보처리방침에 대해 동의한 것으로
            간주됩니다."
          </BottomText>
        </Bottom>
      </View>
    </TouchableWithoutFeedback>
  );
};
