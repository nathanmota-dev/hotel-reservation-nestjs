import { Module } from '@nestjs/common';
import { GetAppStatusUseCase } from './application/get-app-status.use-case';
import { AppController } from './presentation/http/app.controller';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: GetAppStatusUseCase,
      useValue: new GetAppStatusUseCase(),
    },
  ],
})
export class AppHealthModule {}
