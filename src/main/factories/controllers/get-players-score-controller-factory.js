import { GetPlayersScoreController } from '../../../presentation/controllers'
import { makeGetPlayersScoreUseCase } from '../usecases/get-players-score-use-case-factory'
export function makeGetPlayersScoreController() {
  return new GetPlayersScoreController({
    getPlayersScoreUseCase: makeGetPlayersScoreUseCase(),
  })
}
