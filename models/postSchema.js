const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	roomNumber: {
		type: String,
		required: true
	},
	bacenter: {
		type: String,
		required: true
	},
	imgUrl: {
		type: String,
		required: true
	},
	imgPublicId: {
		type: String,
		required: true
	},
	imgAssetId: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('post', postSchema);
