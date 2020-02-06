import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props => props.theme.whiteColor};
  width: 375;
  height: 90;
  justify-content: center;
`;

const Bumper = styled.View`
  height: 5;
`;

const Text = styled.Text`
  color: black;
  text-align: center;
  font-size: 27;
  font-family: NanumBarunGothicBold;
`;

const ExplainText = styled.Text`
  color: #6d6d6d;
  text-align: center;
  font-size: 10;
  font-family: NanumBarunGothicLight;
`;

const ExplainTitle = ({ onPress, text, explainText }) => (
  <Touchable onPress={onPress}>
    <Container>
      <Text>{text}</Text>
      <Bumper />
      <ExplainText>{explainText}</ExplainText>
    </Container>
  </Touchable>
);

ExplainTitle.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  explainText: PropTypes.string.isRequired
};

export default ExplainTitle;
