const Joi = require("joi");
const _ = require("lodash");

const validateUser = require("../../util/validateUser");
const imageUrl = "https://picsum.photos/200";

const argsSchema = Joi.object({
  name: Joi.string().required(),
  description: [Joi.string().optional(), Joi.allow(null)],
});

const createRestaurant = async (root, { input }, { models, user }) => {
  Joi.assert(input, argsSchema);

  const { role, userId } = validateUser(user, /OWNER|ADMIN/g);

  const { name, description } = input;
  const imageUrls = [];
  _.times(Math.floor(Math.random() * 10), () => {
    imageUrls.push(imageUrl);
  });

  const restaurant = await models.Restaurant.create({
    name,
    description,
    ownerId: userId,
    imageUrls,
  });

  return restaurant;
};

module.exports = createRestaurant;
