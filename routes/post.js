const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary');
const postSchema = require('../models/postSchema');

router.post('/post', async (req, res) => {
	const imgUrl = req.body.data.imgUrl.base64;
	const data = req.body.data;
	const uploadStr = 'data:image/jpeg;base64,' + imgUrl;

	try {
		let imgResponse = await cloudinary.uploader.upload(uploadStr, {
			upload_preset: 'dev_images'
		});
		console.log(imgResponse);
		const allDatat = new postSchema({
			name: data.name,
			phoneNumber: data.phoneNumber,
			location: data.location,
			roomNumber: data.roomNumber,
			bacenter: data.bacenter,
			imgPublicId: imgResponse.public_id,
			imgAssetId: imgResponse.asset_id,
			imgUrl: imgResponse.url
		});

		console.log(allDatat);
		try {
			let allDataResponse = await allDatat.save();
			res.send(allDataResponse);

			console.log(allDataResponse);
		} catch (err) {
			console.log(err);
		}
	} catch (err) {
		console.log(err);
	}
});

router.get('/allpost', async (req, res) => {
	try {
		const allpost = await postSchema.find();
		res.send(allpost);
		console.log(allpost);
	} catch (err) {
		res.send(err);
		console.log(err);
	}
});

router.get('/singlepost/:postid', async (req, res) => {
	try {
		const singleDate = await postSchema.findById(req.params.postid);
		res.send(singleDate);
		console.log(singleDate);
	} catch (err) {
		res.send(err);
		console.log(err);
	}
});

router.delete('/deletepost', async (req, res) => {
	try {
		const deletedPost = await postSchema.deleteOne({ _id: req.query.postid });
		await cloudinary.uploader.destroy(req.query.imgid);
		res.send(deletedPost);
		console.log(deletedPost);
	} catch (err) {
		res.send(err);
		console.log(err);
	}
});

module.exports = router;
