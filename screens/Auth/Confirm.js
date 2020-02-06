import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import LogInButton from "../../components/LogInButton";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
import Logo from "../../components/Logo";
import AuthTextBox from "../../components/AuthTextBox";

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

export default ({ navigation }) => {
  const userId = navigation.getParam("userId", "");
  const email = useInput(navigation.getParam("email", ""));
  const confirmInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: email.value
    }
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret }
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        navigation.navigate("SignupDetail", { confirmSecret, userId });
      } else {
        Alert.alert("Wrong secret!");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Logo text={"WeGoods"} />

        <Center>
          <AuthTextBox text={email.value} />
          <AuthInput
            {...confirmInput}
            placeholder="secret"
            returnKeyType="send"
            onSubmitEditing={handleConfirm}
            autoCorrect={false}
          />
          <AuthButton
            text="confirm"
            loading={loading}
            onPress={handleConfirm}
            bgColor="#57989E"
          />
        </Center>

        <Bottom>
          <LogInButton
            text={"back"}
            onPress={() =>
              navigation.navigate("AuthHome", { email: email.value })
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
