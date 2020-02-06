import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props => props.theme.whiteColor};
  width: 136;
  height: 136;
  margin-left: 6
  margin-right: 6
  justify-content: center;
`;

const PostImage = styled.Image`
  height: 136;
  width: 136;
  margin-left: auto;
  margin-right: auto;
`;

const PostSmall = ({ postUri }) => (
  <Touchable>
    <Container>
      <PostImage source={{ uri: postUri }} />
    </Container>
  </Touchable>
);

PostSmall.propTypes = {
  postUri: PropTypes.string.isRequired
};

export default PostSmall;
