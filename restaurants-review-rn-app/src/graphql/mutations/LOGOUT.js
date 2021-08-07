import gql from 'graphql-tag';

export default gql`
  mutation ($refreshToken: String!) {
    logout(refreshToken: $refreshToken)
  }
`;
