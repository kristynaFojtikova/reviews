const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { JoiPasswordComplexity } = require("joi-password");

const initiateSession = require("./initiateSession");

const argsSchema = Joi.object({
  role: Joi.string().valid("OWNER", "CUSTOMER", "ADMIN").required(),
  email: Joi.string().required(),
  password: JoiPasswordComplexity.string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
});

const register = async (root, { input }, { models }) => {
  Joi.assert(input, argsSchema);
  const { email, role, password } = input;
  const existingUser = await models.User.findOne({ where: { email: email } });
  if (existingUser) {
    return {
      code: "USER_ALREADY_EXISTS",
      message: "User account with this email already exists",
    };
  }
  const user = await models.User.create({
    email,
    role,
    password: await bcrypt.hash(password, 10),
  });
  const { accessToken, refreshToken } = await initiateSession(user, models);
  return {
    user,
    accessToken,
    refreshToken,
  };
};

module.exports = register;
