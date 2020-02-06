import React from "react";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components";
import HeaderBase from "../../../components/Header/HeaderBase";

import AddArtistResultItem from "../../../components/Item/Filter/Artist/AddArtistResultItem";
import constants from "../../../constants";

const MainContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

const Container = styled.View`
  flex-direction: column;
  flex: 1;
  width: ${constants.width};
  align-items: center;
`;

const AddArtistResult = ({ navigation }) => {
  const addedArtistList = navigation.getParam("addedArtistList", []);

  console.log("AddArtistResult addedArtistList", addedArtistList);

  const handleComplete = async () => {
    return Alert.alert("Complete");
  };

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={false}
        centerTitle={"Result"}
        isInputBox={false}
      />

      <Container>
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            alignItems: "center",
            width: constants.width
          }}
        >
          {addedArtistList.map(artist => (
            <AddArtistResultItem
              key={artist.id}
              value={artist}
            ></AddArtistResultItem>
          ))}
        </ScrollView>
      </Container>
    </MainContainer>
  );
};

export default AddArtistResult;
