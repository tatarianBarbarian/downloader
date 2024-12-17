import Fastify from "fastify";
import { config } from "./config.js";
import { connectRabbitMQ } from "./rabbitUtls.js";

let channel;

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.post("/schedule", async function handler(request, reply) {
  const { body } = request;

  if (body.url) {
    channel.sendToQueue(config.queueName, Buffer.from(body.url), {
      persistent: false,
    });
  }

  reply.status(200).send({ success: true });
});

// Healthcheck
fastify.get("/", async (req, reply) => {
  reply.send({ hello: "world" });
});

// Run the server!
try {
  console.log(process.env.PORT);
  const _channel = await connectRabbitMQ();

  channel = _channel;

  await fastify.listen({ host: "0.0.0.0", port: process.env.PORT ?? 8080 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
