import { gql } from "apollo-boost";

export const SEE_POST = gql`
  query search($postId: String!) {
    seeOnePost(id: $postId) {
      id
      type
      isLiked
      tradeType
      createdAt
      updatedAt
      files
      user {
        id
        avatar
        username
      }
      likeCount
      commentCount
      title
      description
      price
      postFilter {
        id
        artist {
          id
          name
        }
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
      wantFilter {
        id
        artist {
          id
          name
        }
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
      participantsCount
      numberOfParticipants
      participants {
        id
        avatar
        username
      }
      registedMiniPosts {
        id
        files
        title
      }
      comments {
        id
        user {
          id
          avatar
          username
        }
        text
      }
      postQuiz {
        id
        title
        question
        answers
        rightAnswer
      }
      varifyDesc
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

export const SEE_PARTICIPANTS = gql`
  query search($postId: String!) {
    seeUserFromPost(inPostId: $postId) {
      id
      avatar
      username
    }
  }
`;

export const SEE_MINIPOST = gql`
  query search($postId: String!) {
    seeRegistMiniPostList(postId: $postId) {
      id
      files
      user {
        id
        avatar
        username
      }
      title
      description
      createdAt
      updatedAt
    }
  }
`;
