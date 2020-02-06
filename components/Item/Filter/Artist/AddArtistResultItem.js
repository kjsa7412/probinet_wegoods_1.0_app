import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../../../constants";
import styles from "../../../../styles";
import ArtistStatus from "../../Contents/ArtistStatus";

const MainContainer = styled.View`
  width: ${constants.width};
  height: 73;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.View`
  height: 73;
  flex-direction: row;
  align-items: center;
`;

const RightContainer = styled.View`
  height: 73;
  justify-content: center;
`;

const Text = styled.Text`
  margin-left: 14;
  margin-right: 8;
  font-size: 13;
  font-family: NanumBarunGothicLight;
`;

const ResultStateText = styled.Text`
  color: ${props =>
    props.color === "Red"
      ? styles.addArtistResultTextColorRed
      : styles.addArtistResultTextColorGray};
  font-size: 13;
  font-family: NanumBarunGothic;
  margin-right: 22;
`;

const AddArtistResultItem = ({ value }) => {
  return (
    <MainContainer>
      <LeftContainer>
        <Text>{value.name}</Text>

        {
          /// 별모양 및 그룹을 나타냄
          <ArtistStatus
            status={{
              activeType: value.activeType,
              parentsArtist: value.parentsArtist
            }}
          ></ArtistStatus>
        }
      </LeftContainer>

      <RightContainer>
        <ResultStateText
          color={value.registResult.includes("이미") ? "Gray" : "Red"}
        >
          {value.registResult}
        </ResultStateText>
      </RightContainer>
    </MainContainer>
  );
};

AddArtistResultItem.propTypes = {
  value: PropTypes.object.isRequired
};

export default AddArtistResultItem;
