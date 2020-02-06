import { gql } from "apollo-boost";
/// Home
/// --------------- Goods 관련 Query  ---------------///

export const SEE_INTEREST = gql`
  query seeInterest($loadNumber: Int, $postsId: [String!]) {
    seeInterest(loadNumber: $loadNumber, postsId: $postsId) {
      id
      files
      title
      type
      numberOfParticipants
      participantsCount
    }
  }
`;

export const SEE_MY_FILTER_LIST = gql`
  {
    seeMyFilterList {
      id
      file
      title
    }
  }
`;

export const GET_POST_ID = gql`
  query getPostIdList($orderby: POSTORDERBY) {
    getPostIdList(orderby: $orderby)
  }
`;

export const SEE_POST_LIST = gql`
  query seePostList($postsId: [String!]!, $orderby: POSTORDERBY) {
    seePostList(postsId: $postsId, orderby: $orderby) {
      id
      files
      title
      type
      numberOfParticipants
      participantsCount
    }
  }
`;
