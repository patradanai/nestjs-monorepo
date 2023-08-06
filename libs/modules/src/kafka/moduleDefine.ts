import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IKafkaServiceOptions } from './types';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<IKafkaServiceOptions>().build();

export const KAFKA_SERVICE = "KAFKA_SERVICE"