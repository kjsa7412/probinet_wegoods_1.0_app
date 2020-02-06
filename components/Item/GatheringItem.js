import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import styles from "../../styles";
import constants from "../../constants";

const Touchable = styled.TouchableOpacity``;

const GatheringItemContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth};
`;

const GatheringItemImage = styled.Image`
  width: 327;
  height: 90;
`;

const GatheringItemTitle = styled.Text`
  color: ${styles.blackColor};
  text-align: center;
  font-size: 18;
  font-family: NanumBarunGothicLight;
  margin-top: 15;
`;

const GatheringItemSubTitle = styled.Text`
  color: #acabab;
  text-align: center;
  font-size: 13;
  font-family: NanumBarunGothicLight;
  margin-top: 5;
`;

const GatheringItem = ({ onPress, id, file, title, subTitle }) => {
  return (
    <Touchable onPress={onPress}>
      <GatheringItemContainer>
        <GatheringItemImage source={{ uri: file }} />
        <GatheringItemTitle>{title}</GatheringItemTitle>
        <GatheringItemSubTitle>{subTitle}</GatheringItemSubTitle>
      </GatheringItemContainer>
    </Touchable>
  );
};
GatheringItem.propTypes = {
  onPress: PropTypes.func,
  id: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
};

export default GatheringItem;
