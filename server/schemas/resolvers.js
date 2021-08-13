const { User, Wedding, Guests } = require("../models")
const {
	AuthenticationError,
} = require("apollo-server-express")
const { signToken } = require("../utils/auth")
const { findOne } = require("../models/User")



const resolvers = {
	Query: {
		// me: async (parent, args,context) => {
		//     if (context.user) {
		//         const userData = await User.findOne({_id: context.user._id}).select('-_v-password');
		//         return userData;
		//     }
		//     throw new AuthenticationError('You are not logged in');
		// },

		user: async (parent, args) => {
			return await User.findById(args.userId).populate(
				"guests"
			)
		},

		weddings: async (parent, args, context) => {
			const weddingData = await Wedding.find({})
			console.log("WeddingData :::", weddingData)
			return weddingData
		},
		
		guests: async (parent, args) => {
			const guestList = await Guests.find({})
			console.log("guest list is", guestList)
			return guestList
		},
	},

	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args)
			const token = signToken(user)
			return { token, user }
		},

		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email })

			if (!user) {
				throw new AuthenticationError(
					"Please enter correct details"
				)
			}
			const correctPw = await user.isCorrectPassword(
				password
			)
			if (!correctPw) {
				throw new AuthenticationError(
					"Incorrect credentials"
				)
			}

			const token = signToken(user)
			console.log("token=", token)
			console.log("user=", user)
			return { token, user }
		},

		addGuests: async (parent, args) => {
			const guest = await Guests.create(args)
			return guest
			
		},
		addWedding: async (parent, args) => {
            const wedding = await Wedding.create(args)
            return  wedding 
            
        },

		update_rsvp: async (parent, {email, rsvp})=>{
			const updateGuest= Guests.findOneAndUpdate({email:email},{rsvp:rsvp});
			
			
			return updateGuest
		},

		update_menu: async (parent, {email,menu})=>{
			const hungryGuest= Guests.findOneAndUpdate({email:email},{menu:menu});
			return hungryGuest
		}
	},
}

module.exports = resolvers
