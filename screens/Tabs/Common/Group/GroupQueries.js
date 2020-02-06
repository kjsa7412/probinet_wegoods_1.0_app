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

export const SEE_ONE_GROUP = gql`
  query seeOneGroup($groupId: String!) {
    seeOneGroup(groupId: $groupId) {
      id
      file
      title
      subTitle
      owner {
        id
        avatar
        username
      }
      participants {
        id
        avatar
        username
      }
      participantsCount
      createdAt
      updatedAt
    }
  }
`;

export const ADD_GROUP = gql`
  mutation addRoom(
    $participants: [String!]!
    $title: String
    $subTitle: String
    $file: String
  ) {
    addRoom(
      participants: $participants
      title: $title
      subTitle: $subTitle
      file: $file
    ) {
      id
    }
  }
`;

export const SEE_USERS = gql`
  query seeUsers($id: [String!]) {
    seeUsers(id: $id) {
      id
      avatar
      username
    }
  }
`;
