import { GetAppStatusUseCase } from './get-app-status.use-case';

describe('GetAppStatusUseCase', () => {
  it('should return the current welcome message', () => {
    const useCase = new GetAppStatusUseCase();

    expect(useCase.execute()).toBe('Online');
  });
});
