import React from "react";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components";
import HeaderBase from "../../../components/Header/HeaderBase";
import { Image } from "react-native";
import { useQuery } from "react-apollo-hooks";

import HeaderRightStyles from "../../../components/Header/HeaderRight/HeaderRightStyles";

import constants from "../../../constants";
import styles from "../../../styles";

import { MY_UN_REGISTED_ARTIST } from "../FilterQueries";
import Loader from "../../../components/Loader";
import MyRegistedArtist from "../../../components/Item/Filter/Artist/MyRegistedArtist";
import SelectedDeleteBar from "../../../components/Item/Filter/SelectedDeleteBar";

const MainContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

const Container = styled.View`
  width: ${constants.width};
  align-items: center;
  flex: 1;
`;

const EmptyArtistText = styled.Text`
  font-size: 14;
  font-family: NanumBarunGothicLight;
`;

const NewArtist = ({ navigation }) => {
  /// all contents
  let myUnRegistedArtist = useQuery(MY_UN_REGISTED_ARTIST, {
    fetchPolicy: "network-only"
  });

  const handleComplete = async () => {
    return Alert.alert("Complete");
  };

  console.log("myUnRegistedArtist", myUnRegistedArtist);

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        centerTitle={"New Artist"}
        isInputBox={false}
        rightButton={HeaderRightStyles.ADD}
        rightButtonLink={() => {
          navigation.navigate("AddArtist");
        }}
      />

      {myUnRegistedArtist.loading ? (
        <Loader />
      ) : myUnRegistedArtist.data !== undefined &&
        myUnRegistedArtist.data.seeUnRegistedArtistList.length !== 0 ? (
        <Container>
          <SelectedDeleteBar />

          <Container>
            <ScrollView
              bounces={false}
              contentContainerStyle={{
                alignItems: "center",
                width: constants.width
              }}
            >
              {myUnRegistedArtist.data.seeUnRegistedArtistList.map(artist => (
                <MyRegistedArtist
                  key={artist.id}
                  value={artist}
                ></MyRegistedArtist>
              ))}
            </ScrollView>
          </Container>
        </Container>
      ) : (
        <Container>
          <EmptyArtistText>{"등록한 Artist 가 없습니다."}</EmptyArtistText>
          <EmptyArtistText>{"+ 를 눌러 추가해 보세요"}</EmptyArtistText>
        </Container>
      )}
    </MainContainer>
  );
};

export default NewArtist;
