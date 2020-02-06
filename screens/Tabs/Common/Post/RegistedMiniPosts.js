/// ----------
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

/// ----------
import styles from "../../../../styles";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";
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

///
const MiniPostContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15;
  margin-bottom: 15;
  width: ${styles.baseWidth};
`;

const MiniPostImage = styled.Image`
  width: 167;
  height: 167;
  margin-left: 15;
  margin-bottom: 5;
`;

const TextCard = styled.View`
  width: 167;
  height: 31;
  margin-left: 16;
`;

const TitleText = styled.Text`
  color: #acabab;
  text-align: left;
  font-size: 12;
  font-family: NanumBarunGothicLight;
  margin-top: 1;
`;

const ContentsText = styled.Text`
  color: #000000;
  text-align: left;
  font-size: 15;
  font-family: NanumBarunGothicLight;
`;

export default ({ navigation }) => {
  const postId = navigation.getParam("postId", "");

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
          <MiniPostContainer>
            {minipostResult.data.seeRegistMiniPostList.map(value => (
              <Touchable
                key={value.id}
                onPress={() =>
                  navigation.push("RegistedMiniPostList", {
                    postId: postId,
                    minipostId: value.id
                  })
                }
              >
                <MiniPostImage source={{ uri: value.files[0] }} />
                <TextCard>
                  <ContentsText>{value.title}</ContentsText>
                  <TitleText>title</TitleText>
                </TextCard>
              </Touchable>
            ))}
          </MiniPostContainer>
        </ScrollView>
      )}
    </MainContainer>
  );
};
