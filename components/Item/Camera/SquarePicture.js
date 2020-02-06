import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../../constants";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  margin-left: ${props => (props.isCenter ? 1.5 : 0)};
  margin-right: ${props => (props.isCenter ? 1.5 : 0)};
  margin-bottom: 1;
`;

const Picture = styled.Image`
  width: ${constants.width / 3 - 1};
  height: ${constants.width / 3 - 1};
`;
const CheckBox = styled.Image`
  position: absolute;
  width: 22;
  height: 22;
  top: 5;
  right: 5;
`;

const SquarePicture = ({ photo, index, onPressSelect }) => {
  let isCenter = index % 3 === 0 ? true : false;

  onPressSelect;
  return (
    <Touchable
      onPress={() => (
        onPressSelect.setSelectedPhoto(photo),
        onPressSelect.selectPhoto(photo.uri)
      )}
    >
      <Container isCenter={isCenter}>
        <Picture source={{ uri: photo.uri }} />
        {photo.checked ? (
          <CheckBox
            source={require("../../../assets/iconmonstr-check-mark-4-240.png")}
          />
        ) : null}
      </Container>
    </Touchable>
  );
};

SquarePicture.propTypes = {
  photo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onPressSelect: PropTypes.object
};

export default SquarePicture;
