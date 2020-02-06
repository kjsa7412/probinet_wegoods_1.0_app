import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import LogInButton from "../../components/LogInButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import {
  REQUEST_SECRET,
  CREATE_ACCOUNT,
  SEE_USER_FROM_EMAIL
} from "./AuthQueries";
import { useMutation, useQuery } from "react-apollo-hooks";
import Logo from "../../components/Logo";

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

const Line = styled.View`
  border: 0.1px solid #57989E
  border-top-width: 0.5;
  margin-top: 10;
  margin-bottom: 10;
  width: 266;
`;

export default ({ navigation, shouldFetch }) => {
  const emailInput = useInput(navigation.getParam("email", ""));
  const [loading, setLoading] = useState(false);

  const [requestSecretMutation] = useMutation(REQUEST_SECRET, {
    variables: {
      email: emailInput.value
    }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: emailInput.value,
      email: emailInput.value,
      password: emailInput.value
    }
  });

  var { data, refetch } = useQuery(SEE_USER_FROM_EMAIL, {
    variables: {
      email: emailInput.value
    },
    skip: !shouldFetch
  });

  const handleSingup = async () => {
    const { value: email } = emailInput;

    if (email === "") {
      return Alert.alert("email can't be empty");
    }
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }

    // 1. 계정 생성을 한다
    try {
      setLoading(true);

      // 계정 생성
      const {
        data: { createAccount }
      } = await createAccountMutation();

      if (createAccount.id) {
        // 계정이 생성되었으면 바로 메일을 발송
        const {
          data: { requestSecret }
        } = await requestSecretMutation();

        if (requestSecret) {
          Alert.alert("Check your email");
          return navigation.navigate("Confirm", {
            email,
            userId: createAccount.id
          });
        } else {
          return Alert.alert("Create Account : Email request fail");
        }
      }
    } catch (e) {
      // User 가 생성되어 있지만 정상적으로 가입이 되어 있지 않은 경우도 있을 수 있다.
      // 추가 정보(username, password) 및 email 인증을 하지 않은 경우
      // console.log(e);
      // Alert.alert("Email taken.", "Log in instead");
      //return navigation.navigate("Login", { email });
    }

    // 2. 계정 생성이 정상적으로 되지 않았을 경우
    try {
      setLoading(true);
      shouldFetch = true;

      // 계정이 존재 하는지 확인한다.
      const {
        data: { seeUserFromEmail }
      } = await refetch();

      if (seeUserFromEmail.id) {
        // 계정이 존재 한다면
        // 현재 가입 상태를 check 한다.
        if (seeUserFromEmail.email === seeUserFromEmail.username) {
          // 계정이 생성되었으나 완전히 가입되지 않은 경우
          // email 로 secret 재요청
          const {
            data: { requestSecret }
          } = await requestSecretMutation();

          if (requestSecret) {
            Alert.alert("Check your email");
            return navigation.navigate("Confirm", {
              email,
              userId: seeUserFromEmail.id
            });
          } else {
            return Alert.alert("UserCheck : Email request check fail");
          }
        } else {
          // 완전히 가입된 상태로 판단되므로 Login page 로 이동
          Alert.alert("Email taken.", "Log in instead");
          return navigation.navigate("Login", { email });
        }
      } else {
        // 계정은 존재하지 않는다. 근데 위에서 안만들어져서 넘어 온것이므로 뭔가 이상
        // 혹은 Network error 로 판단할 수 있다.
        console.log("UserCheck Fail : Network Error");
        return Alert.alert("UserCheck Fail : Network Error");
      }
    } catch (e) {
      // Network error 로 판단할 수 있다. 쿼리 동작이 안된 것으로 본다.
      console.log(e);
      console.log("Create Account Fail : Network Error");
      return Alert.alert("Create Account Fail : Network Error");
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
            {...emailInput}
            placeholder="email"
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={handleSingup}
            autoCorrect={false}
          />
          <AuthButton
            text={"sign up"}
            loading={loading}
            onPress={handleSingup}
            bgColor="#57989E"
          />
          <Line></Line>
          <AuthButton
            text={"google"}
            onPress={() => navigation.navigate("Login")}
            bgColor="#D74937"
          />
          <AuthButton
            text={"kakao"}
            onPress={() => navigation.navigate("Login")}
            bgColor="#ECC300"
          />
        </Center>

        <Bottom>
          <LogInButton
            text={"log in"}
            onPress={() =>
              navigation.navigate("Login", { email: emailInput.value })
            }
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
