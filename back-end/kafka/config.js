const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const config = kafka.producer();

const produce = async (topic, messages) => {
    // Producing
    await config.connect();
    await config.send({
        topic,
        messages
    });
};

module.exports = {produce};
