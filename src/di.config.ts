import {FastifyPluginAsync} from 'fastify'
import {asClass} from 'awilix'
import {diContainer, fastifyAwilixPlugin} from '@fastify/awilix/lib/classic/index.js'
import fp from 'fastify-plugin'
import {MyService} from './my-service.js'

declare module '@fastify/awilix' {
	interface Cradle {
		readonly myService: MyService;
	}
}

export default fp<FastifyPluginAsync>(
	async fastify => {
		void diContainer.register({
			myService: asClass(MyService).singleton(),
		})
		void fastify.register(fastifyAwilixPlugin, {
			disposeOnClose: true,
			disposeOnResponse: false,
		})
	})
