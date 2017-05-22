var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
// var ObjectId = require('mongodb').ObjectID

// const amenities = require('./amenities.js')
const institutions = require('./institutions.js')

var url = 'mongodb://localhost:27017/thesisdb'


MongoClient.connect(url, (err, db) => {
	console.log(err)

	// console.log(institutions)

	db.collection('institutions').insertMany(institutions, (err, r) => {
		assert.equal(err, null)
		console.log('inserted count: ', r.insertedCount)

		db.close()
	})


	
})