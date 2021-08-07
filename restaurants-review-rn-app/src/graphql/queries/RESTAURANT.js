import gql from 'graphql-tag';

export default gql`
  query restaurant($id: ID!) {
    restaurant(id: $id) {
      name
      description
      imageUrls
      id
      reviews {
        id
        reviewerId
        restaurantId
        rating
        userComment
        ownerComment
        status
        createdAt
      }
    }
  }
`;
