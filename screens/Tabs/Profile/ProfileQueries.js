import { gql } from "apollo-boost";

export const SEE_ME = gql`
  {
    me {
      id
      background
      avatar
      username
      favorites {
        id
        name
      }
      alarmsCount
      followingCount
      followersCount
      postsCount
      bio
    }
  }
`;

export const SEE_POST = gql`
  {
    seeMyPostList {
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

export const SEE_INPOST = gql`
  {
    seeMyInPostList {
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

export const SEE_LIFEPOST = gql`
  {
    seeMyLifePostList {
      id
      files
    }
  }
`;

export const SEE_USER = gql`
  query search($userId: String!) {
    seeUser(id: $userId) {
      id
      background
      avatar
      username
      favorites {
        id
        name
      }
      followingCount
      followersCount
      postsCount
      bio
    }
  }
`;

export const SEE_USER_POST = gql`
  query search($userId: String!) {
    seePostListFromUser(userId: $userId) {
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

export const SEE_USER_LIFEPOST = gql`
  query search($userId: String!) {
    seeLifePostFromUser(userId: $userId) {
      id
      files
    }
  }
`;
