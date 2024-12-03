# Create network
`docker network create kafka-net`

# Start Zookeeper with specific settings
`docker run -d --name zookeeper --network kafka-net \
  -p 2181:2181 \
  -e ZOOKEEPER_CLIENT_PORT=2181 \
  -e ZOOKEEPER_TICK_TIME=2000 \
  confluentinc/cp-zookeeper`

# Verify Zookeeper is running and listening
  `docker logs zookeeper`

# start Kafka
  `docker run -d --name kafka --network kafka-net \
  -p 9092:9092 \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka`

# Run Producer
- node producer.js `dataToBeSent`

# Run Consumer
- node consumer.js