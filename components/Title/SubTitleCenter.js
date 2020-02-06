import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../constants";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  width: ${constants.width};
  height: 72;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 14;
  font-family: NanumBarunGothicBold;
  text-decoration: underline;
`;

const SubTitleCenter = ({ text }) => (
  <MainContainer>
    <Text>{text}</Text>
  </MainContainer>
);

SubTitleCenter.propTypes = {
  text: PropTypes.string.isRequired
};

export default SubTitleCenter;
