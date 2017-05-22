var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
import axios from 'axios'
import bbird from 'bluebird'
// var ObjectId = require('mongodb').ObjectID

// const amenities = require('./amenities.js')
const institutions = require('./institutions.js')

var url = 'mongodb://localhost:27017/thesisdb'

const c = console
const baseUrl = 'http://afla.md/ws'


/*
 * promiseSerial resolves Promises sequentially.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * const funcs = urls.map(url => () => $.ajax(url))
 *
 * promiseSerial(funcs)
 *   .then(console.log)
 *   .catch(console.error)
 */
const promiseSerial = funcs =>
  funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))),
Promise.resolve([]))


function getInstitutionUrl (id) {
	return baseUrl + '/institutiondetails/' + id + '/amenities'
}


function getInstitutionDetail (id) {
	return axios.get(getInstitutionUrl(id))
		.then(res => {
			c.log(res)
		})
		.catch(err => {
			c.log('couldnt retrieve', err)
		})
}

async function getAllInstitutionDetails (ids) {
	let data = []

	// ids = ids.slice(0, 4)

	c.log(ids)

	for (const id of ids) {
		try {
			const url = getInstitutionUrl(id)
			c.log(url)
			let detail = await axios.get(url)
				.then(resp => resp.data)

			detail.id = id

			data.push(detail)


			c.log('good: ', id)
		}
		catch (err) {
			c.log('didn\' retrieve ', id)
		}
	}

	return data

}


function insertAll (db, datas) {
	db.collection('institutiondetails').insertMany(datas, (err, r) => {
		assert.equal(err, null)

		console.log('inserted count: ', r.insertedCount)

		db.close()
	})
}

MongoClient.connect(url, (err, db) => {

	db.collection('institutions').find({}, {id: true, _id: false}).toArray((err, results) => {
		const bResults = results.map(elem => elem.id)

		getAllInstitutionDetails(bResults)
			.then(datas => insertAll(db, datas))

	})
})