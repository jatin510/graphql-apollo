const { users, tasks } = require("../constants");
const uuid = require("uuid");
const User = require("../database/models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    users: () => users,

    user: (_, { id }) => users.find((user) => id === user.id),
  },

  User: {
    tasks: ({ id }) => tasks.filter((task) => task.userId === id),
  },

  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });

        if (user) {
          throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);

        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();
        console.log(result);
        return result;
      } catch (err) {
        console.log("error", err);
        throw err;
      }
    },
  },
};
