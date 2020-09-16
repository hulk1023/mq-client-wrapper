import { testRunner as consumerTester } from './pubsub/test.consumer';
import { testRunner as producerTester } from './pubsub/test.producer';


producerTester();
consumerTester();