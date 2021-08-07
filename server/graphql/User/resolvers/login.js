const bcrypt = require("bcryptjs");
const Joi = require("joi");

const initiateSession = require("./initiateSession");

const argsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const login = async (root, { input }, { models }) => {
  Joi.assert(input, argsSchema);
  const { email, password } = input;

  const user = await models.User.findOne({ where: { email: email } });
  if (!user) {
    return {
      code: "ACCOUNT_DOESNT_EXIST",
      message: "Unable to login, user account doesn't exist.",
    };
  }

  return bcrypt.compare(password, user.password).then(async (valid) => {
    if (!valid) {
      return {
        code: "INVALID_CREDENTIAL",
        message: "Unable to login, make sure to enter valid credentials.",
      };
    }
    const { accessToken, refreshToken } = await initiateSession(user, models);
    return {
      user,
      accessToken,
      refreshToken,
    };
  });
};

module.exports = login;
