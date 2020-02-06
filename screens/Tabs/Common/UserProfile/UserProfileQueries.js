import { gql } from "apollo-boost";

export const SEE_USER = gql`
  query seeUser($userId: String!) {
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
      isFollowing
      followers {
        id
        avatar
        username
        isFollowing
        isSelf
      }
      following {
        id
        avatar
        username
        isFollowing
        isSelf
      }
      isSelf
    }
  }
`;

export const SEE_USER_POST = gql`
  query seePostListFromUser($userId: String!) {
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
  query seeLifePostFromUser($userId: String!) {
    seeLifePostFromUser(userId: $userId) {
      id
      files
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation follow($userId: String!) {
    follow(id: $userId)
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unfollow($userId: String!) {
    unfollow(id: $userId)
  }
`;
