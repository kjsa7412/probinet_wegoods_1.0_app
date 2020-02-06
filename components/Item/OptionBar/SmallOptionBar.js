import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../../constants";

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
`;

const Text = styled.Text`
  color: ${props => (props.focus ? "#000000" : "#ACABAB")};
  text-align: center;
  font-size: 14;
  font-family: NanumBarunGothicBold;
`;

const SmallOptionBar = ({
  orderByOption = [],
  currentOptionKey,
  orderByOptionSetFunc,
  changeStateFunc,
  touchableStatus = true
}) => {
  // 초기 status 및 focus 활성화
  let bar = [];
  orderByOption.map((item, index) => {
    let boolValue = false;
    index === 0 ? (boolValue = true) : (boolValue = false);
    const [focus, setFocus] = useState(boolValue);
    bar.push({ text: item.text, optionKey: item.optionKey, focus, setFocus });
  });

  // 눌렀을때 focus 이동 및 state 변경
  // 하나만 선택이 가능 하도록 해둠.
  const onPressFocus = async pressIndex => {
    bar[pressIndex].focus === false ? bar[pressIndex].setFocus(true) : null;
    bar.map((item, index) => {
      item.focus && pressIndex !== index ? item.setFocus(false) : null;
    });

    bar[pressIndex].optionKey !== currentOptionKey
      ? (changeStateFunc(true), orderByOptionSetFunc(bar[pressIndex].optionKey))
      : null;

    //await onPressReflashFunc();
  };

  return (
    <Container>
      {bar !== []
        ? bar.map((item, index, array) => (
            <OptionItem key={item.text}>
              <Touchable
                onPress={() => (touchableStatus ? onPressFocus(index) : null)}
              >
                <Text focus={item.focus}>{item.text}</Text>
              </Touchable>
            </OptionItem>
          ))
        : null}
    </Container>
  );
};

SmallOptionBar.propTypes = {
  orderByOption: PropTypes.array,
  currentOptionKey: PropTypes.string,
  orderByOptionSetFunc: PropTypes.func,
  changeStateFunc: PropTypes.func,
  touchableStatus: PropTypes.bool
};

export default SmallOptionBar;
