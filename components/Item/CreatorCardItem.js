import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import styles from "../../styles";
import constants from "../../constants";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props => props.theme.whiteColor};
`;

const Card = styled.View`
  width: ${props => props.theme.widthOfCard};
  height: ${props => props.theme.heightOfCard};
  border-radius: 10;
  justify-content: center;
`;

const UserContainer = styled.View`
  width: ${props => props.theme.widthOfCard};
  margin-bottom: 9;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Avatar = styled.Image`
  height: 36;
  width: 36;
  border-radius: 18;
`;

const Text = styled.Text`
  color: ${props => props.theme.blackColor};
  text-align: left;
  font-size: 15;
  font-family: NanumBarunGothicLight;
  margin-left: 9;
`;

const CreatorCardItem = ({ userId, avatar, username, posts, onPress }) => {
  /// posts
  let postsResult = [];
  let number = 1;
  let count = 0;

  const maxLength = 15;
  const lackLength =
    maxLength < posts.length + 1 ? 0 : maxLength - posts.length;

  for (var i = 0; i < posts.length; i++) {
    postsResult.push({
      id: number,
      file: posts[i].files[0]
    });
    number += 1;
  }

  const postsResultLength = postsResult.length;

  for (var i = 0; i < lackLength; i++) {
    if (count > postsResultLength - 1) {
      count = 0;
    }

    postsResult.push({
      id: number,
      file: posts[count].files[0]
    });

    count += 1;
    number += 1;
  }

  return (
    <Touchable onPress={onPress}>
      <Container>
        <UserContainer>
          <Avatar key={userId} source={{ uri: avatar }} />
          <Text>{username}</Text>
        </UserContainer>
        <Card>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {postsResult.map(function(value, index) {
              var topLeftRadius = index === 0 ? 10 : 0;
              var topRightRadius = index === 4 ? 10 : 0;
              var bottomLeftRadius = index === 10 ? 10 : 0;
              var bottomRightRadius = index === 14 ? 10 : 0;

              return (
                <View
                  key={value.id}
                  style={{
                    overflow: "hidden",
                    margin: 0.5,
                    borderTopLeftRadius: topLeftRadius,
                    borderTopRightRadius: topRightRadius,
                    borderBottomLeftRadius: bottomLeftRadius,
                    borderBottomRightRadius: bottomRightRadius
                  }}
                >
                  <Image
                    source={{ uri: value.file }}
                    style={{
                      width: (styles.widthOfCard - 5) / 5,
                      height: (styles.heightOfCard - 3) / 3
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </Card>
      </Container>
    </Touchable>
  );
};

CreatorCardItem.propTypes = {
  userId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  onPress: PropTypes.func
};

export default CreatorCardItem;
