import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import action from "../../../action";
import styles from "../../../styles";

import { Image } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props => props.theme.whiteColor};
  width: 54;
  height: 111.39;
  margin-left: 14.5;
  margin-right: 14.5;
  align-items: center;
`;

const ConditionBox = styled.View`
  background-color: ${props =>
    props.condition === action.NEW ? "#DE4B4A" : props.theme.whiteColor};
  justify-content: center;
  align-items: center;
  width: 14;
  height: 13;
  margin-bottom: 5;
  border-radius: 50;
`;

const ConditionMessage = styled.Text`
  color: white;
  text-align: center;
  font-size: 7;
  font-family: NanumBarunGothic;
`;

const ConditionBorder = styled.View`
  background-color: ${props =>
    props.condition === action.SELECT
      ? "#91CACE"
      : props.condition === action.NEW
      ? "#DE4B4A"
      : props.theme.whiteColor};

  height: 49;
  width: 49;
  border-radius: 20;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
`;

const FilterImage = styled.Image`
  height: 45;
  width: 45;
  border-radius: 20;
  background-color: ${props =>
    props.source !== undefined && props.source.uri !== ""
      ? styles.weGoodsColor + "00"
      : styles.weGoodsColor};
`;

const Bumper = styled.View`
  height: 14;
`;

const Title = styled.Text`
  color: black;
  text-align: center;
  font-size: 15;
  font-family: NanumBarunGothicLight;
`;

const MyFilterItemInGoods = ({
  myFilterImageUri = "",
  title,
  condition = null,
  conditionMessage = null
}) => (
  <Touchable>
    <Container>
      {condition === action.SELECT ? (
        <ConditionBox condition={condition}>
          <Image
            style={{ width: 14, height: 14 }}
            source={require("../../../assets/iconmonstr-check-mark-4-240.png")}
          />
        </ConditionBox>
      ) : (
        <ConditionBox condition={condition}>
          <ConditionMessage>{conditionMessage}</ConditionMessage>
        </ConditionBox>
      )}

      <ConditionBorder condition={condition}>
        {myFilterImageUri !== "" ? (
          <FilterImage source={{ uri: myFilterImageUri }} />
        ) : (
          <FilterImage />
        )}
      </ConditionBorder>

      <Bumper />
      <Title>{title}</Title>
    </Container>
  </Touchable>
);

MyFilterItemInGoods.propTypes = {
  myFilterImageUri: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default MyFilterItemInGoods;
