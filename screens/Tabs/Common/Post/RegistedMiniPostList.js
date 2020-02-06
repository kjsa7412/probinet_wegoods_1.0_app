/// ----------
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";

/// ----------
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";
import MiniPost from "../../../../components/Item/Post/MiniPost";
import { SEE_MINIPOST } from "./PostQueries";

/// ----------
const Touchable = styled.TouchableOpacity``;

///
const MainContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
`;

export default ({ navigation }) => {
  const postId = navigation.getParam("postId", "");
  const minipostId = navigation.getParam("minipostId", "");

  let minipostResult = useQuery(SEE_MINIPOST, {
    variables: { postId: postId },
    fetchPolicy: "network-only"
  });

  return (
    <MainContainer>
      <HeaderBase isleftBackButton={true} centerTitle={"등록물품"} />
      {minipostResult.loading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {minipostResult.data.seeRegistMiniPostList.map(value =>
            value.id === minipostId ? (
              <MiniPost key={value.id} minipost={value} />
            ) : null
          )}
          {minipostResult.data.seeRegistMiniPostList.map(value =>
            value.id !== minipostId ? (
              <MiniPost key={value.id} minipost={value} />
            ) : null
          )}
        </ScrollView>
      )}
    </MainContainer>
  );
};
