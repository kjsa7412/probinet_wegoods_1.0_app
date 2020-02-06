import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #d0f0f2;
`;

const LogoText = styled.Text`
  margin-top: 60;
  font-size: 45;
  color: white;
  font-weight: bold;
  font-family: NanumBarunGothicBold;
`;

const Logo = ({ text = false }) => (
  <View>
    <LogoText>{text}</LogoText>
  </View>
);

export default Logo;
