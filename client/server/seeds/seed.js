const db = require("../config/connection")
const {
	User,
	wedding,
	Guests,
	Wedding,
} = require("../models")

const userData = require("./userData.json")
const weddingData = require("./weddingData.json")
const guestsData = require("./guestsData.json")

// db.once('open', async () => {
//     await wedding.deleteMany({});

//     const couples = await wedding.inerstMany(weddingData);
//     console.log('couples seeded!')
//     process.exit(0);
// })

// db.once('open', async () => {
//     await User.deleteMany({});

//     const users = await User.insertMany(userData);
//     console.log('users seeded!')
//     process.exit(0);
// })

db.once("open", async () => {
	try {
		await User.deleteMany({})
		await Wedding.deleteMany({})
		await Guests.deleteMany({});

		await User.create(userData)

		for (let i = 0; i < weddingData.length; i++) {
			const { _id, wedding_owner } = await Wedding.create(
				weddingData[i]
			)
			const user = await User.findOneAndUpdate(
				{ username: wedding_owner },
				{
					$addToSet: {
						wedding: _id,
					},
				}
			)
		}

		for (let j = 0; j < guestsData.length; j++) {
			const { _id, wedding_owner } = await Guests.create(
				guestsData[j]
			)
			const user = await User.findOneAndUpdate(
				{ username: wedding_owner },
				{
					$addToSet: {
						guests: _id,
					},
				}
			)
		}
	} catch (err) {
		console.error(err)
		process.getMaxListeners(1)
	}

	console.log("seedin is done")
	process.exit(0)
})
