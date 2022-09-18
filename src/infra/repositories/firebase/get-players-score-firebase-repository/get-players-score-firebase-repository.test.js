import { afterAll, beforeEach, describe, expect, test } from 'vitest'
import { GetPlayersScoreFirebaseRepository } from '.'
import firebaseTestHelpers from '../../../../../tests/helpers/firebase-test-helpers'

async function makePlayerScore() {
  const result = await firebaseTestHelpers.insertDataWithRef('ranking', {
    guilherme: 100,
  })

  return Object.entries(result).map(([key, value]) => ({
    playerName: key,
    score: value,
  }))
}

let database
const projectId = 'test-project'
describe('GetPlayersScoreFirebaseRepository', () => {
  function makeSut(firebaseDatabase) {
    const sut = new GetPlayersScoreFirebaseRepository({
      firebaseDatabase,
    })

    return {
      sut,
    }
  }
  beforeEach(async () => {
    await firebaseTestHelpers.connect({ projectId })
    database = firebaseTestHelpers.database
    firebaseTestHelpers.testEnvironment.clearDatabase({projectId})
  })

  afterAll(async () => {
    await firebaseTestHelpers.reset()
  })
  describe('getPlayersScore()', () => {
    test('should return all the players', async () => {
      const playerResult = await makePlayerScore()

      const { sut } = makeSut(database)

      const players = await sut.getPlayersScore()
      expect(players).toEqual(playerResult)
    })
  })
})
