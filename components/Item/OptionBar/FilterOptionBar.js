import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../../constants";
import { withNavigation } from "react-navigation";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  height: 37;
  width: ${constants.width};
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const OptionItem = styled.View`
  height: 16;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${props => (props.focus ? "#000000" : "#ACABAB")};
  text-align: center;
  font-size: 14;
  font-family: NanumBarunGothicBold;
`;

const FilterOptionBar = withNavigation(
  ({ navigation, filterOption, deleteSearchBarFunc }) => {
    return (
      <Container>
        <Touchable
          onPress={() => {
            filterOption.filterState !== "artist"
              ? deleteSearchBarFunc()
              : null;
            filterOption.setfilterState("artist");
          }}
        >
          <OptionItem>
            <Text focus={filterOption.filterState === "artist" ? true : false}>
              {"아티스트"}
            </Text>
          </OptionItem>
        </Touchable>

        <Touchable
          onPress={() => {
            filterOption.filterState !== "kind" ? deleteSearchBarFunc() : null;
            filterOption.setfilterState("kind");
          }}
        >
          <OptionItem>
            <Text focus={filterOption.filterState === "kind" ? true : false}>
              {"물품"}
            </Text>
          </OptionItem>
        </Touchable>

        <Touchable
          onPress={() => {
            filterOption.filterState !== "keyword"
              ? deleteSearchBarFunc()
              : null;
            filterOption.setfilterState("keyword");
          }}
        >
          <OptionItem>
            <Text focus={filterOption.filterState === "keyword" ? true : false}>
              {"키워드"}
            </Text>
          </OptionItem>
        </Touchable>

        <Touchable
          onPress={() => {
            filterOption.filterState !== "location"
              ? deleteSearchBarFunc()
              : null;
            filterOption.setfilterState("location");
          }}
        >
          <OptionItem>
            <Text
              focus={filterOption.filterState === "location" ? true : false}
            >
              {"지역"}
            </Text>
          </OptionItem>
        </Touchable>

        <Touchable
          onPress={() => {
            filterOption.filterState !== "postType"
              ? deleteSearchBarFunc()
              : null;
            filterOption.setfilterState("postType");
          }}
        >
          <OptionItem>
            <Text
              focus={filterOption.filterState === "postType" ? true : false}
            >
              {"유형"}
            </Text>
          </OptionItem>
        </Touchable>
      </Container>
    );
  }
);

FilterOptionBar.propTypes = {
  filterStateFunc: PropTypes.object,
  deleteSearchBarFunc: PropTypes.func
};

export default FilterOptionBar;
