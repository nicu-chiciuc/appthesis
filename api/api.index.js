import express from 'express'
import {MongoClient, ObjectId} from 'mongodb'
import assert from 'assert'
import axios from 'axios'

import R from 'ramda'

import config from '../config'

const router = express.Router()

const c = console
const baseUrl = 'http://afla.md/ws'

const tests = {
	1: {
		'indicator': {
			'name': 'Criminalitatea intre animale de casă per raion'
		},
		'years': {
			'2014': {
				'Chisinau' : 1000,
				'Balti' : 1400,
				'Cahul' : 800
			},

			'2015': {
				'Chisinau' : 1000,
				'Balti' : 1400,
				'Cahul' : 800
			},

			'2016': {
				'Chisinau' : 1000,
				'Balti' : 1400,
				'Cahul' : 800
			},

			'2017': {
				'Chisinau' : 1000,
				'Balti' : 1400,
				'Cahul' : 800
			}
		}
	},

	2: {
		'indicator': {
			'name': 'Numărul total de animale'
		},
		'years': {
			'2014': {
				'Chisinau' : 21813,
				'Balti' : 20330,
				'Cahul' : 56313
			},

			'2015': {
				'Chisinau' : 20101,
				'Balti' : 37674,
				'Cahul' : 15532
			},

			'2016': {
				'Chisinau' : 30199,
				'Balti' : 33819,
				'Cahul' : 27880
			},

			'2017': {
				'Chisinau' : 13864,
				'Balti' : 59490,
				'Cahul' : 20465
			}
		}
	}, 

	3: {
		'indicator': {
			'name': 'Numărul total de animale'
		},
		'years': {
			'2014': {
				'Chisinau' : '14',
				'Balti' : '23',
				'Cahul' : '19'
			},

			'2015': {
				'Chisinau' : '77',
				'Balti' : '54',
				'Cahul' : '57'
			},

			'2016': {
				'Chisinau' : '63',
				'Balti' : '18',
				'Cahul' : '16'
			},

			'2017': {
				'Chisinau' : '63',
				'Balti' : '68',
				'Cahul' : '30'
			}
		}
	},

	4: {
		'indicator': {
			'name': 'Numărul total de animale'
		},
		'years': {
			'2014': {
				'Chisinau' : '87',
				'Balti' : '56',
				'Cahul' : '114'
			},

			'2015': {
				'Chisinau' : '104',
				'Balti' : '145',
				'Cahul' : '140'
			},

			'2016': {
				'Chisinau' : '79',
				'Balti' : '65',
				'Cahul' : '99'
			},

			'2017': {
				'Chisinau' : '136',
				'Balti' : '53',
				'Cahul' : '77'
			}
		}
	},

	5 : {
		'indicator': {
			'name': 'Coloarea predominantă'
		},
		'years': {
			'2014': {	
				'Chisinau' : '#9d45ee',
				'Balti' : '#2eb251',
				'Cahul' : '#f31a26'
			},

			'2015': {
				'Chisinau' : '#c033c8',
				'Balti' : '#caf0f2',
				'Cahul' : '#b37d5c'
			},

			'2016': {
				'Chisinau' : '#0d27c6',
				'Balti' : '#66b872',
				'Cahul' : '#b5ec79'
			},

			'2017': {
				'Chisinau' : '#85f9aa',
				'Balti' : '#abae09',
				'Cahul' : '#082700'
			}
		}
	}
}

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

router.get('/something/:testId', (req, res) => {
	c.log(req.params)
	c.log(tests[req.params])
	res.send(tests[req.params.testId])
})

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
					.filter(f => f.amenity_id == amenityid)

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