import gql from 'graphql-tag';

export default gql`
  mutation ($id: ID!) {
    deleteRestaurant(id: $id) {
      name
      description
    }
  }
`;
