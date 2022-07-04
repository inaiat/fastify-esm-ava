import { FastifyPluginAsync, FastifyPluginCallback } from "fastify";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fastifyAutoload from '@fastify/autoload'
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix/lib/classic/index.js'
import { MyService } from "./MyService.js";
import { asClass } from "awilix";

declare module '@fastify/awilix' {
    interface Cradle {
        myService: MyService
    }
}

export const awilixPlugin: FastifyPluginCallback = (
    fastifyInstance,
    options,
    done
) => {
    fastifyInstance.register(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: false,
    });

    void diContainer.register({
        myService: asClass(MyService).singleton(),
    })


    done()

};
