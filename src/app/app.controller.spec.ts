import { vi } from 'vitest';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  it('should delegate getRoot to AppService.getWelcomeMessage', () => {
    const appService = {
      getWelcomeMessage: vi.fn().mockReturnValue('Online'),
    } as Pick<AppService, 'getWelcomeMessage'>;
    const controller = new AppController(appService as AppService);

    expect(controller.getRoot()).toBe('Online');
    expect(appService.getWelcomeMessage).toHaveBeenCalledTimes(1);
  });
});
