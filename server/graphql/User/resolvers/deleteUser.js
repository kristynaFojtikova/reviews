const Joi = require('joi');

const validateUser = require('../../util/validateUser');

const argsSchema = Joi.object({
    id: Joi.number()
})

const deleteUser = async (root, args, { models, user }) => {
    Joi.assert(args, argsSchema)

    const { id: paramsUserId } = args

    const { role, userId } = validateUser(user);

    const deleteUserId = user.role.match(/OWNER|CUSTOMER/g) ? userId : paramsUserId

    const userToDelete = await models.User.findOne({
        where: {
            id: deleteUserId
        }
    })

    if (!userToDelete) {
        throw new Error("Unable to find user")
    }
    await userToDelete.destroy()
    return userToDelete;
}

module.exports = deleteUser