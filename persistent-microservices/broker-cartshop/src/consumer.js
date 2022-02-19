const amqplib = require('amqplib');
require('dotenv').config();
const logger = require("./logger");
const amqpUrl = process.argv[2] == "docker"? process.env.AMQP_URI_DOCKER :process.env.AMQP_URI;
const queue = "cartshop";

async function ConsumeMenssage(msgjson) {
  logger.info("log", msgjson)
}

(async () => {
  const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  channel.prefetch(10);
  //const queue = 'user.sign_up_email';
  process.once('SIGINT', async () => {
    console.log('closing connection');
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(queue, { durable: true });
  await channel.consume(queue, async (msg) => {
    console.log('Received messages');
    await ConsumeMenssage(JSON.parse(msg.content.toString()));
    await channel.ack(msg);//elimina el mensaje de la cola
  },
    {
      noAck: false,
      consumerTag: 'library_store'
    });
  console.log(" [*] Waiting for messages. To exit press CTRL+C");
})();