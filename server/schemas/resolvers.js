const { Users  } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args,context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id}).select
                ('-_v-password');
                return userData;
            }
            throw new AuthenticationError('You are not logged in');
        },
        wedding: async(parent, args, context) => {
            if (context.wedding) {
                const weddingData = await wedding.findOne({
                    _id:context.wedding._id
                })
                return weddingData;
            }
        },
    },

    Mutation: {
        addUser: async (parent,args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('You have written incorecct credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
    }

};

module.exports = resolvers;