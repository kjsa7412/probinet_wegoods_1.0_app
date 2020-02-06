import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { View } from "react-native";
import Swiper from "react-native-swiper";
import styles from "../../../styles";

///
const Touchable = styled.TouchableOpacity``;

///
const MainContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
`;

///
const MinipostContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${styles.baseWidth - 30};
  margin-top: 15;
  margin-bottom: 15;
`;

const MinipostImage = styled.Image`
  width: ${styles.baseWidth - 30};
  height: ${styles.baseWidth - 30};
`;

const StatusContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth - 30};
  margin-top: 5;
  margin-bottom: 10;
`;

const UserImage = styled.Image`
  width: 36;
  height: 36;
  border-radius: 18;
`;

const UserText = styled.Text`
  color: ${styles.blackColor};
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-left: 10;
  flex-grow: 1;
`;

const CreatedText = styled.Text`
  color: #a8a8a8;
  font-size: 11;
  font-family: NanumBarunGothicLight;
`;

const BodyContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const TitleContainer = styled.Text`
  color: ${styles.blackColor};
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-bottom: 5;
`;

const ContentsContainer = styled.Text`
  color: ${styles.blackColor};
  font-size: 13;
  font-family: NanumBarunGothicLight;
`;

const MiniPost = ({ minipost }) => (
  <MainContainer>
    <MinipostContainer>
      <View
        style={{
          width: styles.baseWidth - 30,
          height: styles.baseWidth - 30
        }}
      >
        <Swiper activeDotColor={"#FFFFFF"} autoplay={true} autoplayTimeout={2}>
          {minipost.files.map(value => (
            <MinipostImage key={value} source={{ uri: value }} />
          ))}
        </Swiper>
      </View>
      <StatusContainer>
        <UserImage source={{ uri: minipost.user.avatar }} />
        <UserText>{minipost.user.username}</UserText>
        <CreatedText>7월 28일 작성</CreatedText>
      </StatusContainer>
      <BodyContainer>
        <TitleContainer>{minipost.title}</TitleContainer>
        <ContentsContainer>{minipost.description}</ContentsContainer>
      </BodyContainer>
    </MinipostContainer>
  </MainContainer>
);

MiniPost.propTypes = {
  minipost: PropTypes.object
};

export default MiniPost;
