import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../../styles";
import { BoxShadow } from "react-native-shadow";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 12;
  margin-right: 12;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 27;
  width: 27;
  height: 27;
  position: relative;
  overflow: hidden;
  background-color: ${styles.whiteColor};
`;

const shadowOpt = {
  width: 27,
  height: 27,
  color: "#000",
  border: 2,
  radius: 13,
  opacity: 0.2
};

const Image = styled.Image`
  width: 14;
  height: 14;
`;

const FilterItemAddButton = ({ onPress }) => {
  return (
    <Touchable onPress={onPress}>
      <MainContainer>
        <BoxShadow setting={shadowOpt}>
          <Container>
            <Image
              source={require("../../assets/iconmonstr-plus-thin-240.png")}
            ></Image>
          </Container>
        </BoxShadow>
      </MainContainer>
    </Touchable>
  );
};

FilterItemAddButton.propTypes = {
  onPress: PropTypes.func
};

export default FilterItemAddButton;
