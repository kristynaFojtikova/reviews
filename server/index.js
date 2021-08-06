const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const models = require('./models');
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

require('dotenv').config({ path: __dirname + '/.env' })

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const accessToken = authHeader.split(' ')[1];
            const accessTokenSecret = process.env['ACCESS_TOKEN_SECRET'];
            const user = await jwt.verify(accessToken, accessTokenSecret, (err, user) => {
                return user
            })
            return { user, models };
        }
        return { models };
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});