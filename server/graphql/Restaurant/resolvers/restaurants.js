const validateUser = require("../../util/validateUser");

const restaurants = async (root, _, { models, user }) => {

    const { role, userId } = validateUser(user);

    if (role === "OWNER") {
        const restaurants = await models.Restaurant.findAll({
            where: {
                ownerId: userId
            }
        });
        return restaurants
    }

    const restaurants = await models.Restaurant.findAll();
    return restaurants
}

module.exports = restaurants