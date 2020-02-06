import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../../../constants";
import styles from "../../../../styles";
import ArtistStatus from "../../Contents/ArtistStatus";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  width: ${constants.width};
  height: 73;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.View`
  width: ${constants.width - 100};
  height: 73;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const RightContainer = styled.View`
  width: 88;
  height: 73;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Text = styled.Text`
  margin-left: 14;
  margin-right: 8;
  font-size: 13;
  font-family: NanumBarunGothicLight;
`;

const CountTextView = styled.View`
  width: 34;
  flex-direction: row;
  align-items: flex-end;
`;

const CountText = styled.Text`
  font-size: 14;
  font-family: NanumBarunGothicBold;
`;
const CountMaxText = styled.Text`
  font-size: 11;
  font-family: NanumBarunGothicLight;
`;

const EmptyCheckBox = styled.View`
  width: 27;
  height: 27;
  border-radius: 50;
  border: 2px solid ${styles.myFilterCheckBorderColor};
`;

const CheckImage = styled.Image`
  width: 27;
  height: 27;
`;

const MyRegistedArtist = ({ value }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <MainContainer>
      <Touchable>
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
      </Touchable>

      <Touchable
        onPress={() => (isChecked ? setIsChecked(false) : setIsChecked(true))}
      >
        <RightContainer>
          <CountTextView>
            <CountText>{String(value.registedUserCount)}</CountText>
            <CountMaxText>{"/20"}</CountMaxText>
          </CountTextView>
          {isChecked ? (
            <CheckImage
              source={require("../../../../assets/iconmonstr-check-mark-4-240.png")}
            />
          ) : (
            <EmptyCheckBox />
          )}
        </RightContainer>
      </Touchable>
    </MainContainer>
  );
};

MyRegistedArtist.propTypes = {
  value: PropTypes.object.isRequired
};

export default MyRegistedArtist;
