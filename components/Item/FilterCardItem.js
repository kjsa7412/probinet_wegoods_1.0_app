import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import styles from "../../styles";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props => props.theme.whiteColor};
`;

const Card = styled.View`
  background-color: ${props => props.theme.whiteColor};
  width: ${props => props.theme.widthOfCard};
  height: ${props => props.theme.heightOfCard};
  border-radius: 10;
  justify-content: center;
`;

const Cover = styled.View`
  background-color: ${props => props.theme.blackColor};
  opacity: 0.5;
  width: ${props => props.theme.widthOfCard};
  height: ${props => props.theme.heightOfCard};
  border-radius: 10;
  position: absolute;
`;

const TextCard = styled.View`
  width: ${props => props.theme.widthOfCard};
  height: ${props => props.theme.heightOfCard};
  border-radius: 10;
  position: absolute;
`;

const MainArtistText = styled.Text`
  color: ${props => props.theme.whiteColor};
  text-align: left;
  font-size: 27;
  letter-spacing: 1;
  font-family: NanumBarunGothicBold;
  margin-top: 15;
  margin-left: 15;
  margin-right: 15;
`;

const SubArtistText = styled.Text`
  color: ${props => props.theme.whiteColor};
  text-align: left;
  font-size: 15;
  font-family: NanumBarunGothicBold;
  margin-top: 5;
  margin-left: 15;
  margin-right: 15;
`;

const Text = styled.Text`
  color: ${props => props.theme.whiteColor};
  text-align: left;
  font-size: 13;
  font-family: NanumBarunGothicLight;
  margin-top: 3;
  margin-left: 15;
  margin-right: 15;
`;

const Bumper1 = styled.View`
  height: 15;
`;

const FilterCardItem = ({
  onPress,
  posts,
  artist,
  type,
  kind,
  location,
  keyword
}) => {
  /// posts
  var postsResult = [];

  var number = 1;
  var count = 0;
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

  // artist
  var mainArtistResult = "";
  var subArtistResult = "";

  for (var i = 0; i < artist.length; i++) {
    if (artist[i].activeType === "GROUP" || artist[i].activeType === "PERSON") {
      mainArtistResult += artist[i].name + "  ";
    } else {
      subArtistResult += artist[i].name + "  ";
    }
  }

  // type
  var typeResult = "";

  for (var i = 0; i < type.length; i++) {
    switch (type[i]) {
      case 0:
        typeResult += "판매" + "  ";
        break;
      case 1:
        typeResult += "나눔" + "  ";
        break;
      case 2:
        typeResult += "교환" + "  ";
        break;
      case 3:
        typeResult += "장터" + "  ";
        break;
      default:
      // code block
    }
  }

  // kind
  var kindResult = "";

  for (var i = 0; i < kind.length; i++) {
    kindResult += kind[i].text + "  ";
  }

  // location
  var locationResult = "";

  for (var i = 0; i < location.length; i++) {
    locationResult += location[i].text + "  ";
  }

  // keyword
  var keywordResult = "";

  for (var i = 0; i < keyword.length; i++) {
    keywordResult += keyword[i].text + "  ";
  }

  // ----------
  // Problem : Text 줄바꿈이 일어나지 않도록 해야한다.
  // ----------

  // ----------
  // Problem : Text가 IOS, ANDROID에서 다르게 보인다.
  // ----------

  // ----------
  // Problem : <Card> 안에 ScrollView의 Content Start Position이 중앙이 되었으면 함.
  // Resolve 190918 :
  // 현재 이 위치가 ScrollView 안에 Component라는 걸 잊음
  // Home Screen에서 ScrollView 아이템 사이드에 적절한 사이즈의 view를 넣어줬음
  // ----------

  return (
    <Touchable onPress={onPress}>
      <Container>
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
                // ----------
                // Problem : ios에서 borderTopLeftRadius 이게 적용 되지 않는다.
                // Resolve 190918 :
                // overflow: "hidden" 속성을 주면 된다.
                // 하지만 Image Component 안에서 해당 속성을 주는 것이 아니라
                // View로 한번 감싸고 View에서 overflow와 함께 borderTopLeftRadius 속성을
                // 설정해야 IOS에서도 적용이 된다.
                // ----------
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
        <Cover></Cover>
        <TextCard>
          <MainArtistText>{mainArtistResult}</MainArtistText>
          <SubArtistText>{subArtistResult}</SubArtistText>
          <Bumper1></Bumper1>
          {typeResult === "" ? <View /> : <Text>{typeResult}</Text>}
          {kindResult === "" ? <View /> : <Text>{kindResult}</Text>}
          {locationResult === "" ? <View /> : <Text>{locationResult}</Text>}
          {keywordResult === "" ? <View /> : <Text>{keywordResult}</Text>}
        </TextCard>
      </Container>
    </Touchable>
  );
};

FilterCardItem.propTypes = {
  onPress: PropTypes.func,
  posts: PropTypes.array.isRequired,
  artist: PropTypes.array.isRequired,
  type: PropTypes.array.isRequired,
  kind: PropTypes.array.isRequired,
  location: PropTypes.array.isRequired,
  keyword: PropTypes.array.isRequired
};

export default FilterCardItem;
