const jwt = require('jsonwebtoken');

const initiateSession = async ({ email, role, id }, models) => {
    const accessTokenSecret = process.env['ACCESS_TOKEN_SECRET'];
    const refreshTokenSecret = process.env['REFRESH_TOKEN_SECRET'];
    const accessToken = jwt.sign({ userId: id, role: role }, accessTokenSecret, { expiresIn: '120m' });
    const refreshToken = jwt.sign({ userId: id, role: role }, refreshTokenSecret);
    await models.RefreshToken.create({
        token: refreshToken,
        userId: id
    })
    return {
        accessToken, refreshToken
    }
}

module.exports = initiateSession