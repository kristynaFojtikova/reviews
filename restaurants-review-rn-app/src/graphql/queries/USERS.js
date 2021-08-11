import gql from 'graphql-tag';

export default gql`
  query {
    users {
      email
      role
      id
      password
    }
  }
`;
