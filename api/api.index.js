import express from 'express'
import {MongoClient, ObjectId} from 'mongodb'
import assert from 'assert'
import axios from 'axios'

import R from 'ramda'

import config from '../config'

const router = express.Router()

const c = console
const baseUrl = 'http://afla.md/ws'


let mdb

MongoClient.connect(config.mongodbUri, (err, db) => {
	assert.equal(null, err)
	mdb = db

	mdb.collection('institutions').findOne({id: "1811"})
		.then(values => {
			console.log(err, values)
		})
})

function queryStringFromQuery (query) {
	return '?' + Object.keys(query).map(q => `${q}=${query[q]}`).join('&')
}

function getQueryString (req) {
	
	const queryStr = queryStringFromQuery(req.query)

	const getStr = baseUrl + req.path + '/' + queryStr

	return getStr
}

function getInstitutionById (id) {
	return mdb.collection('institutions').findOne({id})
}

function getAmenityById (amenity_id) {
	return mdb.collection('amenities').findOne({amenity_id})
}

function getInstitutionsById (ids) {
	return Promise.all(ids.map(getInstitutionById))
}

router.get('/institutionslist', (req, res) => {
	const getStr = getQueryString(req)

	axios.get(getStr)
		.then(response => {
			const institutions = response.data.institutions
			const institutionsClean = institutions.map(d => ({
				name: d.name_ro,
				id: d.id,
				locality_id: d.locality_id,
				locality_name: d.locality_name_ro,
				region_id: d.region_id,
				region_name: d.region_name_ro,
				keywords: d.keywords,
			}))

			res.send({good: 'yes', data: institutionsClean})
		})
		.catch(error => {
			c.log(error)
			res.send({good: 'no',error})
		})
})

router.get('/institutionsearch/:str', (req, res) => {
	const str = req.params.str

	c.log(str)

	mdb.collection('institutions').find({keywords: new RegExp(str, 'i')}, {limit: 10})
		.toArray((err, docs) => {
			res.send(docs)
		})
})

function cleanFinance (finance) {
	return {
		amenity_id: finance.amenity_id,
		amenity_name: finance.amenity_name_ro,
		value: finance.value,
		year: finance.year,
	}
}

router.get('/institutiondetails/:ids/:amenityid', (req, res) => {
	const ids = req.params.ids.split(',')
	const amenityid = req.params.amenityid

	const promises = ids.map(id => {
		const reqPath = [baseUrl, 'institutiondetails', id, 'amenities'].join('/')
		c.log(reqPath)

		return axios.get(reqPath)
	})

	Promise.all(promises)
		.then(values => {
			const financesClean = values.map(cleanNow)

			function cleanNow (response) {
				const finance = response.data.FINANCE || []
				const financeClean = finance.map(cleanFinance)
					.filter(f => f.amenity_id == amenityid)

				return financeClean
			}

			res.send({good: 'yes', data: financesClean || []})
		})
		.catch(error => {
			c.log(error)
			res.send({good: 'no',error})
		})
})

function transformCurrentAmenityForm (finances, schoolids, amenityid) {
	
	return Promise.all([getAmenityById(amenityid), getInstitutionsById(schoolids)])
		.then(([amenity, schools]) => {


			const years = R.range(2015, 2011).map(year => {
				return 1
			})

			const goodSchools = R.zipObj(schools.map(R.prop('name_ro')), finances)

			// c.log(schools)
			// c.log(goodSchools)

			let retObj = {
				indicator: {
					name: amenity.amenity_name_ro
				},
				years: {

				}
			}

			R.zip(schools, finances). forEach(([school, fin]) => {

				c.log(school.name_ro)

				fin.forEach(ffin => {
					if (!retObj.years[ffin.year])
						retObj.years[ffin.year] = {}

					retObj.years[ffin.year][school.name_ro] = +ffin.value
				})

			})

			console.log(retObj)



			return retObj


	})

}

router.get('/amenity/:amenityid/:schoolids', (req, res) => {

	const schoolids = req.params.schoolids.split(',')
	const amenityid = req.params.amenityid

	// const promises = schoolids.map(id => {
	// 	const reqPath = [baseUrl, 'institutiondetails', id, 'amenities'].join('/')
	// 	c.log(reqPath)

	// 	return axios.get(reqPath)
	// })

	const otherPromises = schoolids.map(id => {

		c.log(id, typeof id)
		return mdb.collection('institutiondetails').findOne({id})
	})

	// Promise.all(otherPromises)
	// 	.then(values => {
	// 		c.log(values)
	// 	})

	Promise.all(otherPromises)
		.then(values => {

			const financesClean = values.map(cleanNow)

			function cleanNow (data) {
				const finance = data.FINANCE || []
				const financeClean = finance.map(cleanFinance)
					.filter(f => f.amenity_id === amenityid)

				return financeClean
			}

			transformCurrentAmenityForm(financesClean, schoolids, amenityid)
				.then(data => {
					res.send(data)
					
				})

		})
		.catch(error => {
			c.log(error)
			res.send({good: 'no',error})
		})
})

router.get('/indicators', (req, res) => {
	mdb.collection('amenities').find({})
		.toArray((err, amenities) => {
			res.send(amenities)
		})
})

// initialization

// if (false)
setTimeout(() => {
	c.log(R.zipObj([1, 4, 2], ['a', 'b', 'c']))

	// getInstitutionById('1811')
	// 	.then(inst => console.log(inst))

	// getInstitutionsById(['1811', '1812'])
	// 	.then(inst => console.log(inst))
}, 500)

export default router