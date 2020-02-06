import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import styles from "../../../styles";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.whiteColor};
`;

const Card = styled.Image`
  width: 135;
  height: 135;
`;

const TextCard = styled.View`
  width: 135;
  height: 58;
  padding-left: 1;
  padding-top: 4;
`;

const TitleText = styled.Text`
  color: #acabab;
  text-align: left;
  font-size: 9;
  font-family: NanumBarunGothicLight;
  margin-top: 1;
`;

const ContentsText = styled.Text`
  color: #000000;
  text-align: left;
  font-size: 12;
  font-family: NanumBarunGothicLight;
`;

const BoldContentsText = styled.Text`
  color: #000000;
  text-align: left;
  font-size: 12;
  font-family: NanumBarunGothicBold;
`;

const ParticipantText = styled.Text`
  color: #000000;
  text-align: left;
  font-size: 9;
  font-family: NanumBarunGothicLight;
`;

const PostItemOfHome = ({ post, onPress }) => {
  let title = "";
  let contents = "";
  let participants = "";

  switch (post.type) {
    case 0:
      title = "price";
      contents = post.price + "원";
      break;
    case 1:
      title = "type";
      contents = "나눔";

      break;
    case 2:
      title = "type";
      contents = "교환";
      break;
    case 3:
      title = "participant";
      contents = post.participantsCount;
      participants = "/" + post.numberOfParticipants;
      break;
    default:
    // code block
  }

  return (
    <Touchable onPress={onPress}>
      <Container>
        <Card source={{ uri: post.files[0] }} />
        <TextCard>
          <ContentsText>{post.title}</ContentsText>
          <TitleText>title</TitleText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: 4
            }}
          >
            <BoldContentsText>{contents}</BoldContentsText>
            {participants === "" ? (
              <View />
            ) : (
              <ParticipantText>{participants}</ParticipantText>
            )}
          </View>
          <TitleText>{title}</TitleText>
        </TextCard>
      </Container>
    </Touchable>
  );
};

PostItemOfHome.propTypes = {
  post: PropTypes.object.isRequired,
  onPress: PropTypes.func
};

export default PostItemOfHome;
