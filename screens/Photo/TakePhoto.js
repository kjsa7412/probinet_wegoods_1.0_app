import React, { useState, useEffect, useRef } from "react";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import HeaderBase from "../../components/Header/HeaderBase";
import { NavigationActions } from "react-navigation";

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

const CameraScreen = styled.View`
  width: ${constants.width};
  height: ${constants.width};

  background-color: ${props =>
    props.source
      ? styles.photoBackgroundColor + "00"
      : styles.photoBackgroundColor};
`;

const TakeButtonContainer = styled.View`
  width: ${constants.width};
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const TakeButton = styled.View`
  width: 63;
  height: 63;
  border-radius: 60px;
  border: 8px solid ${styles.photoBackgroundColor};
`;

const Text = styled.Text`
  font-size: 18;
  font-family: NanumBarunGothicBold;
  margin-right: 14;
  margin-left: 14;
`;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  // 사진찍은 후 goback 할때 refresh 를 위해 함수를 받아옴.
  const refresh = navigation.getParam("refresh", () => {});

  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1
      });
      const asset = await MediaLibrary.createAssetAsync(uri);

      refresh();
      navigation.goBack();

      setCanTakePhoto(true);
    } catch (e) {
      console.log(e);
      setCanTakePhoto(true);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <MainContainer>
      <HeaderBase
        isleftBackButton={true}
        centerTitle={"카메라"}
        isInputBox={false}
      />

      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={{
              width: constants.width,
              height: constants.width
            }}
          />
          <TakeButtonContainer>
            <Touchable onPress={takePhoto}>
              <TakeButton></TakeButton>
            </Touchable>
          </TakeButtonContainer>
        </Container>
      )}
    </MainContainer>
  );
};
