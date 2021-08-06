
const createRestaurant = require('./createRestaurant');
const deleteRestaurant = require('./deleteRestaurant');
const editRestaurant = require('./editRestaurant');
const restaurants = require('./restaurants');

const resolvers = {
    Restaurant: {
        async reviews(restaurant) {
            console.log("rest", restaurant)
            return restaurant.getReviews();
        },
    },
    Query: {
        restaurants
    },
    Mutation: {
        createRestaurant,
        editRestaurant,
        deleteRestaurant
    }
};

module.exports = resolvers