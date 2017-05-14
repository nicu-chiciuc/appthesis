import config from './config'
import express from 'express'

import apiRouter from './api/api.index.js'


const server = express()
const c = console

server.get('/', (req, res) => {
	c.log(req.headers)

	res.render('index')
})

server.set('view engine', 'ejs')
server.set('views', __dirname + '/public');

c.log(__dirname)

server.use('/api', apiRouter)
server.use(express.static('public'))

server.listen(config.port, config.host, () => {
	c.info('Server listening on port ', config.port)
})