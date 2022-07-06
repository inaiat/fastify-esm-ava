import {exit} from 'node:process'
import fastify from 'fastify'
import {nanoid} from 'nanoid'
import {autoLoader} from './autoloader.js'
import awilixPlugin from './di.config.js'

const fastifyServer = fastify({logger: true})

await fastifyServer.register(awilixPlugin)
await fastifyServer.register(autoLoader)

fastifyServer.get('/', async (request, reply) => {
	console.log(nanoid().toString())
	return {message: 'Hello World!'}
})

const start = async () => {
	try {
		await fastifyServer.listen({port: 3000})
	} catch (error) {
		fastifyServer.log.error(error)
		exit(1)
	}
}

void start()
