
const createReview = require('./createReview');
const deleteReview = require('./deleteReview');
const approveReview = require('./approveReview');
const reviews = require('./reviews');

const resolvers = {
    Query: {
        reviews: reviews
    },
    Mutation: {
        createReview,
        approveReview,
        deleteReview
    }
};

module.exports = resolvers