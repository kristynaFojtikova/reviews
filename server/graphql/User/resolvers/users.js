const validateUser = require("../../util/validateUser");

const users = async (root, _, { models, user }) => {
    const { role, userId } = validateUser(user, /ADMIN/g);
    const users = await models.User.findAll();
    return users
}

module.exports = users