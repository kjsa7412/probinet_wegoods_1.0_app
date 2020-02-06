import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
  border: 0.5px solid #57989e;
  justify-content: center;
  margin: 4.5px
  border-radius: 25px;
  width: 247;
  height: 46;
`;

const Text = styled.Text`
  text-align: center;
  font-size: 15;
`;

const AuthTextBox = ({ text = false, bgColor = null }) => (
  <Container bgColor={bgColor}>
    <Text>{text}</Text>
  </Container>
);

AuthTextBox.propTypes = {
  text: PropTypes.string.isRequired
};

export default AuthTextBox;
