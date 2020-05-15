const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'b5f320e35907463ab6cbf62df59fc9d4'
});

const handleImageApi = (req,res) =>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => res.json(data))
	.catch(error => console.log('unable to process api call'))
}

const handleImage = (req, res, db) =>{
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(response => {
		res.json(response[0]);
	})
	.catch(error => res.status(400).json('unable to find entries'))
}

module.exports = {
	handleImage: handleImage,
	handleImageApi: handleImageApi
};