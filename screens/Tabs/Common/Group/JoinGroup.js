/// ----------
/// Import
import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, Image } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../../../../components/Loader";
import styles from "../../../../styles";
import constants from "../../../../constants";
import HeaderBase from "../../../../components/Header/HeaderBase";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";

import { SEE_ONE_GROUP } from "./GroupQueries";

/// ----------
/// Styled Components

///
const Touchable = styled.TouchableOpacity``;

///
const FullContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
  background-color: ${styles.containerTestColor};
`;

const ScreenContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${styles.baseWidth};
  height: 100%;
`;

const BodyContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  padding-left: 14;
  padding-right: 14;
`;

const GroupContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  padding-bottom: 14;
`;

const GroupImage = styled.Image`
  width: 347;
  height: 347;
  background-color: ${styles.greyColor};
`;

const GroupStatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80;
`;

const OtherIconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
`;

const IconContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

const IconImage = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${styles.darkWeGoodsColor};
  width: 32;
  height: 32;
  border-radius: 16;
`;

const IconText = styled.Text`
  text-align: center;
  font-size: 13;
  font-family: NanumBarunGothicBold;
  margin-top: 10;
`;

const TitleText = styled.Text`
  width: 100%;
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicLight;
  margin-top: 5;
`;

const DescriptionText = styled.Text`
  color: #acabab;
  width: 100%;
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothicLight;
  margin-top: 5;
`;

const JoinButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 14;
  padding-bottom: 14;
`;

const JoinButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${styles.weGoodsColor};
  width: 100%;
  height: 40;
  border-radius: 20;
`;

const JoinText = styled.Text`
  color: ${styles.whiteColor};
  text-align: center;
  font-size: 18;
  font-family: NanumBarunGothicBold;
`;

/// ----------
/// Graphql

export default ({ navigation }) => {
  const groupId = navigation.getParam("groupId", "");

  let groupResult = useQuery(SEE_ONE_GROUP, {
    variables: { groupId: groupId }
  });

  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase isleftBackButton={true} />
        {groupResult.loading ? (
          <Loader />
        ) : (
          <BodyContainer>
            <GroupContainer>
              <GroupImage
                source={{
                  uri: groupResult.data.seeOneGroup.file
                }}
              />
              <GroupStatusContainer>
                <IconContainer>
                  <IconImage>
                    <Image
                      style={{ width: 16, height: 13 }}
                      source={require("../../../../assets/iconmonstr-crown-5-240.png")}
                    />
                  </IconImage>
                  <IconText>
                    {groupResult.data.seeOneGroup.owner.username}
                  </IconText>
                </IconContainer>
                <OtherIconContainer>
                  <IconContainer>
                    <IconImage>
                      <Image
                        style={{ width: 15, height: 15 }}
                        source={require("../../../../assets/iconmonstr-calendar-4-240.png")}
                      />
                    </IconImage>
                    <IconText>19.10.25</IconText>
                  </IconContainer>
                  <IconContainer>
                    <IconImage>
                      <Image
                        style={{ width: 20, height: 14 }}
                        source={require("../../../../assets/iconmonstr-user-31-240.png")}
                      />
                    </IconImage>
                    <IconText>
                      {groupResult.data.seeOneGroup.participantsCount}
                    </IconText>
                  </IconContainer>
                </OtherIconContainer>
              </GroupStatusContainer>
              <TitleText>{groupResult.data.seeOneGroup.title}</TitleText>
              <DescriptionText>
                {groupResult.data.seeOneGroup.subTitle}
              </DescriptionText>
            </GroupContainer>
            <JoinButtonContainer>
              <JoinButton
                onPress={() =>
                  navigation.push("ChatNavigation", {
                    groupId: "asdas",
                    fromScreen: navigation.state.routeName
                  })
                }
              >
                <JoinText>참여</JoinText>
              </JoinButton>
            </JoinButtonContainer>
          </BodyContainer>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
