import { vi } from 'vitest';
import { AppController } from './app.controller';
import { GetAppStatusUseCase } from 'src/app/application/get-app-status.use-case';

describe('AppController', () => {
  it('should delegate getRoot to GetAppStatusUseCase.execute', () => {
    const getAppStatusUseCase = {
      execute: vi.fn().mockReturnValue('Online'),
    } as Pick<GetAppStatusUseCase, 'execute'>;
    const controller = new AppController(
      getAppStatusUseCase as GetAppStatusUseCase,
    );

    expect(controller.getRoot()).toBe('Online');
    expect(getAppStatusUseCase.execute).toHaveBeenCalledTimes(1);
  });
});
