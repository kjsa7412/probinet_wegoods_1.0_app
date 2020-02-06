import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../../styles";
import { AsyncStorage } from "react-native";
import { View, ScrollView, RefreshControl } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  justify-content: center;
  width: ${styles.baseWidth};
  height: 54;
`;
const Text = styled.Text`
  color: ${props => props.theme.blackColor};
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothicLight;
  margin-left: 15;
`;

const Line = styled.View`
  border: 0.5px solid #F7F7F7
  border-top-width: 0.5;
  width: ${styles.baseWidth};
`;

const LocationSearchResult = ({ navigation, id, text }) => {
  const selectLocation = () => {
    navigation.state.params.updateLocation(id, text, navigation);
  };

  return (
    <Touchable onPress={selectLocation}>
      <Container>
        <Text>{text}</Text>
      </Container>
      <Line />
    </Touchable>
  );
};

LocationSearchResult.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default LocationSearchResult;
