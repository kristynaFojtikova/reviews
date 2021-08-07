const createRestaurant = require("./createRestaurant");
const deleteRestaurant = require("./deleteRestaurant");
const editRestaurant = require("./editRestaurant");
const restaurant = require("./restaurant");
const restaurants = require("./restaurants");

const resolvers = {
  Restaurant: {
    async reviews(restaurant) {
      console.log("rest", restaurant);
      return restaurant.getReviews();
    },
  },
  Query: {
    restaurants,
    restaurant,
  },
  Mutation: {
    createRestaurant,
    editRestaurant,
    deleteRestaurant,
  },
};

module.exports = resolvers;
