/// ----------
import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { gql } from "apollo-boost";

/// ----------
import styles from "../../styles";
import HeaderRightStyles from "../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../components/Loader";
import HeaderBase from "../../components/Header/HeaderBase";
import CommentItem from "../../components/Item/CommentItem";

/// ----------
const Touchable = styled.TouchableOpacity``;

///
const MainContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  background-color: #f7f7f7;
`;

/// ----------
export const SEE_COMMENT = gql`
  query search($postId: String!) {
    seeCommentFromPost(postId: $postId) {
      id
      text
      user {
        id
        avatar
        username
      }
    }
  }
`;

export default ({ navigation }) => {
  const postId = navigation.getParam("postId", "");
  const fromScreen = navigation.getParam("fromScreen", "");

  console.log(fromScreen);

  let commentResult = useQuery(SEE_COMMENT, {
    variables: { postId: postId },
    fetchPolicy: "network-only"
  });

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        isleftBackButtonFunc={() => {
          navigation.navigate(fromScreen);
        }}
        centerTitle={"Comment"}
      />
      {commentResult.loading ? (
        <Loader />
      ) : (
        <ScrollView>
          {commentResult.data.seeCommentFromPost.map(value => (
            <CommentItem key={value.id} comment={value} main={true} />
          ))}
        </ScrollView>
      )}
    </MainContainer>
  );
};
