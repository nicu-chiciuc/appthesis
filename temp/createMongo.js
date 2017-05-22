import { MongoClient } from 'mongodb'
import assert from 'assert'
import config from '../config'


MongoClient.connect(config.mongodbUri, (err, db) => {
	
})
