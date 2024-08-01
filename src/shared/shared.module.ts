import { Global, Module, type Provider } from '@nestjs/common';

import { ApiConfigService } from './services/api-config.service';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';

const providers: Provider[] = [
  ApiConfigService,
  ValidatorService,
  GeneratorService,
];

const imports = [];
const moduleExports = [...providers];

@Global()
@Module({
  providers,
  imports,
  exports: moduleExports,
})
export class SharedModule {}
