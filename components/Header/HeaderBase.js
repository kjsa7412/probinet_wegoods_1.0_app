import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../../styles";
import constants from "../../constants";
import { View, ScrollView, RefreshControl, Platform } from "react-native";
import { withNavigation } from "react-navigation";

import SearchBar from "../Search/SearchBar";

import HeaderRightLink from "./HeaderRight/HeaderRightLink";

const SMALL = 203;
const NORMAL = 289;
const LARGE = 326;

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.isLeftButton ? "space-between" : "flex-end"};
  align-items: center;
  width: ${styles.baseWidth};
  height: ${styles.headerHeight};
`;

const LeftContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.headerHeight};
  height: 100%;
`;

const CenterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  padding-top: 6;
  padding-bottom: 6;
  padding-left: ${props => (props.isLeftButton ? 0 : 15)};
  padding-right: ${props => (props.isRightButton ? 0 : 15)};
`;

const RightContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.headerHeight};
  height: 100%;
`;

const LeftImage = styled.Image`
  width: 9;
  height: 14;
`;

///

const CenterTitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const CenterTitleText = styled.Text`
  font-size: 18;
  font-family: NanumBarunGothicBold;
`;

const HeaderBase = withNavigation(
  ({
    navigation,
    // back button을 활성화 시킬 경우 사용 할것
    isleftBackButton = false,
    isleftBackButtonColor = "black",
    isleftBackButtonFunc,

    // center 에 title 을 명시할 때 사용
    centerTitle = "",

    // Input box 를 사용할 경우 true 로 설정
    isInputBox = false,

    flashButton,

    // rightButton 과 rightButtonLink 쌍으로 들어와 있어야 한다.
    rightButton,
    rightButtonLink = () => {},

    //search 관련 인자
    value,
    onChange,
    onSubmit
  }) => {
    return (
      <Container isLeftButton={isleftBackButton}>
        <View style={{ flexDirection: "row" }}>
          {isleftBackButton ? (
            <Touchable
              onPress={
                isleftBackButtonFunc !== undefined
                  ? isleftBackButtonFunc
                  : () => navigation.goBack()
              }
            >
              <LeftContainer>
                <LeftImage
                  source={
                    isleftBackButtonColor === "white"
                      ? require("../../assets/iconmonstr-arrow-white.png")
                      : require("../../assets/iconmonstr-arrow-64-240.png")
                  }
                />
              </LeftContainer>
            </Touchable>
          ) : null}

          {/* 플래쉬 버튼이 있는 경우사용 되며 center title 의 위치 조정을 위해 추가 */}
          {flashButton !== undefined && flashButton === true ? (
            <View
              style={{
                width: styles.headerHeight,
                height: styles.headerHeight
              }}
            />
          ) : null}
        </View>

        {centerTitle !== "" ? (
          <CenterTitleContainer>
            <CenterTitleText>{centerTitle}</CenterTitleText>
          </CenterTitleContainer>
        ) : null}

        {isInputBox ? (
          <CenterContainer
            isLeftButton={isleftBackButton}
            isRightButton={rightButton !== undefined}
          >
            <SearchBar
              value={value}
              onChange={onChange}
              onSubmitEditing={onSubmit}
              placeholder="검색어를 입력해주세요"
            />
          </CenterContainer>
        ) : null}

        <View style={{ flexDirection: "row" }}>
          {/* 플래쉬 버튼이 있는 경우사용 되며 center title 의 위치 조정을 위해 추가 */}
          {flashButton !== undefined && flashButton === true ? (
            <View
              style={{
                width: styles.headerHeight,
                height: styles.headerHeight
              }}
            />
          ) : null}

          {rightButton !== undefined ? (
            <Touchable onPress={rightButtonLink}>
              <RightContainer>
                {/* 각 icon 별로 components 들은 여기에 서 호출해서 사용하도록한다. */}
                <HeaderRightLink rightButton={rightButton} />
              </RightContainer>
            </Touchable>
          ) : null}
        </View>
      </Container>
    );
  }
);

HeaderBase.propTypes = {
  isleftBackButton: PropTypes.bool,
  isleftBackButtonFunc: PropTypes.func,

  centerTitle: PropTypes.string,
  isInputBox: PropTypes.bool,
  flashButton: PropTypes.bool,

  rightButton: PropTypes.object,
  rightButtonLink: PropTypes.func,

  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default HeaderBase;
