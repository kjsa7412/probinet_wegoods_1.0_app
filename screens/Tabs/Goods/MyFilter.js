import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderBase from "../../../components/Header/HeaderBase";
import Loader from "../../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl, Image } from "react-native";
import MyFilterItem from "../../../components/Item/Filter/MyFilterItem";
import HeaderRightStyles from "../../../components/Header/HeaderRight/HeaderRightStyles";
import { SEE_MY_FILTER_LIST } from "./GoodsQueries";

import constants from "../../../constants";
import styles from "../../../styles";
import SelectedDeleteBar from "../../../components/Item/Filter/SelectedDeleteBar";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const Container = styled.View`
  width: ${constants.width};
  align-items: center;
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  // My Filter List
  let myfilterResult = useQuery(SEE_MY_FILTER_LIST, {
    fetchPolicy: "network-only"
  });

  // Scroll Down : 전체 데이터 다시 받아오기
  const refresh = async () => {
    try {
      setRefreshing(true);
      await myfilterResult.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        centerTitle={"My Filter"}
        isInputBox={false}
        rightButton={HeaderRightStyles.ADD}
        rightButtonLink={() => navigation.navigate("NewMyFilter")}
      />

      <SelectedDeleteBar />

      {myfilterResult.loading ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
          <Container>
            {myfilterResult.data.seeMyFilterList.map(myfilter => (
              <MyFilterItem
                key={myfilter.id}
                myFilterImageUri={myfilter.file}
                title={myfilter.title}
                isCheckBox={true}
              />
            ))}
          </Container>
        </ScrollView>
      )}
    </MainContainer>
  );
};
