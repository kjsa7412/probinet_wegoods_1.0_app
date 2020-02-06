import { gql } from "apollo-boost";

export const SEE_ADVERTISEMENT = gql`
  query search($loadNumber: Int) {
    seeAdvertisement(loadNumber: $loadNumber) {
      id
      files
      user {
        id
      }
      post {
        id
      }
      link
      connectType
    }
  }
`;

export const SEE_CREATOR = gql`
  query search($loadNumber: Int) {
    seeCreatorList(loadNumber: $loadNumber) {
      id
      user {
        id
        username
        avatar
      }
      rank
    }
  }
`;

export const SEE_CREATOR_CARD = gql`
  query search($loadNumber: Int, $creatorId: [String!]) {
    seeCreatorCardList(loadNumber: $loadNumber, creatorId: $creatorId) {
      id
      user {
        id
        username
        avatar
        posts {
          id
          files
        }
      }
      rank
    }
  }
`;

// ----------
// Problem : 아래 Query에서 artist의 activeType 필드 값을 가져오지 못함
// Resolve 190918 :
// loading 되기도 전에 Render를 하려고 해서 생기는 문제
// 데이터가 모두 loading 되면 Render가 될 수 있도록 하자
// ----------
export const SEE_FILTER = gql`
  query search($loadNumber: Int) {
    seePopularFilterListHorizontal(loadNumber: $loadNumber) {
      id
      postFilter {
        id
        files
      }
      artist {
        id
        name
        activeType
      }
      postType
      kind {
        id
        text
      }
      keyword {
        id
        text
      }
      location {
        id
        text
      }
    }
  }
`;

/// 인기
export const SEE_INTEREST = gql`
  query seeInterest($loadNumber: Int, $postsId: [String!]) {
    seeInterest(loadNumber: $loadNumber, postsId: $postsId) {
      id
      files
      title
      type
      price
      numberOfParticipants
      participantsCount
    }
  }
`;

/// 장터
export const SEE_MARKET = gql`
  query search($loadNumber: Int, $postsId: [String!]) {
    seeMarketList(loadNumber: $loadNumber, postsId: $postsId) {
      id
      files
      title
      type
      numberOfParticipants
      participantsCount
    }
  }
`;

/// 일상
export const SEE_LIFEPOST = gql`
  query search($loadNumber: Int, $id: [String!]) {
    seeRandomLifePost(loadNumber: $loadNumber, id: $id) {
      id
      files
    }
  }
`;

/// 모임
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
