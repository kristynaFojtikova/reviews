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
        restaurantId
        rating
        userComment
        ownerComment
        status
      }
    }
  }
`;
