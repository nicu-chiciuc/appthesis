import {MongoClient, ObjectId} from 'mongodb'
import assert from 'assert'

var url = 'mongodb://localhost:27017/thesisdb'

const c = console


function findingValues (err, db) {
	console.log(err)

	db.collection('institutions').findOne({id: '1811'})
		.then((err, values) => {
			console.log(err, values)

			db.close()
		})
}

function regexTest (err, db) {
	db.collection('institutions').find({}, {_id: true, keywords: true})
		.toArray((err, val) => {
			if (err)
				c.log('error: ', err)
			else
				c.log('good', val)

			db.close()
		})
}

MongoClient.connect(url, regexTest)


