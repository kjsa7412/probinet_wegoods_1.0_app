import { gql } from "apollo-boost";

export const SEE_RANDOM_LIFEPOST = gql`
  query search($loadNumber: Int, $id: [String!]) {
    seeRandomLifePost(loadNumber: $loadNumber, id: $id) {
      id
      files
    }
  }
`;

export const SEE_GATHERING = gql`
  query search($loadNumber: Int, $id: [String!]) {
    seeRandomGathering(loadNumber: $loadNumber, id: $id) {
      id
      file
      title
      subTitle
    }
  }
`;

export const SEE_RELATED_LIFEPOST = gql`
  query search($loadNumber: Int, $id: [String!]) {
    seeRelatedLifePost(loadNumber: $loadNumber, id: $id) {
      id
      files
      title
      user {
        id
        avatar
        username
      }
      likeCount
      commentCount
      createdAt
      updatedAt
    }
  }
`;

export const SEE_LIFEPOST = gql`
  query seeOneLifePost($lifePostId: String!) {
    seeOneLifePost(id: $lifePostId) {
      id
      likes {
        id
        user {
          id
          avatar
          username
          isFollowing
          isSelf
        }
      }
    }
  }
`;

export const ADD_LIFEPOST = gql`
  mutation addLifePost($files: [String!]!, $title: String!) {
    addLifePost(files: $files, title: $title) {
      id
    }
  }
`;
