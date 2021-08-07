import gql from 'graphql-tag';

export default gql`
  mutation ($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      name
      description
    }
  }
`;
