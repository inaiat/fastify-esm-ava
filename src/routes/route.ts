import {FastifyPluginAsync} from 'fastify'

const subRoutes: FastifyPluginAsync = async (app, options) => {
	const myService = app.diContainer.cradle.myService

	app.get(
		'/test',
		async request => myService.printDateTime(),
	)
}

export default subRoutes
