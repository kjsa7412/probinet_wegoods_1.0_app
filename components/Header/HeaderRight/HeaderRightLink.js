import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image``;

const Text = styled.Text`
  font-size: 13;
  font-family: NanumBarunGothicBold;
`;

const HeaderRightLink = withNavigation(({ navigation, rightButton }) => {
  return (
    <Container>
      {rightButton.iconUri !== undefined && rightButton.text === undefined ? (
        <Image
          source={rightButton.iconUri}
          style={rightButton.style !== undefined ? rightButton.style : null}
        />
      ) : rightButton.iconUri === undefined &&
        rightButton.text !== undefined ? (
        <Text>{rightButton.text}</Text>
      ) : null}
    </Container>
  );
});

HeaderRightLink.propTypes = {
  rightButton: PropTypes.object,
  OnPress: PropTypes.func
};

export default HeaderRightLink;
