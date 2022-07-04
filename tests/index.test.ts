import test from 'ava';
import fastify from 'fastify';
// import { autoLoader } from '../src/autoloader.js';
import { fastifyServer } from "../src/index.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fastifyAutoload from '@fastify/autoload'



test('foo', async (t) => {
	// t.teardown(async () => await fastifyServer.close());
	const response = await fastifyServer.inject({
		method: "get",
		url: "/",
	});

	t.deepEqual(response.statusCode, 200);
});

test('bar', async (t) => {
	// t.teardown(async () => await fastifyServer.close());
	const app = fastify()
	app.register(fastifyAutoload, {
		dir: join(dirname(fileURLToPath(import.meta.url)), "../src/routes"),
		forceESM: true,
	  });
  	const response = await app.inject({
		method: "get",
		url: "/test",
	});

	t.deepEqual(response.body, "test");
});

// tap.test("one", async (t) => {
//   t.teardown(async () => await fastifyServer.close());
//   t.test("two", async (t) => {
//     const response = await fastifyServer.inject({
//       method: "get",
//       url: "/",
//     });
//     t.equal(1, 1);
//   });
//   t.test("two", async (t) => {
//     t.equal(1, 1);
//   });
// });
