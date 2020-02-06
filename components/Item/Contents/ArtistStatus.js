import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MainContainer = styled.View`
  height: 9;
`;

const ThreeStar = styled.View`
  flex-direction: row;
  width: 13;
  height: 7.2;
  align-items: flex-end;
`;

const LargeStar = styled.Image`
  width: 6.93;
  height: 6.59;
`;

const SmallStar = styled.Image`
  width: 4.42;
  height: 4.2;
`;

const Text = styled.Text`
  font-size: 9;
  font-family: NanumBarunGothicLight;
`;

const ArtistStatus = ({ status }) => {
  return (
    <MainContainer>
      {status.activeType === "GROUP" ? (
        <ThreeStar>
          <SmallStar
            source={require("../../../assets/iconmonstr-star-1-240.png")}
          ></SmallStar>
          <LargeStar
            source={require("../../../assets/iconmonstr-star-1-240.png")}
          ></LargeStar>
          <SmallStar
            source={require("../../../assets/iconmonstr-star-1-240.png")}
          ></SmallStar>
        </ThreeStar>
      ) : status.parentsArtist.length !== 0 ? (
        <Text>{status.parentsArtist[0].name}</Text>
      ) : status.activeType === "PERSON" ||
        (status.activeType === "MEMBER" &&
          status.parentsArtist.length === 0) ? (
        <LargeStar
          source={require("../../../assets/iconmonstr-star-1-240.png")}
        ></LargeStar>
      ) : null}
    </MainContainer>
  );
};

ArtistStatus.propTypes = {
  status: PropTypes.object.isRequired
};

export default ArtistStatus;
