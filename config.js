import { configDotenv } from "dotenv";

configDotenv();

export const config = {
  blobConnString: process.env.BLOB_CONNECTION_STRING,
  containerName: process.env.CONTAINER_NAME,
  rabbitMqConnString: process.env.RABBIT_MQ_CONNECTION_STRING,
  queueName: "task_queue",
};
