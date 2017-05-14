import express from 'express'

import config from '../config'

const router = express.Router()

const c = console

const tests = {
	1 : {
		"indicator": {
			"name": "Criminalitatea intre animale de casă per raion"
		},
		"years": {
			"2014": {
				"Chisinau" : 1000,
				"Balti" : 1400,
				"Cahul" : 800
			},

			"2015": {
				"Chisinau" : 1000,
				"Balti" : 1400,
				"Cahul" : 800
			},

			"2016": {
				"Chisinau" : 1000,
				"Balti" : 1400,
				"Cahul" : 800
			},

			"2017": {
				"Chisinau" : 1000,
				"Balti" : 1400,
				"Cahul" : 800
			}
		}
	},

	2: {
		"indicator": {
			"name": "Numărul total de animale"
		},
		"years": {
			"2014": {
				"Chisinau" : 21813,
				"Balti" : 20330,
				"Cahul" : 56313
			},

			"2015": {
				"Chisinau" : 20101,
				"Balti" : 37674,
				"Cahul" : 15532
			},

			"2016": {
				"Chisinau" : 30199,
				"Balti" : 33819,
				"Cahul" : 27880
			},

			"2017": {
				"Chisinau" : 13864,
				"Balti" : 59490,
				"Cahul" : 20465
			}
		}
	}, 

	3: {
		"indicator": {
			"name": "Numărul total de animale"
		},
		"years": {
			"2014": {
				"Chisinau" : "14",
				"Balti" : "23",
				"Cahul" : "19"
			},

			"2015": {
				"Chisinau" : "77",
				"Balti" : "54",
				"Cahul" : "57"
			},

			"2016": {
				"Chisinau" : "63",
				"Balti" : "18",
				"Cahul" : "16"
			},

			"2017": {
				"Chisinau" : "63",
				"Balti" : "68",
				"Cahul" : "30"
			}
		}
	},

	4: {
		"indicator": {
			"name": "Numărul total de animale"
		},
		"years": {
			"2014": {
				"Chisinau" : "87",
				"Balti" : "56",
				"Cahul" : "114"
			},

			"2015": {
				"Chisinau" : "104",
				"Balti" : "145",
				"Cahul" : "140"
			},

			"2016": {
				"Chisinau" : "79",
				"Balti" : "65",
				"Cahul" : "99"
			},

			"2017": {
				"Chisinau" : "136",
				"Balti" : "53",
				"Cahul" : "77"
			}
		}
	},

	5 : {
		"indicator": {
			"name": "Coloarea predominantă"
		},
		"years": {
			"2014": {
				"Chisinau" : "#9d45ee",
				"Balti" : "#2eb251",
				"Cahul" : "#f31a26"
			},

			"2015": {
				"Chisinau" : "#c033c8",
				"Balti" : "#caf0f2",
				"Cahul" : "#b37d5c"
			},

			"2016": {
				"Chisinau" : "#0d27c6",
				"Balti" : "#66b872",
				"Cahul" : "#b5ec79"
			},

			"2017": {
				"Chisinau" : "#85f9aa",
				"Balti" : "#abae09",
				"Cahul" : "#082700"
			}
		}
	}
}


router.get('/something/:testId', (req, res) => {
	c.log(req.params)
	c.log(tests[req.params])
	res.send(tests[req.params.testId])
})

export default router