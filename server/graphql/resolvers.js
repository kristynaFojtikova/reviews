const { merge } = require('lodash');

const {
    resolvers: userResolvers,
} = require('./User');

const {
    resolvers: restaurantResolvers,
} = require('./Restaurant');

const {
    resolvers: reviewResolvers,
} = require('./Review');

const pingResolver = {
    Query: {
        ping: () => "Ping!"
    },
    Mutation: {
        ping: () => "Ping!"
    },
};

const resolvers = merge(
    pingResolver,
    userResolvers,
    restaurantResolvers,
    reviewResolvers
)

module.exports = resolvers