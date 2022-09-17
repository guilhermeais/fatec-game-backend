import { InjectionError } from '../../../utils/errors';

export class GetPlayersScoreController {
  #getPlayersScoreUseCase = null;

  #constructorValidator() {
    if (!this.#getPlayersScoreUseCase) {
      throw new InjectionError('should inject GetPlayersScoreUseCase dependency');
    }

    if (!this.#getPlayersScoreUseCase.getPlayersScore) {
      throw new InjectionError('dependency GetPlayersScoreUseCase should have getPlayersScore method');
    }
  }
  constructor({ getPlayersScoreUseCase }) {
    this.#getPlayersScoreUseCase = getPlayersScoreUseCase;

    this.#constructorValidator();
  }

  async handle(httpRequest) {
    const { params } = httpRequest;

   await this.#getPlayersScoreUseCase.getPlayersScore(params);
  }
}