import { FastifyPluginAsync } from "fastify";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fastifyAutoload from '@fastify/autoload'

export const autoLoader: FastifyPluginAsync = async (
  fastifyInstance,
  options
) => {
  // Loads Routes
  fastifyInstance.register(fastifyAutoload, {
    dir: join(dirname(fileURLToPath(import.meta.url)), "routes"),
    forceESM: true,
    options: { ...options },
  });
};
