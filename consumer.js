const { Kafka } = require("kafkajs");

run();
async function run() {
  try {
    const kafka = new Kafka({
      client: "myapp",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({groupId:"test"});
    console.log("connecting........");
    await consumer.connect();
    console.log("connected");

    await consumer.subscribe({topic:"Users",fromBeginning:true})

    await consumer.run({
        eachMessage:async result=>{
            console.log(`Receives message ${result.message.value} on ${result.partition}`);
        }
    })
    

  } catch (error) {
    console.error(`something bad happened ${error}`);
  } 
}
