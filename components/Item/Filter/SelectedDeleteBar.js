import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../../constants";
import styles from "../../../styles";
import { Image, TouchableWithoutFeedback } from "react-native";

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const MainContainer = styled.View`
  flex-direction: row;
  width: ${constants.width};
  height: 37;
  justify-content: flex-end;
  align-items: center;
`;

const Text = styled.Text`
  color: ${styles.weGoodsColor};
  font-size: 14;
  font-family: NanumBarunGothic;
  margin-right: 18;
  margin-left: 4;
`;

const SelectedDeleteBar = ({ deleteFunc }) => {
  return (
    <TouchableWithoutFeedback>
      <MainContainer>
        <Touchable onPress={() => deleteFunc()}>
          <Image
            style={{ width: 11, height: 9 }}
            source={require("../../../assets/iconmonstr-check-mark-1-240.png")}
          />
          <Text>{"선택삭제"}</Text>
        </Touchable>
      </MainContainer>
    </TouchableWithoutFeedback>
  );
};

SelectedDeleteBar.propTypes = {
  deleteFunc: PropTypes.func
};

export default SelectedDeleteBar;
