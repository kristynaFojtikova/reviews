import gql from 'graphql-tag';

export default gql`
  mutation ($input: EditRestaurantInput!) {
    editRestaurant(input: $input) {
      name
      description
    }
  }
`;
