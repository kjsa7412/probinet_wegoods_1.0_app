import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import styles from "../../../styles";
import constants from "../../../constants";

const Touchable = styled.TouchableOpacity``;

const OptionBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: ${styles.baseWidth};
  height: ${styles.headerHeight};
`;

const OptionBarItemContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth / 2};
  height: ${styles.headerHeight / 2};
`;

const OptionBarText = styled.Text`
  color: ${props => (props.bgColor ? props.bgColor : props.theme.blackColor)};
  text-align: center;
  font-size: 21;
  font-family: NanumBarunGothicBold;
`;

const TwoOptionBar = ({ onPress, what, leftText, rightText }) => {
  return (
    <OptionBarContainer>
      <Touchable>
        <OptionBarItemContainer>
          <OptionBarText bgColor={what === "left" ? "#000000" : "#CECECE"}>
            {leftText}
          </OptionBarText>
        </OptionBarItemContainer>
      </Touchable>
      <Touchable>
        <OptionBarItemContainer>
          <OptionBarText bgColor={what === "right" ? "#000000" : "#CECECE"}>
            {rightText}
          </OptionBarText>
        </OptionBarItemContainer>
      </Touchable>
    </OptionBarContainer>
  );
};

TwoOptionBar.propTypes = {
  onPress: PropTypes.func.isRequired,
  what: PropTypes.string.isRequired,
  leftText: PropTypes.string.isRequired,
  rightText: PropTypes.string.isRequired
};

export default TwoOptionBar;
