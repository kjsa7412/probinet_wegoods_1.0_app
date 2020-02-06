/// ----------
/// Import
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  Platform,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import { gql } from "apollo-boost";
import useInput from "../../../../hooks/useInput";
import styles from "../../../../styles";
import HeaderRightStyles from "../../../../components/Header/HeaderRight/HeaderRightStyles";
import Loader from "../../../../components/Loader";
import HeaderBase from "../../../../components/Header/HeaderBase";
import UserItem from "../../../../components/Item/UserItem";

/// ----------
/// Styled Components

///
const Touchable = styled.TouchableOpacity``;

///
const FullContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
  background-color: #3897f0;
`;

const ScreenContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${styles.baseWidth};
  height: 100%;
`;

///

const UserItemContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  height: 130;
  background-color: #dddddd;
`;

///
const SEARCH_USER = gql`
  query searchUser($term: String!) {
    searchUser(term: $term) {
      id
      avatar
      username
    }
  }
`;

export default ({ navigation }) => {
  /// ----------
  /// Init
  const searchText = useInput("");
  const [userData, setUserData] = useState([]);
  const [init, setInit] = useState(true);
  const [checking, setChecking] = useState(false);

  /// 데이터 초기화
  const searchUserResult = useQuery(SEARCH_USER, {
    variables: { term: searchText.value },
    fetchPolicy: "network-only"
  });

  // useQuery가 작동했다면 loading이 반응한다.
  // 따라서 useQuery가 작동했다면 데이터 세팅이 필요해서 init를 false로 만든다.
  if (init === true && searchUserResult.loading === true) {
    setInit(false);
  }

  // 데이터 세팅이 필요한경우
  // isChecked 값을 세팅해준다.
  if (
    init === false &&
    searchUserResult.loading === false &&
    searchUserResult.data !== undefined
  ) {
    searchUserResult.data.searchUser.map(value => {
      value.isChecked = false;
    });
    setUserData(searchUserResult.data.searchUser);
    setInit(true);
  }

  // 체크했을때 ischecked 값을 변경해준다.
  const checkUser = async id => {
    setChecking(true);
    let tempUserData = userData;

    const idx = tempUserData.findIndex(value => value.id === id);

    if (idx > -1) {
      tempUserData[idx].isChecked
        ? (tempUserData[idx].isChecked = false)
        : (tempUserData[idx].isChecked = true);
    }

    /// 아.. 시간 겁나 썼네..
    /// 1. setUserData(tempUserData);
    /// 이미 가지고있는 배열을 호출 하고 전달합니다.
    /// 값 중 하나를 변경했지만 여전히 동일한 배열이며 상태가 변경되지 않았기 때문에
    /// React가 다시 렌더링 할 이유가 없다고 생각합니다.
    /// 새 배열은 이전 배열입니다.
    /// 이를 피하는 한 가지 쉬운 방법은 배열을 새로운 배열로 확산시키는 것입니다.
    /// 2. setUserData([...tempUserData]);

    setUserData([...tempUserData]);
    setChecking(false);
  };

  const saveData = async () => {
    let UserSearchResult = [];
    if (userData.length !== 0) {
      userData.map(value =>
        value.isChecked ? UserSearchResult.push(value.id) : null
      );
    }
    navigation.state.params.selectUser(UserSearchResult, navigation);
  };

  return (
    <FullContainer>
      <ScreenContainer>
        <HeaderBase
          isleftBackButton={true}
          isInputBox={true}
          {...searchText}
          onSubmit={() => {}}
          rightButton={HeaderRightStyles.COMPLETE}
          rightButtonLink={saveData}
        />
        {!init ? (
          <Loader />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
          >
            {userData.map(value => (
              <UserItemContainer key={value.id}>
                <UserItem
                  avatarUri={value.avatar}
                  username={value.username}
                  isChecked={value.isChecked}
                  onPress={() => checkUser(value.id)}
                />
              </UserItemContainer>
            ))}
          </ScrollView>
        )}
      </ScreenContainer>
    </FullContainer>
  );
};
