import React from "react";
import { ScrollView } from "react-native";
import { useQuery } from "react-apollo-hooks";

import styled from "styled-components";

import PropTypes from "prop-types";

import Content from "../Item/Contents/Content";
import {
  SEARCH_ARTIST,
  SEARCH_KIND,
  SEARCH_KEYWORD,
  SEARCH_LOCATION
} from "../../screens/Filter/FilterQueries";
import Loader from "../Loader";
import constants from "../../constants";

const Container = styled.View`
  justify-content: center;
  width: ${constants.width};
  height: 54;
`;

const Text = styled.Text`
  margin-left: 14;
  margin-right: 8;
  font-size: 13;
  font-family: NanumBarunGothicLight;
`;

const SearchedContents = ({
  filterOption,
  term = [],
  selectedContents,
  latestContents
}) => {
  /// ---------- 쿼리
  let searchResult = useQuery(
    filterOption.filterState === "artist"
      ? SEARCH_ARTIST
      : filterOption.filterState === "kind"
      ? SEARCH_KIND
      : filterOption.filterState === "keyword"
      ? SEARCH_KEYWORD
      : filterOption.filterState === "location"
      ? SEARCH_LOCATION
      : null,
    {
      variables: { term },
      fetchPolicy: "network-only"
    }
  );

  let searchResultArray = [];
  searchResult.data !== undefined
    ? filterOption.filterState === "artist" &&
      searchResult.data.searchArtist.length !== 0
      ? (searchResultArray = searchResult.data.searchArtist)
      : filterOption.filterState === "kind" &&
        searchResult.data.searchKind.length !== 0
      ? (searchResultArray = searchResult.data.searchKind)
      : filterOption.filterState === "keyword" &&
        searchResult.data.searchKeyword.length !== 0
      ? (searchResultArray = searchResult.data.searchKeyword)
      : filterOption.filterState === "location" &&
        searchResult.data.searchLocation.length !== 0
      ? (searchResultArray = searchResult.data.searchLocation)
      : (searchResultArray = [])
    : (searchResultArray = []);

  return searchResult.loading ? (
    <Loader />
  ) : (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        alignItems: "center",
        width: constants.width
      }}
    >
      {searchResultArray.length !== 0 ? (
        searchResultArray.map(item => (
          <Content
            key={item.id}
            filterOption={filterOption}
            value={item}
            selectedContents={selectedContents}
            latestContents={latestContents}
          ></Content>
        ))
      ) : (
        <Container>
          <Text>{"검색 결과가 없습니다."}</Text>
        </Container>
      )}
    </ScrollView>
  );
};

SearchedContents.propTypes = {
  term: PropTypes.string.isRequired,
  selectedContents: PropTypes.object.isRequired,
  latestContents: PropTypes.object.isRequired,
  filterOption: PropTypes.object.isRequired
};

export default SearchedContents;
