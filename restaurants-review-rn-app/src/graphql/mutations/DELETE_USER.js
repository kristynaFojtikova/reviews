import gql from 'graphql-tag';

export default gql`
  mutation ($id: ID) {
    deleteUser(id: $id) {
      id
    }
  }
`;
