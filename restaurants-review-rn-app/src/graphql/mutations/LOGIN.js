import gql from 'graphql-tag';

export default gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
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
