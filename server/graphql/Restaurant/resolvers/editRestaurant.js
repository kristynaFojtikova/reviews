const { AuthenticationError, ForbiddenError } = require("apollo-server");
const Joi = require("joi");

const validateUser = require("../../util/validateUser");

const argsSchema = Joi.object({
  name: Joi.string().required(),
  description: [Joi.string().optional(), Joi.allow(null)],
  id: Joi.number(),
});

const editRestaurant = async (root, { input }, { models, user }) => {
  Joi.assert(input, argsSchema);

  const { role, userId } = validateUser(user, /OWNER|ADMIN/g);

  const { name, description, id } = input;

  const restaurant = await models.Restaurant.findOne({
    where: {
      id,
    },
  });

  if (role === "OWNER" && restaurant.ownerId !== userId) {
    throw ForbiddenError;
  }

  if (!restaurant) {
    throw new Error("Unable to find your restaurant");
  }

  restaurant.description = description;
  restaurant.name = name;

  await restaurant.save();

  return restaurant;
};

module.exports = editRestaurant;
