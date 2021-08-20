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

  const review = await models.Review.findOne({
    where: {
      id,
    },
  });

  if (!review) {
    throw new Error("Unable to find this review");
  }

  if (role === "OWNER") {
    const restaurant = await models.Restaurant.findOne({
      where: {
        id: review.restaurantId,
      },
    });

    if (!restaurant || restaurant.ownerId !== userId) {
      throw new ForbiddenError();
    }
  }

  await review.destroy();
  return review;
};

module.exports = deleteRestaurant;
