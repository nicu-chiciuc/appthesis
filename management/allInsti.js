var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
import axios from 'axios'
import bbird from 'bluebird'
// var ObjectId = require('mongodb').ObjectID
import fs from 'fs'

// const amenities = require('./amenities.js')
const institutions = require('./institutions.js')

var url = 'mongodb://localhost:27017/thesisdb'

const c = console
const baseUrl = 'http://afla.md/ws'


MongoClient.connect(url, (err, db) => {
	db.collection('institutions').find({}, {id: true, _id: false}).toArray((err, res) => {
		const bResults = res.map(elem => elem.id)

		fs.appendFile('log.txt', bResults.join(','), function (err) {
			if (err) {
				c.log('bad')
			} else {
				c.log('good')
			}
		})
	})
})