/// ----------
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  Platform,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import { gql } from "apollo-boost";

/// ----------
import useInput from "../../../../hooks/useInput";
import styles from "../../../../styles";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";
import UserItem from "../../../../components/Item/UserItem";
import { SEE_PARTICIPANTS } from "./PostQueries";

/// ----------
const Touchable = styled.TouchableOpacity``;

///
const MainContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
`;

///
const UserContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15;
  width: ${styles.baseWidth};
`;

const UserItemContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${styles.baseWidth / 3};
  height: 130;
`;

export default ({ navigation }) => {
  const postId = navigation.getParam("postId", "");

  let userResult = useQuery(SEE_PARTICIPANTS, {
    variables: { postId: postId },
    fetchPolicy: "network-only"
  });

  return (
    <MainContainer>
      <HeaderBase isleftBackButton={true} centerTitle={"참여자"} />
      {userResult.loading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <UserContainer>
            {userResult.data.seeUserFromPost.map(value => (
              <UserItemContainer key={value.id}>
                <UserItem avatarUri={value.avatar} username={value.username} />
              </UserItemContainer>
            ))}
          </UserContainer>
        </ScrollView>
      )}
    </MainContainer>
  );
};
