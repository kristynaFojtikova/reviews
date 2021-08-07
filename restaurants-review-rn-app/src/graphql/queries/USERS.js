import gql from 'graphql-tag';

export default gql`
  {
    users {
      email
      role
      id
    }
  }
`;
