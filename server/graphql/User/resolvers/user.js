const validateUser = require("../../util/validateUser");

const user = async (root, args, { models, user }) => {
  const { userId } = validateUser(user);

  const userObject = await models.User.findOne({
    where: {
      id: userId,
    },
  });

  if (!userObject) {
    throw new Error("Unable to find user");
  }
  return userObject;
};

module.exports = user;
