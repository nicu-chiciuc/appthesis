import {MongoClient, ObjectId} from 'mongodb'
import assert from 'assert'

var url = 'mongodb://localhost:27017/thesisdb'

MongoClient.connect(url, (err, db) => {
	console.log(err)

	db.collection('institutions').findOne({id: "1811"})
		.then((err, values) => {
			console.log(err, values)

			db.close()
		})
})


