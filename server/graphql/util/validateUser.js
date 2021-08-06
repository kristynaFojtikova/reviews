const { AuthenticationError, ForbiddenError } = require('apollo-server');

const validateUser = (user, regex) => {
    if (!user) {
        throw new AuthenticationError
    }
    const s = "OWNER|CUSTOMER"


    //  /OWNER|CUSTOMER/g
    if (regex && !user.role.match(regex)) {
        throw new ForbiddenError
    }
    return user;
}

module.exports = validateUser;
