import { Controller, Get } from '@nestjs/common';
import { GetAppStatusUseCase } from 'src/app/application/get-app-status.use-case';

@Controller()
export class AppController {
  constructor(private readonly getAppStatusUseCase: GetAppStatusUseCase) {}

  @Get()
  getRoot(): string {
    return this.getAppStatusUseCase.execute();
  }
}
