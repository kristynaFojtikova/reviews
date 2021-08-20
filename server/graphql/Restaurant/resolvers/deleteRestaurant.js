const { ForbiddenError } = require("apollo-server");
const Joi = require("joi");

const validateUser = require("../../util/validateUser");

const argsSchema = Joi.object({
  id: Joi.number(),
});

const deleteRestaurant = async (root, args, { models, user }) => {
  Joi.assert(args, argsSchema);

  const { role, userId } = validateUser(user, /OWNER|ADMIN/g);

  const { id } = args;

  const restaurant = await models.Restaurant.findOne({
    where: {
      id,
    },
  });

  if (role === "OWNER" && !restaurant.userId === userId) {
    throw new ForbiddenError();
  }

  if (!restaurant) {
    throw new Error("Unable to find your restaurant");
  }
  await restaurant.destroy();
  return restaurant;
};

module.exports = deleteRestaurant;
