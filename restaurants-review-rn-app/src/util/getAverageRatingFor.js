const getAverageRatingFor = (restaurant) => {
  if (!restaurant) {
    return null;
  }
  const { reviews } = restaurant;
  const approvedReviews = reviews.filter((review) => review.status === 'APPROVED');

  return approvedReviews.length > 0
    ? Math.floor(
        approvedReviews.reduce((total, review) => total + review.rating, 0) / approvedReviews.length
      )
    : null;
};

export default getAverageRatingFor;
