import gql from 'graphql-tag';

export default gql`
  query {
    user {
      id
      email
      role
      password
    }
  }
`;
