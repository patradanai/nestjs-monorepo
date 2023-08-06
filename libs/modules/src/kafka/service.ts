import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { IKafkaService } from './adapter';
import { KAFKA_SERVICE } from './moduleDefine';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class KafkaService
  implements IKafkaService, OnModuleInit, OnApplicationShutdown
{
  constructor(@Inject(KAFKA_SERVICE) private client: ClientKafka) {}

  onModuleInit() {
    this.client.connect();
  }

  onApplicationShutdown(signal?: string) {
    this.client.close();
  }

  send(topic: string, message: string): Observable<any> {
    return this.client.emit(topic, message);
  }
}
