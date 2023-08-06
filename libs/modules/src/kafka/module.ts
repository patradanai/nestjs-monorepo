import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IKafkaService } from './adapter';
import { KafkaService } from './service';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
  KAFKA_SERVICE,
} from './moduleDefine';

@Module({})
export class KafkaModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      module: KafkaModule,
      ...super.register(options),
      imports: [
        ...super.register(options).imports,
        ClientsModule.register([
          {
            name: KAFKA_SERVICE,
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: options.brokers,
                clientId: options.clientId,
              },
              consumer: {
                groupId: options.groupId,
              },
            },
          },
        ]),
      ],
      providers: [
        {
          provide: IKafkaService,
          useClass: KafkaService,
        },
        ...super.register(options).providers,
      ],
      exports: [IKafkaService],
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const imports = options.imports || [];
    return {
      // your custom logic here
      ...super.registerAsync(options),
      module: KafkaModule,
      imports: [
        ...imports,
        ClientsModule.registerAsync([
          {
            name: KAFKA_SERVICE,
            useFactory: async () => {
              return {
                transport: Transport.KAFKA,
                options: {
                  client: {
                    brokers: (await options.useFactory()).brokers,
                    clientId: (await options.useFactory()).clientId,
                  },
                  consumer: {
                    groupId: (await options.useFactory()).groupId,
                  },
                },
              };
            },
          },
        ]),
      ],
      providers: [
        {
          provide: IKafkaService,
          useClass: KafkaService,
        },
      ],

      exports: [IKafkaService],
    };
  }
}
