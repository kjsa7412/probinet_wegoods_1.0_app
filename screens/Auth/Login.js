import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { CONFIRM_PASSWORD } from "./AuthQueries";
import Logo from "../../components/Logo";
import LogInButton from "../../components/LogInButton";
import { useQuery } from "react-apollo-hooks";
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
  const emailOrUsernameInput = useInput(navigation.getParam("email", ""));
  const passwordInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);

  var { data, refetch } = useQuery(CONFIRM_PASSWORD, {
    variables: {
      email: emailOrUsernameInput.value,
      username: emailOrUsernameInput.value,
      password: passwordInput.value
    },
    skip: !shouldFetch
  });

  const handleLogin = async () => {
    // 예외 처리 1. 입력을 하지 않은 경우
    if (emailOrUsernameInput.value === "") {
      return Alert.alert("email can't be empty");
    }
    if (passwordInput.value === "") {
      return Alert.alert("password can't be empty");
    }

    var flagEmail = false;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      emailOrUsernameInput.value.includes("@") &&
      emailOrUsernameInput.value.includes(".") &&
      emailRegex.test(emailOrUsernameInput.value)
    ) {
      // email 인 경우 와 아닌 경우로 나눠서 어던 것으로 먼저 쿼리를 날려 볼지 선정한다.
      flagEmail = true;
    }

    if (flagEmail) {
      var email = emailOrUsernameInput.value;
    } else {
      var username = emailOrUsernameInput.value;
    }

    try {
      setLoading(true);
      shouldFetch = true;
      const {
        data: { confirmPassword }
      } = await refetch();

      if (confirmPassword !== "" || confirmPassword !== false) {
        logIn(confirmPassword);
      } else {
        console.log("Can't Login");
        Alert.alert("Can't Login");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't Login ");
    } finally {
      setLoading(false);
      shouldFetch = false;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Logo text={"WeGoods"} />
        <Center>
          <AuthInput
            {...emailOrUsernameInput}
            placeholder="email or username"
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={handleLogin}
            autoCorrect={false}
          />
          <AuthInput
            {...passwordInput}
            placeholder="password"
            returnKeyType="send"
            onSubmitEditing={handleLogin}
            autoCorrect={false}
            secureTextEntry={true}
          />
          <AuthButton
            text="log in"
            loading={loading}
            onPress={handleLogin}
            bgColor="#57989E"
          />
        </Center>
        <Bottom>
          <LogInButton
            text={"sing up"}
            onPress={() => navigation.navigate("AuthHome")}
            bgColor="#91CACE"
          ></LogInButton>

          <BottomText>
            "가입 진행 시 , 이용약관 및 개인정보처리방침에 대해 동의한 것으로
            간주됩니다."
          </BottomText>
        </Bottom>
      </View>
    </TouchableWithoutFeedback>
  );
};
