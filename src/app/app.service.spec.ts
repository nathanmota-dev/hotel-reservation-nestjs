import { AppService } from './app.service';

describe('AppService', () => {
  it('should return the current welcome message', () => {
    const service = new AppService();

    expect(service.getWelcomeMessage()).toBe('Online');
  });
});
