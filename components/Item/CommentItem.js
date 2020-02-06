import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import styles from "../../styles";

/// ----------
const Touchable = styled.TouchableOpacity``;

///
const MainContainer = styled.View`
  background-color: ${props => props.theme.whiteColor};
  width: ${styles.baseWidth - 28};
`;
/// ----------
const CommentContainer = styled.View`
  flex-direction: column;
  width: 100%;
  margin-bottom: 15;
`;

const CommentUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CommentUserImage = styled.Image`
  width: 32;
  height: 32;
  border-radius: 16px;
  margin-bottom: 5;
`;

const CommentUserText = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothicBold;
  margin-left: 14;
`;

const CommentBottomContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const CommentContentsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => (props.isMain ? "#FFFFFF" : "#F7F7F7")};
`;

const CommentContentsText = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothic;
  margin-top: 14;
  margin-bottom: 14;
  margin-left: 14;
  margin-right: 14;
`;

const CommentDateText = styled.Text`
  color: #acabab;
  text-align: left;
  font-size: 10;
  font-family: NanumBarunGothic;
  margin-left: 5;
`;

const CommentItem = ({ comment, main }) => {
  return (
    <MainContainer>
      <CommentContainer key={comment.id}>
        <CommentUserContainer>
          <CommentUserImage source={{ uri: comment.user.avatar }} />
          <CommentUserText>{comment.user.username}</CommentUserText>
        </CommentUserContainer>
        <CommentBottomContainer>
          <CommentContentsContainer isMain={main}>
            <CommentContentsText>{comment.text}</CommentContentsText>
          </CommentContentsContainer>
          <CommentDateText>5분 전</CommentDateText>
        </CommentBottomContainer>
      </CommentContainer>
    </MainContainer>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  main: PropTypes.bool
};

export default CommentItem;
