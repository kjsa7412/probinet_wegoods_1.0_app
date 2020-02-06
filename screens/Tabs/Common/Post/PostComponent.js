import styled from "styled-components";
import styles from "../../../../styles";

/// ----------
export const Touchable = styled.TouchableOpacity``;

///
export const CreatedDateContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const CreatedDateText = styled.Text`
  color: ${styles.blackColor};
  text-align: center;
  font-size: 11;
  font-family: NanumBarunGothicLight;
  margin-bottom: 15;
`;

///
export const TitleContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%
  height: 100;
  margin-top: 20;
`;

export const TitleText = styled.Text`
  color: ${styles.blackColor};
  text-align: center;
  font-size: 27;
  font-family: NanumBarunGothicBold;
`;

///
export const ParticipantsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const ParticipantsText1 = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 23;
  font-family: NanumBarunGothicBold;
`;

export const ParticipantsText2 = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicLight;
`;

///
export const WantContainer = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

export const WantText = styled.Text`
  color: #ff659b;
  text-align: right;
  font-size: 13;
  font-family: NanumBarunGothicLight;
`;

///
export const CountContainer = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

export const CountText = styled.Text`
  color: #acabab;
  text-align: right;
  font-size: 13;
  font-family: NanumBarunGothicBold;
`;

///
export const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%
  height: 41;
`;

export const FilterTitleText = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 18;
  font-family: NanumBarunGothicBold;
`;

export const FilterContentText = styled.Text`
  color: ${styles.blackColor};
  text-align: left;
  font-size: 15;
  font-family: NanumBarunGothicLight;
`;

export const WantFilterContentText = styled.Text`
  color: #ff659b;
  text-align: left;
  font-size: 15;
  font-family: NanumBarunGothicLight;
`;

///
export const SomethingButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 317;
  height: 41;
  border-radius: 20;
  background-color: ${props =>
    props.enable === true ? styles.weGoodsColor : "#ACABAB"};
  margin-top: 15;
  margin-bottom: 15;
`;

export const SomethingText = styled.Text`
  color: ${styles.whiteColor};
  text-align: center;
  font-size: 18;
  font-family: NanumBarunGothicBold;
`;

///
export const PostContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 15;
`;

export const LifeImage = styled.Image`
  width: 167;
  height: 167;
  margin-bottom: 14;
`;

///
export const UserContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15;
  width: 100%;
`;

export const UserItemContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  height: 100;
`;

///
export const BottomContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 20;
  margin-bottom: 20;
`;
