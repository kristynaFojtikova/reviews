const Joi = require('joi');

const validateUser = require('../../util/validateUser');

const argsSchema = Joi.object({
    restaurantId: Joi.number().required(),
    rating: Joi.number().required(),
    userComment: Joi.string(),
})

const createReview = async (root, { input }, { models, user }) => {
    Joi.assert(input, argsSchema)

    const { role, userId } = validateUser(user, /CUSTOMER/g);

    const { restaurantId, rating, userComment } = input;

    const review = await models.Review.create({
        restaurantId,
        rating,
        userComment,
        status: "PENDING",
        reviewerId: userId

    })

    return review;
}

module.exports = createReview