const { Kafka } = require("kafkajs");

run();
async function run() {
  try {
    const kafka = new Kafka({
      client: "myapp",
      brokers: ["localhost:9092"],
    });

    const admin = kafka.admin();
    console.log("connecting........");
    await admin.connect();
    console.log("connected");
    //A-M , N-Z
    await admin.createTopics({
      topics: [{ topic: "Users", numPartitions: 2 }],
    });
    console.log("connected successfully!");
    await admin.disconnect();
  } catch (error) {
    console.error(`something bad happened ${error}`);
  } finally {
    process.exit(0);
  }
}
