const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { JoiPasswordComplexity } = require("joi-password");
const { AuthenticationError } = require("apollo-server/dist");
const validateUser = require("../../util/validateUser");

const initiateSession = require("./initiateSession");

const argsSchema = Joi.object({
  id: Joi.number().required(),
  role: Joi.string().valid("OWNER", "CUSTOMER", "ADMIN").allow(null),
  email: Joi.string().allow(null),
  password: JoiPasswordComplexity.string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .allow(null),
});

const edit = async (root, { input }, { models, user }) => {
  Joi.assert(input, argsSchema);
  const { userId, role: userRole } = validateUser(user);
  const { email, role, password, id } = input;
  const existingUser = await models.User.findOne({ where: { id } });
  if (!existingUser) {
    throw new Error("Server error, unable to find this user.");
  }

  if (!userRole === "ADMIN" && userId !== id) {
    throw AuthenticationError;
  }
  if (email) {
    existingUser.email = email;
  }
  if (password) {
    existingUser.password = password;
  }
  if (role) {
    existingUser.role = role;
  }

  await existingUser.save();

  return existingUser;
};

module.exports = edit;
