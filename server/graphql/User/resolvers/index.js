const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const deleteUser = require("./deleteUser");

const login = require("./login");
const logout = require("./logout");
const refreshToken = require("./refreshToken");
const register = require("./register");
const user = require("./user");
const users = require("./users");

const resolvers = {
  AuthResponse: {
    __resolveType(obj, context, info) {
      if (obj.user) {
        return "AuthSuccess";
      }
      if (obj.code) {
        return "AuthError";
      }
      return null;
    },
  },
  User: {
    __resolveType(obj, context, info) {
      if (obj.role === "OWNER") {
        return "Owner";
      }
      if (obj.role === "CUSTOMER") {
        return "Customer";
      }
      if (obj.role === "ADMIN") {
        return "Admin";
      }
      return null;
    },
  },
  Query: {
    users,
    user,
  },
  Mutation: {
    register,
    login,
    refreshToken,
    deleteUser,
    logout,
  },
};

module.exports = resolvers;
