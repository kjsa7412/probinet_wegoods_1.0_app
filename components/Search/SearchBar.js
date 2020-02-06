import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../../styles";

const TextInput = styled.TextInput`
  background-color: ${styles.searchBarBGColor};
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothicLight;
  padding-left: 15;
  padding-right: 15;
  border-radius: 5px;
`;

const SearchBar = ({
  onChange,
  value,
  onSubmitEditing = () => null,
  placeholder
}) => (
  <TextInput
    returnKeyType="search"
    onChangeText={onChange}
    onEndEditing={onSubmitEditing}
    value={value}
    placeholder={placeholder !== undefined ? placeholder : "Search"}
    placeholderTextColor={styles.searchBarPlaceholderColor}
    style={value ? { fontSize: 13 } : { fontSize: 10 }}
    autoCapitalize="none"
    autoCorrect={false}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  onSubmitEditing: PropTypes.func
};
export default SearchBar;
