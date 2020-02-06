import React from "react";
import styled from "styled-components";
import styles from "../../../styles";

const FullContainer = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: ${styles.containerTestColor};
  flex: 1;
`;

const ScreenContainer = styled.View`
flex-direction: column;
align-items: center;
background-color: #ed4956;
width: ${styles.baseWidth}
height: 100%;
`;

const Item1 = styled.View`
width: 80%
height: 20%;
background-color: #dddddd;
`;

const Item2 = styled.View`
width: 60%
height: 20%;
background-color: #dddddd;
`;

const Item3 = styled.View`
width: 40%
height: 20%;
background-color: #dddddd;
`;

export default () => (
  <FullContainer>
    <ScreenContainer>
      <Item1 />
      <Item2 />
      <Item3 />
    </ScreenContainer>
  </FullContainer>
);
