const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const config = kafka.producer();
const consumer = kafka.consumer({groupId: 'test-group'});

const produce = async (topic, messages) => {
    // Producing
    await config.connect();
    await config.send({
        topic,
        messages
    });
};

const consume = async (topic, fromBeginning) => {
    // Consuming
    await consumer.connect();
    await consumer.subscribe({topic, fromBeginning});

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    })
};

module.exports = {produce, consume};
