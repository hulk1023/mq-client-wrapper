
A convenient mq client wrapper package realizes publish/subscribe messaging model

## Installation

```bash
$ npm install
```

## Recommended MQ runtime
(Confulent Cloud platform)["https://github.com/mongodb/mongo-kafka/tree/master/docker"]
(Run with Docker Compose)

## Running test as demo

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## NestJs Dependency Injection Suppported
```js
class BizModel {
  constructor(@Inject(PuPubSubClientKafkabSub) private mqclient: PubSubClient) {}
```

## License
This is [MIT licensed](LICENSE) project.