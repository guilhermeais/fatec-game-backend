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

  async handle(request) {
   try {
    const { playerName } = request;

    const playersScore = await this.#getPlayersScoreUseCase.getPlayersScore({
      playerName
    });

    return ok(playersScore);
   } catch (error) {
    return serverError(error)
   }
  }
}