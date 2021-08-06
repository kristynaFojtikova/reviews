const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const argsSchema = Joi.object({
    refreshToken: Joi.string().required()
})

const refreshToken = async (root, args, { models }) => {
    Joi.assert(args, argsSchema)

    const { refreshToken } = args;
    const refreshTokenSecret = process.env['REFRESH_TOKEN_SECRET'];

    const user = await jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
        return user
    })
    if (!user) {
        throw new AuthenticationError;
    }

    const validRefreshToken = await models.RefreshToken.findOne({
        where: {
            token: refreshToken,
            userId: user.userId
        }
    })
    if (!validRefreshToken) {
        throw new AuthenticationError;
    }

    const userObject = models.User.findOne({
        where: {
            id: user.userId
        }
    })
    const accessTokenSecret = process.env['ACCESS_TOKEN_SECRET'];
    const accessToken = jwt.sign({ userId: user.userId, role: user.role }, accessTokenSecret, { expiresIn: '120m' });
    return {
        accessToken, refreshToken, user: userObject
    }
}

module.exports = refreshToken