import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../../styles";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Back = styled.View`
  position: absolute;
  background-color: ${styles.weGoodsColor};
  height: 50;
  width: 50;
  border-radius: 25;
`;

const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50;
  width: 50;
`;

const Avatar = styled.Image`
  height: 46;
  width: 46;
  border-radius: 23;
  background-color: #bdbdbd;
`;

const CheckContainer = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: flex-end;
  height: 50;
  width: 50;
`;

const Check = styled.Image`
  height: 14;
  width: 14;
`;

const Bumper = styled.View`
  height: 13;
`;

const Username = styled.Text`
  color: black;
  text-align: center;
  font-size: 15;
  font-family: NanumBarunGothicLight;
`;

const UserItem = ({
  onPress,
  avatarUri = "",
  username = "",
  isChecked = false
}) => {
  return (
    <Touchable onPress={onPress}>
      <MainContainer>
        <TopContainer>
          {isChecked === true ? <Back /> : null}

          <AvatarContainer>
            <Avatar source={{ uri: avatarUri }} />
          </AvatarContainer>

          {isChecked === true ? (
            <CheckContainer>
              <Check
                source={require("../../assets/iconmonstr-check-mark-7-240.png")}
              />
            </CheckContainer>
          ) : null}
        </TopContainer>
        <Bumper />
        <Username>{username}</Username>
      </MainContainer>
    </Touchable>
  );
};

UserItem.propTypes = {
  onPress: PropTypes.func,
  avatarUri: PropTypes.string,
  username: PropTypes.string.isRequired,
  isChecked: PropTypes.bool
};

export default UserItem;
