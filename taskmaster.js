import Fastify from "fastify";
import { config } from "./config";
import { connectRabbitMQ } from "./rabbitUtls";

let channel;

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/schedule", async function handler(request, reply) {
  const { body } = request;

  if (body.url) {
    channel.sendToQueue(config.queueName, Buffer.from(body.url), {
      persistent: false,
    });
  }

  reply.status(200).send();
});

// Run the server!
try {
  const _channel = await connectRabbitMQ();
  channel = _channel;

  await fastify.listen({ port: 3001 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
