/// ----------
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

/// ----------
import useInput from "../../../../hooks/useInput";
import constants from "../../../../constants";
import styles from "../../../../styles";
import Loader from "../../../../components/Loader";
import LocationSearchResult from "../../../../components/TextBox/LocationSearchResult";
import LocationSearchInput from "../../../../components/Input/LocationSearchInput";

/// ----------
/// Query
export const SEARCH_LOCATION = gql`
  query search($term: String) {
    searchLocation(term: $term) {
      id
      num
      text
    }
  }
`;

/// ----------
/// Header
const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${constants.width};
  height: ${styles.headerHeight};
`;

const HeaderLeftContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${styles.headerHeight};
  height: ${styles.headerHeight};
`;

const HeaderLeftImage = styled.Image`
  width: 9;
  height: 14;
`;

const HeaderCenterContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${constants.width - styles.headerHeight * 2};
  height: ${styles.headerHeight};
`;

const HeaderRightContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${styles.headerHeight};
  height: ${styles.headerHeight};
`;

const HeaderRightImage = styled.Image`
  width: 18;
  height: 18;
`;

/// ----------
const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  width: ${constants.width};
  flex-direction: column;
  align-items: center;
`;

export default ({ navigation }) => {
  const locationInput = useInput(navigation.getParam("location", ""));

  /// ----------
  let searchResult = useQuery(SEARCH_LOCATION, {
    variables: { term: locationInput.value },
    fetchPolicy: "network-only"
  });

  const selectMyLocation = () => {
    navigation.state.params.updateLocation(navigation);
  };

  return (
    <View style={{ flexWrap: "wrap" }}>
      <HeaderContainer>
        <Touchable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <HeaderLeftContainer>
            <HeaderLeftImage
              source={require("../../../../assets/iconmonstr-arrow-64-240.png")}
            />
          </HeaderLeftContainer>
        </Touchable>
        <HeaderCenterContainer>
          <LocationSearchInput
            {...locationInput}
            placeholder="지역명(시, 군, 구)을 입력해주세요."
            keyboardType="default"
            returnKeyType="search"
            autoCorrect={false}
          />
        </HeaderCenterContainer>
        <Touchable onPress={selectMyLocation}>
          <HeaderRightContainer>
            <HeaderRightImage
              source={require("../../../../assets/iconmonstr-location-1-240.png")}
            />
          </HeaderRightContainer>
        </Touchable>
      </HeaderContainer>

      {searchResult.loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <Container>
            <LocationSearchResult
              navigation={navigation}
              id={"all"}
              text={"모든 지역"}
            />
            {searchResult.data.searchLocation.map(Location => (
              <View key={Location.id}>
                <LocationSearchResult
                  navigation={navigation}
                  id={Location.id}
                  text={Location.text}
                />
              </View>
            ))}
          </Container>
        </ScrollView>
      )}
    </View>
  );
};
