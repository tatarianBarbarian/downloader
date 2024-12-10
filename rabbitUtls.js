import amqp from "amqplib";
import { config } from "./config";

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(config.rabbitMqConnString);
    const channel = await connection.createChannel();
    await channel.assertQueue(config.queueName, { durable: false });
    console.log("RabbitMQ connected and channel created.");

    return channel;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    process.exit(1); // Exit if RabbitMQ connection fails
  }
};
