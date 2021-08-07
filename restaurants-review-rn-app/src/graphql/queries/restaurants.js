import gql from 'graphql-tag';

export default gql`
  query restaurants {
    restaurants {
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
      }
    }
  }
`;
