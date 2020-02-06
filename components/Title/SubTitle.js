import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../constants";

const MainContainer = styled.View`
  width: ${constants.width};
  height: 54;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-left: 14;
`;

const SubTitle = ({ text }) => (
  <TouchableWithoutFeedback>
    <MainContainer>
      <Text>{text}</Text>
    </MainContainer>
  </TouchableWithoutFeedback>
);

SubTitle.propTypes = {
  text: PropTypes.string.isRequired
};

export default SubTitle;
