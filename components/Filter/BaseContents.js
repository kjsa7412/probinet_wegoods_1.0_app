import React, { useState, useEffect } from "react";
import { AsyncStorage, ScrollView } from "react-native";
import { useQuery } from "react-apollo-hooks";

import PropTypes from "prop-types";

import Content from "../Item/Contents/Content";
import {
  ALL_ARTIST,
  HIT_ARTIST,
  ALL_KIND,
  HIT_KIND,
  POPULAR_KEYWORD,
  HIT_LOCATION,
  HIT_POSTTYPE
} from "../../screens/Filter/FilterQueries";
import Loader from "../Loader";
import constants from "../../constants";
import SubTitleCenter from "../Title/SubTitleCenter";

const BaseContents = ({ filterOption, selectedContents, latestContents }) => {
  const [loading, setLoading] = useState(false);

  /// ---------- 쿼리

  /// all contents
  let allContents = useQuery(
    filterOption.filterState === "artist"
      ? ALL_ARTIST
      : filterOption.filterState === "kind"
      ? ALL_KIND
      : filterOption.filterState === "keyword"
      ? POPULAR_KEYWORD
      : ALL_ARTIST,
    { fetchPolicy: "network-only" }
  );

  /// artist
  let hitContents = useQuery(
    filterOption.filterState === "artist"
      ? HIT_ARTIST
      : filterOption.filterState === "kind"
      ? HIT_KIND
      : filterOption.filterState === "location"
      ? HIT_LOCATION
      : filterOption.filterState === "postType"
      ? HIT_POSTTYPE
      : HIT_ARTIST,
    {
      variables: {
        artist:
          filterOption.filterState !== "artist"
            ? selectedContents.contentStatus.artist.map(artist => {
                return artist.id;
              })
            : [],

        kind:
          filterOption.filterState !== "kind"
            ? selectedContents.contentStatus.kind.map(kind => {
                return kind.id;
              })
            : [],

        keyword:
          filterOption.filterState !== "keyword"
            ? selectedContents.contentStatus.keyword.map(keyword => {
                return keyword.id;
              })
            : [],

        location:
          filterOption.filterState !== "location"
            ? selectedContents.contentStatus.location.map(location => {
                return location.id;
              })
            : [],
        postType:
          filterOption.filterState !== "postType"
            ? selectedContents.contentStatus.postType.map(postType => {
                return postType.postType;
              })
            : []
      },
      fetchPolicy: "network-only"
    }
  );

  // console.log("selectedContents", selectedContents);
  //console.log("hitContents", hitContents);

  /// latestContents 처리 부분
  let useLatestContentsArray = [];
  filterOption.filterState === "artist"
    ? (useLatestContentsArray = latestContents.latestStatus.artist)
    : filterOption.filterState === "kind"
    ? (useLatestContentsArray = latestContents.latestStatus.kind)
    : filterOption.filterState === "keyword"
    ? (useLatestContentsArray = latestContents.latestStatus.keyword)
    : filterOption.filterState === "location"
    ? (useLatestContentsArray = latestContents.latestStatus.location)
    : (useLatestContentsArray = []);

  let usehitContentsArray = [];
  hitContents.data !== undefined
    ? filterOption.filterState === "artist" &&
      hitContents.data.searchArtistOnFilter !== undefined &&
      hitContents.data.searchArtistOnFilter.length !== 0
      ? (usehitContentsArray = hitContents.data.searchArtistOnFilter)
      : filterOption.filterState === "kind" &&
        hitContents.data.searchKindOnFilter !== undefined &&
        hitContents.data.searchKindOnFilter.length !== 0
      ? (usehitContentsArray = hitContents.data.searchKindOnFilter)
      : filterOption.filterState === "location" &&
        hitContents.data.searchLocationOnFilter !== undefined &&
        hitContents.data.searchLocationOnFilter.length !== 0
      ? (usehitContentsArray = hitContents.data.searchLocationOnFilter)
      : filterOption.filterState === "postType" &&
        hitContents.data.searchPostTypeOnFilter !== undefined &&
        hitContents.data.searchPostTypeOnFilter.length !== 0
      ? (usehitContentsArray = hitContents.data.searchPostTypeOnFilter)
      : (usehitContentsArray = [])
    : (usehitContentsArray = []);

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        alignItems: "center",
        width: constants.width
      }}
    >
      {useLatestContentsArray.length !== 0 ? (
        <SubTitleCenter text={"최근 사용"}></SubTitleCenter>
      ) : null}
      {useLatestContentsArray.length !== 0
        ? useLatestContentsArray.map(item => (
            <Content
              key={item.id}
              filterOption={filterOption}
              value={item}
              selectedContents={selectedContents}
              latestContents={latestContents}
            ></Content>
          ))
        : null}

      {/* {hitContents.loading ? (
        <SubTitleCenter text={"조건에 검색중"}></SubTitleCenter>
      ) : usehitContentsArray.length !== 0 ? (
        <SubTitleCenter text={"조건에 맞는"}></SubTitleCenter>
      ) : null}

      {hitContents.loading ? (
        <Loader />
      ) : usehitContentsArray.length !== 0 ? (
        usehitContentsArray.map(item => (
          <Content
            key={item.id}
            filterOption={filterOption}
            value={item}
            selectedContents={selectedContents}
            latestContents={latestContents}
          ></Content>
        ))
      ) : null} */}

      {usehitContentsArray.length !== 0 ? (
        <SubTitleCenter text={"조건에 맞는"}></SubTitleCenter>
      ) : null}

      {usehitContentsArray.length !== 0
        ? usehitContentsArray.map(item => (
            <Content
              key={
                filterOption.filterState === "postType"
                  ? item.postType
                  : item.id
              }
              filterOption={filterOption}
              value={item}
              selectedContents={selectedContents}
              latestContents={latestContents}
            ></Content>
          ))
        : null}

      {filterOption.filterState === "keyword" ? (
        <SubTitleCenter text={"인기"}></SubTitleCenter>
      ) : filterOption.filterState === "location" ? null : (
        <SubTitleCenter text={"모든"}></SubTitleCenter>
      )}

      {filterOption.filterState === "location" ? null : allContents.loading ? (
        <Loader />
      ) : allContents.data !== undefined ? (
        (filterOption.filterState === "artist" &&
        allContents.data.seeRegistedArtistList.length !== 0
          ? (allContentsArray = allContents.data.seeRegistedArtistList)
          : filterOption.filterState === "kind" &&
            allContents.data.seeRegistedKindList.length !== 0
          ? (allContentsArray = allContents.data.seeRegistedKindList)
          : filterOption.filterState === "keyword" &&
            allContents.data.seePopularKeywordList.length !== 0
          ? (allContentsArray = allContents.data.seePopularKeywordList)
          : filterOption.filterState === "postType"
          ? (allContentsArray = [
              { postType: 0, text: "판매" },
              { postType: 1, text: "나눔" },
              { postType: 2, text: "교환" },
              { postType: 3, text: "장터" }
            ])
          : (allContentsArray = []),
        allContentsArray !== undefined && allContentsArray.length !== 0
          ? allContentsArray.map(item => (
              <Content
                key={
                  filterOption.filterState === "postType"
                    ? item.postType
                    : item.id
                }
                filterOption={filterOption}
                value={item}
                selectedContents={selectedContents}
                latestContents={latestContents}
              ></Content>
            ))
          : null)
      ) : null}
    </ScrollView>
  );
};

BaseContents.propTypes = {
  filterOption: PropTypes.object.isRequired,
  selectedContents: PropTypes.object.isRequired,
  latestContents: PropTypes.object.isRequired
};

export default BaseContents;
