const Joi = require("joi");
const validateUser = require("../../util/validateUser");

const argsSchema = Joi.object({
  id: Joi.number(),
});

const restaurant = async (root, args, { models, user }) => {
  Joi.assert(args, argsSchema);
  validateUser(user);
  const { id } = args;
  const restaurant = await models.Restaurant.findOne({
    where: {
      id: id,
    },
  });
  return restaurant;
};

module.exports = restaurant;
