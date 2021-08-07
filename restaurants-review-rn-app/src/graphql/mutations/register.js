import gql from 'graphql-tag';

export default gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
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
