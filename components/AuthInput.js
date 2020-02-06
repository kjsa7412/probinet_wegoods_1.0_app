import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
  border: 0.5px solid #57989e;
  justify-content: center;
  margin: 4.5px
  border-radius: 25px;
  width: 247;
  height: 46;
`;

const TextInput = styled.TextInput`
  color: #336064;
  text-align: center;
  font-size: 15;
`;

const AuthInput = ({
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

AuthInput.propTypes = {
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

export default AuthInput;
