import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../../constants";
import styles from "../../../styles";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  width: ${constants.width};
  height: 90;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.View`
  width: ${constants.width - 60};
  height: 90;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const RightContainer = styled.View`
  width: 55;
  height: 90;
  align-items: center;
  justify-content: center;
`;

const FilterImage = styled.Image`
  width: 56;
  height: 55;
  border-radius: 20;
  margin-left: 15;
  margin-right: 13;
  background-color: ${props =>
    props.source !== undefined && props.source.uri !== ""
      ? styles.weGoodsColor + "00"
      : styles.weGoodsColor};
`;

const TitleText = styled.Text`
  color: ${styles.myFilterTitleColor};
  font-size: 18;
  font-family: NanumBarunGothicLight;
`;

const EmptyCheckBox = styled.View`
  width: 27;
  height: 27;
  border-radius: 50;
  border: 2px solid ${styles.myFilterCheckBorderColor};
`;

const CheckImage = styled.Image`
  width: 27;
  height: 27;
`;

const MyFilterItem = ({ myFilterImageUri = "", title, isCheckBox = false }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <MainContainer>
      <Touchable>
        <LeftContainer>
          {myFilterImageUri !== "" ? (
            <FilterImage source={{ uri: myFilterImageUri }} />
          ) : (
            <FilterImage />
          )}

          <TitleText>{title}</TitleText>
        </LeftContainer>
      </Touchable>
      {isCheckBox ? (
        <Touchable
          onPress={() => (isChecked ? setIsChecked(false) : setIsChecked(true))}
        >
          <RightContainer>
            {isChecked ? (
              <CheckImage
                source={require("../../../assets/iconmonstr-check-mark-4-240.png")}
              />
            ) : (
              <EmptyCheckBox />
            )}
          </RightContainer>
        </Touchable>
      ) : null}
    </MainContainer>
  );
};

MyFilterItem.propTypes = {
  myFilterImageUri: PropTypes.string,
  title: PropTypes.string.isRequired,
  isCheckBox: PropTypes.bool
};

export default MyFilterItem;
