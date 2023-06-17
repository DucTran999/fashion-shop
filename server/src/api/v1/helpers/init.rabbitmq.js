import amqplib from "amqplib";
import * as dotenv from "dotenv";

dotenv.config();

const amqp_url_cloud = process.env.RABBIT_MQ_URL;

const sendQueue = async ({ msg }) => {
  try {
    const conn = await amqplib.connect(amqplib);
    const channel = await conn.createChannel();
    const queue = "orders";

    await channel.assertQueue(queue, {
      durable: false,
    });

    // send to queue
    channel.sendToQueue(queue, Buffer.from({ msg }));
  } catch (error) {
    console.log("Error", error.message);
  }
};
