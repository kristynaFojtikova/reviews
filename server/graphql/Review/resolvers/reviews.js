const validateUser = require("../../util/validateUser");

const reviews = async (root, _, { models, user }) => {
    const { role, userId } = validateUser(user, /ADMIN/g);
    const reviews = await models.Review.findAll();
    return reviews
}

module.exports = reviews