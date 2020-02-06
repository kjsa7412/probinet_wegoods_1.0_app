import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import * as Facebook from "expo-facebook";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { REQUEST_SECRET, CREATE_ACCOUNT } from "./AuthQueries";
import * as Google from "expo-google-app-auth";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const GoogleContainer = styled.View`
  margin-top: 20px;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam("email", ""));
  const usernameInput = useInput("");
  const passwordInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    }
  });
  const handleSingup = async () => {
    const { value: email } = emailInput;
    const { value: username } = usernameInput;
    const { value: password } = passwordInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }

    if (username === "") {
      return Alert.alert("Invalid username");
    }

    if (password === "") {
      return Alert.alert("Invalid password");
    }

    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount.id) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    const GOOGLE_ID =
      "448053385228-vermcfnoukdqj5542nt6g7nrtt2nu3hh.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ID,
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` }
        });
        const { email, family_name, given_name } = await user.json();
        updateFormData(email, given_name, family_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    fNameInput.setValue(firstName);
    lNameInput.setValue(lastName);
    const [username] = email.split("@");
    usernameInput.setValue(username);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...passwordInput}
          placeholder="password"
          autoCapitalize="words"
        />
        <AuthButton loading={loading} onPress={handleSingup} text="Sign up" />

        <GoogleContainer>
          <AuthButton
            bgColor={"#EE1922"}
            loading={false}
            onPress={googleLogin}
            text="Connect Google"
          />
        </GoogleContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
