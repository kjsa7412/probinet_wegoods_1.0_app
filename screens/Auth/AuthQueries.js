import { gql } from "apollo-boost";

export const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      id
      username
    }
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

export const CONFIRM_PASSWORD = gql`
  query confirmPassword($email: String, $username: String, $password: String!) {
    confirmPassword(email: $email, username: $username, password: $password)
  }
`;

export const EDIT_USER_SIGNUP = gql`
  mutation editUserSignUp(
    $id: String!
    $username: String!
    $password: String!
  ) {
    editUserSignUp(id: $id, username: $username, password: $password) {
      id
      email
      username
      password
    }
  }
`;

export const SEE_USER_FROM_EMAIL = gql`
  query seeUserFromEmail($email: String!) {
    seeUserFromEmail(email: $email) {
      id
      email
      username
    }
  }
`;
