import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import styles from "../../styles";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.weGoodsColor};
  justify-content: center;
  border-radius: 20;
  width: 288;
  height: 40;
`;

const Text = styled.Text`
  color: ${props => props.theme.whiteColor};
  text-align: center;
  font-size: 18;
  letter-spacing: 1;
  font-family: NanumBarunGothicBold;
`;

const registerFilterButton = ({
  text,
  onPress,
  loading = false,
  bgColor = null
}) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

registerFilterButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default registerFilterButton;
