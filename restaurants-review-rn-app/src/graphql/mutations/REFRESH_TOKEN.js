import gql from 'graphql-tag';

export default gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      ... on AuthSuccess {
        accessToken
        refreshToken
        user {
          email
          role
          id
        }
      }
      ... on AuthError {
        code
        message
      }
    }
  }
`;
