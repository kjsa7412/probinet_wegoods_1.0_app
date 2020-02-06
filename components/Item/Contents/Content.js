import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../../constants";
import ArtistStatus from "./ArtistStatus";
import { AsyncStorage } from "react-native";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${constants.width};
  height: 54;
  justify-content: space-between;
`;
const SubContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  margin-left: 14;
  margin-right: 8;
  font-size: 13;
  font-family: NanumBarunGothicLight;
`;

const CountText = styled.Text`
  color: #6d6d6d;
  margin-right: 17;
  font-size: 10;
  font-family: NanumBarunGothicLight;
`;

const Content = ({ filterOption, value, selectedContents, latestContents }) => {
  const handleSelected = () => {
    ///-------------------  selected Contents 부분
    // useState 의 set 함수를 쓸때 새로 object 를 만든다음 넣어 줘야 한다.
    const addValueResult = Object.assign({}, selectedContents.contentStatus);

    filterOption.filterState === "artist"
      ? addValueResult.artist.push(value)
      : filterOption.filterState === "kind"
      ? addValueResult.kind.push(value)
      : filterOption.filterState === "keyword"
      ? addValueResult.keyword.push(value)
      : filterOption.filterState === "location"
      ? addValueResult.location.push(value)
      : filterOption.filterState === "postType"
      ? addValueResult.postType.push(value)
      : null;

    selectedContents.setContentStatus(addValueResult);
  };

  const handleAsyncStorage = async () => {
    ///------------------- async 부분
    const contentsHistory = await AsyncStorage.getItem("ContentsHistory");
    const copyValue = Object.assign({}, value);
    if (copyValue.postsCount !== undefined) {
      copyValue.postsCount = 0;
    }

    if (contentsHistory === null) {
      /// 한번도 저장된 적이 없는 경우임
      /// Object를 만들어서 저장을 하자.
      let obj = {
        artist: [],
        kind: [],
        keyword: [],
        location: []
      };

      filterOption.filterState === "artist"
        ? obj.artist.push(copyValue)
        : filterOption.filterState === "kind"
        ? obj.kind.push(copyValue)
        : filterOption.filterState === "keyword"
        ? obj.keyword.push(copyValue)
        : filterOption.filterState === "location"
        ? obj.location.push(copyValue)
        : null;

      await AsyncStorage.setItem("ContentsHistory", JSON.stringify(obj));
      latestContents.setLatestStatus(obj);
    } else {
      /// 이미 저장된 경우가 있는 경우
      /// 각 content 구분별로 처리해야 한다.

      let contentsHistoryObj = await JSON.parse(contentsHistory);

      let checkArray;

      filterOption.filterState === "artist"
        ? (checkArray = contentsHistoryObj.artist)
        : filterOption.filterState === "kind"
        ? (checkArray = contentsHistoryObj.kind)
        : filterOption.filterState === "keyword"
        ? (checkArray = contentsHistoryObj.keyword)
        : filterOption.filterState === "location"
        ? (checkArray = contentsHistoryObj.location)
        : (checkArray = []);

      /// 선택한 value 가 이미 있는 경우인지 아닌지 판단해서 처리한다.
      /// 그냥 기존에서 없애고 새로 앞에 삽입
      if (checkArray.lenght !== 0) {
        checkArray = checkArray
          .filter((element, index) => {
            // 최근 사용 history 저장은 5개로 제한하도록 하자
            return element.id !== copyValue.id;
          })
          .slice(0, 4);
        checkArray.unshift(copyValue);
      }

      filterOption.filterState === "artist"
        ? (contentsHistoryObj.artist = checkArray)
        : filterOption.filterState === "kind"
        ? (contentsHistoryObj.kind = checkArray)
        : filterOption.filterState === "keyword"
        ? (contentsHistoryObj.keyword = checkArray)
        : filterOption.filterState === "location"
        ? (contentsHistoryObj.location = checkArray)
        : null;

      await AsyncStorage.setItem(
        "ContentsHistory",
        JSON.stringify(contentsHistoryObj)
      );

      ///-------------------  latestContents부분
      latestContents.setLatestStatus(contentsHistoryObj);
    }
  };

  return (
    <Touchable
      onPress={async () => {
        filterOption.filterState === "artist"
          ? (checkArray = selectedContents.contentStatus.artist)
          : filterOption.filterState === "kind"
          ? (checkArray = selectedContents.contentStatus.kind)
          : filterOption.filterState === "keyword"
          ? (checkArray = selectedContents.contentStatus.keyword)
          : filterOption.filterState === "location"
          ? (checkArray = selectedContents.contentStatus.location)
          : filterOption.filterState === "postType"
          ? (checkArray = selectedContents.contentStatus.postType)
          : (checkArray = []);

        if (
          checkArray.findIndex(element => {
            return filterOption.filterState === "postType"
              ? element.postType === value.postType
              : element.id === value.id;
          }) === -1
        ) {
          handleSelected();
          filterOption.filterState !== "postType" ? handleAsyncStorage() : null;
        }
      }}
    >
      <MainContainer>
        <SubContainer>
          <Text>
            {filterOption.filterState === "artist"
              ? value.name
              : filterOption.filterState === "kind" ||
                filterOption.filterState === "keyword" ||
                filterOption.filterState === "location" ||
                filterOption.filterState === "postType"
              ? value.text
              : null}
          </Text>

          {/// artist 인 경우에만 표시한다.
          /// 별모양 및 그룹명
          filterOption.filterState === "artist" ? (
            <ArtistStatus
              status={{
                activeType: value.activeType,
                parentsArtist: value.parentsArtist
              }}
            ></ArtistStatus>
          ) : null}
        </SubContainer>

        <SubContainer>
          {/// artist 인 경우에만 맞는 post count 를 뿌려준다.
          (filterOption.filterState === "artist" ||
            filterOption.filterState === "postType") &&
          value.postsCount !== undefined &&
          value.postsCount !== 0 ? (
            <CountText>
              {value.postsCount}
              {"건"}
            </CountText>
          ) : null}
        </SubContainer>
      </MainContainer>
    </Touchable>
  );
};

Content.propTypes = {
  value: PropTypes.object.isRequired,
  selectedContents: PropTypes.object.isRequired,
  latestContents: PropTypes.object.isRequired,
  filterOption: PropTypes.object.isRequired
};

export default Content;
