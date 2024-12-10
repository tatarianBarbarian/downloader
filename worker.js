import { config } from "./config";
import { connectRabbitMQ } from "./rabbitUtls";
import { downloadAndUploadToBlob } from "./blobUtils";

const startWorker = async () => {
  try {
    const channel = await connectRabbitMQ();
    await channel.assertQueue(config.queueName, { durable: false });
    channel.prefetch(1);
    console.log(
      " [*] Waiting for messages in %s. To exit press CTRL+C",
      config.queueName
    );
    await channel.consume(
      config.queueName,
      (msg) => {
        const url = msg.content.toString();

        downloadAndUploadToBlob(url)
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            channel.ack(msg);
          });
      },
      {
        noAck: false,
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

await startWorker();
