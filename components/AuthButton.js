import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.blueColor};
  justify-content: center;
  margin: 4.5px
  border-radius: 25px;
  width: 247;
  height: 45;
`;
//width: ${constants.width / 1.52};
//height: ${constants.height / 15.06};

const Text = styled.Text`
  color: white;
  text-align: center;
  font-size: 15;
`;

const AuthButton = ({ text, onPress, loading = false, bgColor = null }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default AuthButton;
