import { GetPlayersScore } from '../../../domain/usecases'
import { GetPlayersScoreFirebaseRepository } from '../../../infra/repositories'
import { database } from '../../../infra/helpers/firebase-helper'

export function makeGetPlayersScoreUseCase() {
  const getPlayersScoreFirebaseRepository =
    new GetPlayersScoreFirebaseRepository({
      firebaseDatabase: database,
    })

  return new GetPlayersScore({
    getPlayersScoreRepository: getPlayersScoreFirebaseRepository,
  })
}
