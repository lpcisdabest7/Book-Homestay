import { SetMetadata } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ResponseMessage = (message: string) =>
  SetMetadata('response_message', message);
