import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ArtistStatus from "./ArtistStatus";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 13;
  margin-top: 13;
  height: 18;
`;

const Text = styled.Text`
  font-size: 13;
  margin-right: 6;
  font-family: NanumBarunGothicBold;
`;

const XButton = styled.Image`
  margin-left: 7;
  width: 13;
  height: 13;
`;

const SelectedContent = ({ contentType, value, selectedContents }) => {
  //console.log("contentType", contentType);

  return (
    <MainContainer>
      <Text>
        {contentType === "artist"
          ? value.name
          : contentType === "kind" ||
            contentType === "keyword" ||
            contentType === "location" ||
            contentType === "postType"
          ? value.text
          : null}
      </Text>

      {/// artist 인 경우에만 표시한다.
      /// 별모양 및 그룹명
      contentType === "artist" ? (
        <ArtistStatus
          status={{
            activeType: value.activeType,
            parentsArtist: value.parentsArtist
          }}
        ></ArtistStatus>
      ) : null}

      <Touchable
        onPress={async () => {
          let checkArray;

          switch (contentType) {
            case "artist":
              checkArray = selectedContents.contentStatus.artist;
              break;
            case "kind":
              checkArray = selectedContents.contentStatus.kind;
              break;
            case "keyword":
              checkArray = selectedContents.contentStatus.keyword;
              break;
            case "location":
              checkArray = selectedContents.contentStatus.location;
              break;
            case "postType":
              checkArray = selectedContents.contentStatus.postType;
              break;
            default:
              checkArray = [];
            // code block
          }

          /// selected content 삭제
          if (
            checkArray.findIndex(element => {
              return element.id === value.id;
            }) !== -1
          ) {
            ///
            const deletedValueResult = Object.assign(
              {},
              selectedContents.contentStatus
            );

            switch (contentType) {
              case "artist":
                deletedValueResult.artist = deletedValueResult.artist.filter(
                  element => {
                    return element.id !== value.id;
                  }
                );
                break;
              case "kind":
                deletedValueResult.kind = deletedValueResult.kind.filter(
                  element => {
                    return element.id !== value.id;
                  }
                );
                break;
              case "keyword":
                deletedValueResult.keyword = deletedValueResult.keyword.filter(
                  element => {
                    return element.id !== value.id;
                  }
                );
                break;
              case "location":
                deletedValueResult.location = deletedValueResult.location.filter(
                  element => {
                    return element.id !== value.id;
                  }
                );
                break;
              case "postType":
                deletedValueResult.postType = deletedValueResult.postType.filter(
                  element => {
                    return element.postType !== value.postType;
                  }
                );
                break;
              default:
                deleteArray = [];
              // code block
            }

            selectedContents.setContentStatus(deletedValueResult);
          }
        }}
      >
        <XButton
          source={require("../../../assets/iconmonstr-x-mark-thin-240.png")}
        ></XButton>
      </Touchable>
    </MainContainer>
  );
};

SelectedContent.propTypes = {
  value: PropTypes.object.isRequired,
  selectedContents: PropTypes.object.isRequired,
  contentType: PropTypes.string.isRequired
};

export default SelectedContent;
