import { gql } from "apollo-boost";
/// --------------- Filter 관련 Query  ---------------///

/// --------------- artist
export const ALL_ARTIST = gql`
  {
    seeRegistedArtistList {
      id
      name
      parentsArtist {
        name
      }
      activeType
    }
  }
`;

export const HIT_ARTIST = gql`
  query searchArtistOnFilter(
    $kind: [String!]
    $keyword: [String!]
    $location: [String!]
    $postType: [Int!]
  ) {
    searchArtistOnFilter(
      kind: $kind
      keyword: $keyword
      location: $location
      postType: $postType
    ) {
      id
      name
      parentsArtist {
        name
      }
      activeType
      postsCount
    }
  }
`;

export const SEARCH_ARTIST = gql`
  query searchArtist($term: String!) {
    searchArtist(term: $term) {
      id
      name
      parentsArtist {
        name
      }
      activeType
    }
  }
`;

/// --------------- kind
export const ALL_KIND = gql`
  {
    seeRegistedKindList {
      id
      text
    }
  }
`;

export const HIT_KIND = gql`
  query searchKindOnFilter(
    $artist: [String!]
    $keyword: [String!]
    $location: [String!]
    $postType: [Int!]
  ) {
    searchKindOnFilter(
      artist: $artist
      keyword: $keyword
      location: $location
      postType: $postType
    ) {
      id
      text
    }
  }
`;

export const SEARCH_KIND = gql`
  query searchKind($term: String!) {
    searchKind(term: $term) {
      id
      text
    }
  }
`;

/// --------------- keyword
export const POPULAR_KEYWORD = gql`
  {
    seePopularKeywordList {
      id
      text
    }
  }
`;

export const SEARCH_KEYWORD = gql`
  query searchKeyword($term: String!) {
    searchKeyword(term: $term) {
      id
      text
    }
  }
`;

/// --------------- location
export const HIT_LOCATION = gql`
  query searchLocationOnFilter(
    $artist: [String!]
    $kind: [String!]
    $keyword: [String!]
    $postType: [Int!]
  ) {
    searchLocationOnFilter(
      artist: $artist
      kind: $kind
      keyword: $keyword
      postType: $postType
    ) {
      id
      text
    }
  }
`;

export const SEARCH_LOCATION = gql`
  query searchLocation($term: String!) {
    searchLocation(term: $term) {
      id
      text
    }
  }
`;

/// --------------- postType
export const HIT_POSTTYPE = gql`
  query searchPostTypeOnFilter(
    $artist: [String!]
    $kind: [String!]
    $keyword: [String!]
    $location: [String!]
  ) {
    searchPostTypeOnFilter(
      artist: $artist
      kind: $kind
      keyword: $keyword
      location: $location
    ) {
      postType
      text
      postsCount
    }
  }
`;

/// --------------- 각 filter 별 ADD  관련 쿼리  ---------------///

export const ADD_KIND = gql`
  mutation addKind($text: String!) {
    addKind(text: $text) {
      id
      text
    }
  }
`;

export const ADD_KEYWORD = gql`
  mutation addKeyword($text: String!) {
    addKeyword(text: $text) {
      id
      text
    }
  }
`;

export const MY_UN_REGISTED_ARTIST = gql`
  {
    seeUnRegistedArtistList {
      id
      name
      parentsArtist {
        name
      }
      activeType
      registedUserCount
    }
  }
`;

export const ADD_ARTIST = gql`
  mutation addArtist(
    $name: String
    $engName: String
    $alternativeName: [String!]
    $members: [member!]
    $jopType: String
    $action: ACTIONS!
  ) {
    addArtist(
      name: $name
      engName: $engName
      alternativeName: $alternativeName
      members: $members
      jopType: $jopType
      action: $action
    ) {
      id
      name
      parentsArtist {
        name
      }
      activeType
      registResult
    }
  }
`;
