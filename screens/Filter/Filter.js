import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  Alert,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import styled from "styled-components";
import HeaderBase from "../../components/Header/HeaderBase";

import useInput from "../../hooks/useInput";
import HeaderRightStyles from "../../components/Header/HeaderRight/HeaderRightStyles";
import FilterOptionBar from "../../components/Item/OptionBar/FilterOptionBar";
import styles from "../../styles";
import FilterItemAddButton from "../../components/Button/FilterItemAddButton";
import constants from "../../constants";

import SelectedContent from "../../components/Item/Contents/SelectedContent";

import SearchedContents from "../../components/Filter/SearchedContents";
import BaseContents from "../../components/Filter/BaseContents";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const SearchAndPlusView = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${constants.width};
`;

const ContentsView = styled.View`
  flex: 1;
  flex-wrap: wrap;
`;

const SelectedFilterView = styled.View`
  width: ${constants.width - 28};
  background-color: ${styles.searchBarBGColor};
  margin-top: 14;
  margin-bottom: 14;
  padding-bottom: 13;
  border-radius: 10;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TextInput = styled.TextInput`
  font-size: 13;
  font-family: NanumBarunGothicLight;
  margin-top: 7;
  margin-bottom: 7;
  margin-left: 14;
  padding-left: 13;
  width:
  ${props => (props.xButton ? constants.width - 112 : constants.width - 70)}
  height: 31;
  background-color: ${styles.searchBarBGColor};
`;

const XbuttonContainer = styled.View`
  width: 42;
  height: 31;
  background-color: ${styles.searchBarBGColor};
  align-items: center;
  justify-content: center;
`;

const XButton = styled.Image`
  width: 14;
  height: 14;
  background-color: ${styles.searchBarBGColor};
`;

const Filter = ({ navigation }) => {
  const inputText = useInput("");
  const [firstScreen, setFirstScreen] = useState(true);
  const [filterState, setfilterState] = useState("artist");
  const filterOption = { filterState, setfilterState };

  /// selected Contents 를 위한 state
  const [contentStatus, setContentStatus] = useState({
    artist: [],
    kind: [],
    keyword: [],
    location: [],
    postType: []
  });
  const selectedContents = { contentStatus, setContentStatus };

  /// latest Contents 를 위한 state
  const [latestStatus, setLatestStatus] = useState({
    artist: [],
    kind: [],
    keyword: [],
    location: []
  });
  const latestContents = { latestStatus, setLatestStatus };

  //console.log("contentStatus -----------------------------", contentStatus);
  //console.log("latestStatus -----------------------------", latestStatus);

  const handleComplete = async () => {
    return Alert.alert("Complete");
  };

  if (firstScreen && inputText.value.length !== 0) {
    setFirstScreen(false);
  }

  if (!firstScreen && inputText.value.length === 0) {
    setFirstScreen(true);
  }

  //AsyncStorage.removeItem("ContentsHistory");

  const preLoad = async () => {
    try {
      const contentsHistory = await AsyncStorage.getItem("ContentsHistory");
      if (contentsHistory !== null) {
        setLatestStatus(JSON.parse(contentsHistory));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <MainContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <HeaderBase
            isleftBackButton={true}
            centerTitle={"New Filter"}
            isInputBox={false}
            rightButton={HeaderRightStyles.COMPLETE}
            rightButtonLink={handleComplete}
          />
          <FilterOptionBar
            filterOption={filterOption}
            deleteSearchBarFunc={() => inputText.setValue("")}
          ></FilterOptionBar>
        </View>
      </TouchableWithoutFeedback>

      {filterState !== "postType" ? (
        <SearchAndPlusView>
          <TextInput
            returnKeyType="search"
            onChangeText={inputText.onChange}
            value={inputText.value}
            placeholder={"검색어를 입력해주세요."}
            placeholderTextColor={styles.searchBarPlaceholderColor}
            xButton={inputText.value.length > 0 ? true : false}
          ></TextInput>
          {inputText.value.length > 0 ? (
            <XbuttonContainer>
              <Touchable
                onPress={() => {
                  inputText.setValue("");
                }}
              >
                <XButton
                  source={require("../../assets/iconmonstr-x-mark-thin-240.png")}
                ></XButton>
              </Touchable>
            </XbuttonContainer>
          ) : null}

          {filterState !== "location" ? (
            <FilterItemAddButton
              onPress={() => {
                filterState === "artist"
                  ? navigation.navigate("NewArtist", {
                      selectedContents,
                      latestContents
                    })
                  : filterState === "kind"
                  ? navigation.navigate("NewKind", {
                      selectedContents,
                      latestContents
                    })
                  : filterState === "keyword"
                  ? navigation.navigate("NewKeyword", {
                      selectedContents,
                      latestContents
                    })
                  : null;
              }}
            ></FilterItemAddButton>
          ) : null}
        </SearchAndPlusView>
      ) : null}

      <ContentsView>
        {firstScreen ? (
          <BaseContents
            filterOption={filterOption}
            selectedContents={selectedContents}
            latestContents={latestContents}
          ></BaseContents>
        ) : (
          <SearchedContents
            filterOption={filterOption}
            term={inputText.value}
            selectedContents={selectedContents}
            latestContents={latestContents}
          ></SearchedContents>
        )}
      </ContentsView>

      {contentStatus.artist.length !== 0 ||
      contentStatus.kind.length !== 0 ||
      contentStatus.keyword.length !== 0 ||
      contentStatus.location.length !== 0 ||
      contentStatus.postType.length !== 0 ? (
        <SelectedFilterView>
          {Object.entries(contentStatus).map(([key, value]) => {
            return value.length !== 0
              ? value.map(item => (
                  <SelectedContent
                    key={key === "postType" ? item.postType : item.id}
                    contentType={key}
                    value={item}
                    selectedContents={selectedContents}
                  ></SelectedContent>
                ))
              : null;
          })}

          {/* 
          {contentStatus.artist.length !== 0
            ? contentStatus.artist.map(item => (
                <SelectedContent
                  key={item.id}
                  value={item}
                  selectedContents={selectedContents}
                ></SelectedContent>
              ))
            : null} */}
        </SelectedFilterView>
      ) : null}
    </MainContainer>
  );
};

export default Filter;
