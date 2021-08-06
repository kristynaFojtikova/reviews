const Joi = require('joi');
const { ForbiddenError } = require('apollo-server');

const validateUser = require('../../util/validateUser');

const argsSchema = Joi.object({
    approved: Joi.boolean().required(),
    ownerComment: Joi.string(),
    id: Joi.number()
})

const approveReview = async (root, { input }, { models, user }) => {
    Joi.assert(input, argsSchema)

    const { role, userId } = validateUser(user, /OWNER/g);

    const { approved, ownerComment, id } = input;

    const review = await models.Review.findOne({
        where: {
            id
        }
    })

    if (!review) {
        throw new Error("Unable to find this review")
    }

    const restaurant = await models.Restaurant.findOne({
        where: {
            id: review.restaurantId
        }
    })

    if (!restaurant || restaurant.ownerId !== userId) {
        throw new ForbiddenError;
    }

    review.ownerComment = ownerComment;
    review.status = approved ? "APPROVED" : "DISAPROVED"

    await review.save()

    return review;
}

module.exports = approveReview