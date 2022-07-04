import { FastifyPluginAsync } from "fastify";
import { nanoid } from "nanoid";

const subRoutes: FastifyPluginAsync = async (app, options) => {

  const myService = app.diContainer.cradle.myService

  app.get(
    "/test",
    async (request) => {
      console.log("XXXX", myService.printDateTime())
      return myService.printDateTime();
    }
  );
};
export default subRoutes;
