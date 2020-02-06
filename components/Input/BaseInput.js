import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../constants";
import styles from "../../styles";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextInput = styled.TextInput`
  width: ${styles.baseWidth};
  height: 54;
  color: ${styles.blackColor};
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothicLight;
  padding-left: 15;
  padding-right: 15;
`;

const BaseInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  returnKeyType = "done",
  onChange,
  onSubmitEditing = () => null,
  autoCorrect = true,
  secureTextEntry
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
      value={value}
      secureTextEntry={secureTextEntry}
    />
  </Container>
);

BaseInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
    "visible-password"
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
  contextMenuHidden: PropTypes.bool,
  secureTextEntry: PropTypes.bool
};

export default BaseInput;
