import { InjectionError } from '../../../utils/errors';
import { ok, serverError } from '../../helpers/http-response';

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
   try {
    const { params } = httpRequest;

    const playersScore = await this.#getPlayersScoreUseCase.getPlayersScore(params);

    return ok(playersScore);
   } catch (error) {
    return serverError(error)
   }
  }
}