const { User, Wedding, Guests  } = require('../models');
const {AuthenticationError} = require ("apollo-server-express")
const { signToken } = require('../utils/auth');


// TODO authentication error requires apollo-server-express

const resolvers = {
    Query: {
        // me: async (parent, args,context) => {
        //     if (context.user) {
        //         const userData = await User.findOne({_id: context.user._id}).select('-_v-password');
        //         return userData;
        //     }
        //     throw new AuthenticationError('You are not logged in');
        // },

        user: async (parent, args)=> {
            return await User.findById(args.userId).populate("guests")
        },

        weddings: async (parent, args, context) => {
            const weddingData = await Wedding.find({})
            console.log("WeddingData :::",weddingData)
            return weddingData
        },
        wedding: async (parent, args, context) => {
            // TODO : add logic here please since we have a 
            return
        },

        // users: async (parent, args ,context) => {
        //     const allUsers = await User.find({})
        //     console.log("All users are =" , allUsers)
        //     return allUsers
        // }


        // might need to use the populate method on top 
        // users: async (parent, args) => {
        //     return User.findById(args.userId)
        // }


    },

    // TODO we need a query to find all guest related to a single wedding 
    // TODO do we need seperate queries/mutations for entering venues and dates etc ?  
    // TODO where are we setting the context for wedding ? do we need all the wedding as contex or just the id 


    Mutation: {
        addUser: async (parent,args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Please enter correct details');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            console.log("token=", token)
            console.log("user=", user)
            return { token, user };
        },
    }

};

module.exports = resolvers;