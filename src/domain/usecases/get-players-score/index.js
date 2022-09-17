import { InjectionError } from '../../../utils/errors';
export default class GetPlayersScore {
  #getPlayersScoreRepository = null;
  
  #contructorValidator() {
    if (!this.#getPlayersScoreRepository) {
      throw new InjectionError('should inject GetPlayersScoreRepository dependency');
    }

    if (!this.#getPlayersScoreRepository.getPlayersScore) {
      throw new InjectionError('dependency GetPlayersScoreRepository should have getPlayersScore method');
    }
  }

  constructor({ getPlayersScoreRepository }) {
    this.#getPlayersScoreRepository = getPlayersScoreRepository;

    this.#contructorValidator();
  }

  async getPlayersScore({
    playerName,
  } = {}) {
    const playersScore = await this.#getPlayersScoreRepository.getPlayersScore({
      playerName,
    });

    return playersScore;
  }
}