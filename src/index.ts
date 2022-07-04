import fastify from "fastify";
import { autoLoader } from "./autoloader.js";
import { awilixPlugin } from "./awilix.js";

export const fastifyServer = fastify({ logger: true });

fastifyServer.register(awilixPlugin);

fastifyServer.register(autoLoader);


fastifyServer.get("/", async (request, reply) => {
  return { message: "Hello World!" };
});

const start = async () => {
  try {
    await fastifyServer.listen({port: 3000});
  } catch (error) {
    fastifyServer.log.error(error);
    process.exit(1);
  }
};

start();
