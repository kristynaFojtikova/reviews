const Joi = require('joi');

const validateUser = require('../../util/validateUser');

const argsSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    id: Joi.number()
})

const editRestaurant = async (root, { input }, { models, user }) => {
    Joi.assert(input, argsSchema)

    const { role, userId } = validateUser(user, /OWNER/g);

    const { name, description, id } = input;

    const restaurant = await models.Restaurant.findOne({
        where: {
            id,
            ownerId: userId
        }
    })

    if (!restaurant) {
        throw new Error("Unable to find your restaurant")
    }

    restaurant.description = description;
    restaurant.name = name;

    await restaurant.save()

    return restaurant;
}

module.exports = editRestaurant