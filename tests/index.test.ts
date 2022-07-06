import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import fastify, {FastifyInstance} from 'fastify'
import anyTest, {TestFn} from 'ava'
import fastifyAutoload from '@fastify/autoload'
import {diContainer, fastifyAwilixPlugin} from '@fastify/awilix/lib/classic/index.js'
import {instance, mock, when} from 'strong-mock'
import {asValue} from 'awilix'
import {MyService} from '../src/my-service.js'

const test = anyTest as TestFn<FastifyInstance>

const myMockService = mock<MyService>()

test.beforeEach(async t => {
	const app = fastify()

	diContainer.register({
		myService: asValue(instance(myMockService)),
	})

	await app.register(fastifyAwilixPlugin, {
		disposeOnClose: true,
		disposeOnResponse: false,
	})

	await app.register(fastifyAutoload, {
		dir: join(dirname(fileURLToPath(import.meta.url)), '../src/routes'),
		forceESM: true,
	})

	t.context = app
})

test.afterEach(async t => {
	await t.context.close()
})

test('foo test', async t => {
	when(myMockService.printDateTime()).thenReturn('bla')

	const response = await t.context.inject({
		method: 'get',
		url: '/test',
	})

	t.is(response.statusCode, 200)
})

test('bar', async t => {
	when(myMockService.printDateTime()).thenReturn('test')

	const response = await t.context.inject({
		method: 'get',
		url: '/test',
	})

	t.is(response.body, 'test')
})
