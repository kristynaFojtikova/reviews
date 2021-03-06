const bcrypt = require("bcryptjs");
const Joi = require("joi");
const validateUser = require("../../util/validateUser");

const initiateSession = require("./initiateSession");

const argsSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const logout = async (root, args, { models, user }) => {
  Joi.assert(args, argsSchema);
  const { refreshToken } = args;

  const { role, userId } = validateUser(user);

  const refreshTokenInstance = await models.RefreshToken.findOne({
    where: {
      userId: userId,
      token: refreshToken,
    },
  });
  if (refreshTokenInstance) {
    await refreshTokenInstance.destroy();
  }
  return true;
};

module.exports = logout;
