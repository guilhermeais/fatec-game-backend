import { afterAll, beforeEach, describe, expect, test } from 'vitest'
import { GetPlayersScoreFirebaseRepository } from '.'
import firebaseTestHelpers from '../../../../../tests/helpers/firebase-test-helpers'

async function makePlayerScore({ playerName = 'guilherme', score = 100 } = {}) {
  const result = await firebaseTestHelpers.insertDataWithRef(
    `ranking/${playerName}`,
    score
  )

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
    await firebaseTestHelpers.testEnvironment.clearDatabase({ projectId })
  })

  afterAll(async () => {
    await firebaseTestHelpers.reset()
  })
  describe('getPlayersScore()', () => {
    test('should return all the players scores', async () => {
      const expectedPlayer = {
        playerName: 'guilherme',
        score: 100,
      }
      await makePlayerScore(expectedPlayer)

      const { sut } = makeSut(database)

      const players = await sut.getPlayersScore()
      expect(players).toEqual([expectedPlayer])
    })

    test('should return only the player with the playerName if playerName is provided', async () => {
      const expectedPlayer = {
        playerName: 'MarcioProfDSM',
        score: 500,
      }

      await makePlayerScore(expectedPlayer)

      await makePlayerScore({
        playerName: 'joão',
        score: 500,
      })

      await makePlayerScore({
        playerName: 'Pedro',
        score: 50010,
      })
      const { sut } = makeSut(database)

      const player = await sut.getPlayersScore({
        playerName: expectedPlayer.playerName,
      })
      expect(player).toEqual([expectedPlayer])
    })

    test('should throw if firebaseDatabase throws', async () => {
      const mockedError = new Error('firebaseDatabase error')
      const { sut } = makeSut({
        ref: () => {
          throw mockedError
        },
      })

      const promise = sut.getPlayersScore()
      await expect(promise).rejects.toThrow(mockedError)
    })
  })

  describe('onPlayerScoreValue()', () => {
    test('should return empty array if playerData empty', () => {
      const { sut } = makeSut(database)
      const player = sut.onPlayerScoreValue({
        playerName: 'guilherme',
        player: {
          val: () => null,
        },
      })
      expect(player).toEqual([])
    })

    test('should return the playerName and the score on success', () => {
      const { sut } = makeSut(database)
      const player = sut.onPlayerScoreValue({
        playerName: 'guilherme',
        player: {
          val: () => 200,
        },
      })
      expect(player).toEqual([
        {
          playerName: 'guilherme',
          score: 200,
        },
      ])
    })

    test('should return the playerName and the score on success', () => {
      const { sut } = makeSut(database)
      const player = sut.onPlayerScoreValue({
        player: {
          val: () => {
            return {
              guilherme: 200,
              joao: 300,
            }
          },
        },
      })
      expect(player).toEqual([
        {
          playerName: 'guilherme',
          score: 200,
        },
        {
          playerName: 'joao',
          score: 300,
        },
      ])
    })
  })
})
