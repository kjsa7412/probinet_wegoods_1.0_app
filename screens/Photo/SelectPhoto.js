import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import HeaderBase from "../../components/Header/HeaderBase";
import SquarePicture from "../../components/Item/Camera/SquarePicture";
import HeaderRightStyles from "../../components/Header/HeaderRight/HeaderRightStyles";

import constants from "../../constants";
import styles from "../../styles";
import Loader from "../../components/Loader";

const Touchable = styled.TouchableOpacity``;

const MainContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

const Container = styled.View`
  width: ${constants.width};
  align-items: center;
  flex: 1;
`;

const SelectedImage = styled.Image`
  width: ${constants.width};
  height: ${constants.width};
  background-color: ${props =>
    props.source
      ? styles.photoBackgroundColor + "00"
      : styles.photoBackgroundColor};
`;

const CameraContainer = styled.View`
  width: ${constants.width / 3 - 1};
  height: ${constants.width / 3 - 1};
  align-items: center;
  justify-content: center;
  margin-bottom: 1;
  background-color: ${styles.photoBackgroundColor};
`;

const CameraImage = styled.Image`
  width: 72;
  height: 58;
`;

const Text = styled.Text`
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-right: 14;
  margin-left: 14;
`;

const SelectPhoto = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [allPhotos, setAllPhotos] = useState();

  // 현재 선택한 사진
  const [selectedPhoto, setSelectedPhoto] = useState();

  // 선택된 모든 사진의 uri 를 저장
  const [selectedPhotoUriArr, setSelectedPhotoUriArr] = useState([]);

  // 다중선택을 허용할지 말지 판단하기 위한 flag
  const isMultiSelect = navigation.getParam("isMultiSelect", false);

  // header left/right 함수 설정
  const leftBackButtonFunc = navigation.getParam(
    "leftBackButtonFunc",
    () => {}
  );
  const rightButtonFunc = navigation.getParam("rightButtonFunc", () => {});

  ///----------- 함수
  const selectPhoto = async inputUri => {
    // selectedPhotoUriArr 의 상태, isMultiSelect 여부에 따라 동작을 다르게 함.

    selectedPhotoUriArr.includes(inputUri)
      ? isMultiSelect
        ? setSelectedPhotoUriArr(
            selectedPhotoUriArr.filter(uri => uri !== inputUri)
          )
        : null
      : isMultiSelect
      ? setSelectedPhotoUriArr(selectedPhotoUriArr.concat([inputUri]))
      : setSelectedPhotoUriArr([inputUri]);
  };

  const getPhotos = async () => {
    try {
      let { assets } = await MediaLibrary.getAssetsAsync();

      // 가장 최근에 찍은게 올라오도록 sorting 한번 한다
      await assets.sort(function(a, b) {
        if (a.creationTime < b.creationTime) {
          return 1;
        }
        if (a.creationTime > b.creationTime) {
          return -1;
        }
        return 0;
      });

      // 첫 화면에서 선택된 채로 할 것인지 아닌지 설정
      // 단일 선택일 경우에는 setting 한다.
      const [firstPhoto] = assets;
      !isMultiSelect
        ? (selectPhoto(firstPhoto.uri), setSelectedPhoto(firstPhoto))
        : null;

      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        isleftBackButtonFunc={leftBackButtonFunc}
        centerTitle={"내 앨범"}
        isInputBox={false}
        rightButton={HeaderRightStyles.SELECT}
        rightButtonLink={() => rightButtonFunc(selectedPhotoUriArr)}
      />

      {loading ? (
        <Loader />
      ) : (
        <Container>
          {selectedPhoto !== undefined &&
          selectedPhoto.uri !== "" &&
          selectedPhotoUriArr.length !== 0 ? (
            <SelectedImage source={{ uri: selectedPhoto.uri }} />
          ) : (
            <SelectedImage></SelectedImage>
          )}

          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: constants.width
            }}
          >
            <Touchable
              onPress={() =>
                navigation.navigate("TakePhoto", { refresh: getPhotos })
              }
            >
              <CameraContainer>
                <CameraImage
                  source={require("../../assets/iconmonstr-photo-camera-4-240.png")}
                ></CameraImage>
              </CameraContainer>
            </Touchable>

            {allPhotos !== undefined && allPhotos.length !== 0
              ? allPhotos.map(
                  (item, index) => (
                    selectedPhotoUriArr.includes(item.uri)
                      ? (item.checked = true)
                      : (item.checked = false),
                    (
                      <SquarePicture
                        key={item.id}
                        photo={item}
                        index={index}
                        onPressSelect={{
                          setSelectedPhoto,
                          selectPhoto
                        }}
                      ></SquarePicture>
                    )
                  )
                )
              : null}
          </ScrollView>
        </Container>
      )}
    </MainContainer>
  );
};

export default SelectPhoto;
