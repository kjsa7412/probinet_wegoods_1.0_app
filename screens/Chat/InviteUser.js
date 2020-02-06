/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../../components/Loader";
import styles from "../../styles";
import useInput from "../../hooks/useInput";
import constants from "../../constants";
import HeaderBase from "../../components/Header/HeaderBase";
import HeaderRightStyles from "../../components/Header/HeaderRight/HeaderRightStyles";

/// ----------
/// Styled Components

///
const Touchable = styled.TouchableOpacity``;

///
const FullContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
  background-color: ${styles.containerTestColor};
`;

const ScreenContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${styles.baseWidth};
  height: 100%;
`;

export default ({ navigation }) => {
  const serchText = useInput("");

  const search = async () => {
    return console.log("검색");
  };

  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase
          isleftBackButton={true}
          isInputBox={true}
          {...serchText}
          onSubmit={search}
          rightButton={HeaderRightStyles.COMPLETE}
          rightButtonLink={() => {}}
        />
      </ScreenContainer>
    </FullContainer>
  );
};
