import { test, describe, expect, vi } from 'vitest'
import GetPlayersScore from '.'
import { InjectionError } from '../../../utils/errors'

describe('GetPlayerScore UseCase', () => {
  function makeGetPlayersScoreRepositorySpy() {
    class GetPlayersScoreRepositorySpy {
      constructor() {
        this.params = null
        this.getPlayersScoreResult = [
          {
            playerName: 'player1',
            score: 10,
          },
        ]
      }
      getPlayersScore(params) {
        this.params = params
        return Promise.resolve(this.getPlayersScoreResult)
      }
    }
    return new GetPlayersScoreRepositorySpy()
  }
  function makeSut() {
    const getPlayersScoreRepositorySpy = makeGetPlayersScoreRepositorySpy()
    const sut = new GetPlayersScore({
      getPlayersScoreRepository: getPlayersScoreRepositorySpy,
    })

    return {
      sut,
      getPlayersScoreRepositorySpy,
    }
  }

  describe('constructor()', () => {
    test('should throw if GetPlayersScoreRepository dependency was not provided', () => {
      expect(() => new GetPlayersScore({})).toThrow(
        new InjectionError('should inject GetPlayersScoreRepository dependency')
      )
    })

    test(
      'should throw if GetPlayersScoreRepository dependency provided' +
        'but does not have the getPlayersScore method',
      () => {
        expect(
          () =>
            new GetPlayersScore({
              getPlayersScoreRepository: {},
            })
        ).toThrow(
          new InjectionError(
            'dependency GetPlayersScoreRepository should have getPlayersScore method'
          )
        )
      }
    )
  })

  describe('getPlayersScore()', () => {
    test('should call getPlayersScoreRepository with correct values', async () => {
      const { getPlayersScoreRepositorySpy, sut } = makeSut()
      await sut.getPlayersScore({
        playerName: 'any_player',
      })

      expect(getPlayersScoreRepositorySpy.params).toEqual({
        playerName: 'any_player',
      })
    })

    test('should return getPlayersScoreRepository result', async () => {
      const { getPlayersScoreRepositorySpy, sut } = makeSut()
      const result = await sut.getPlayersScore()

      expect(result).toEqual(getPlayersScoreRepositorySpy.getPlayersScoreResult)
    })

    test('should throw if getPlayersScoreRepository throws', async () => {
      const { getPlayersScoreRepositorySpy, sut } = makeSut()
      const mockedError = new Error('any_error')
      vi
        .spyOn(getPlayersScoreRepositorySpy, 'getPlayersScore')
        .mockRejectedValueOnce(mockedError)
      const promise = sut.getPlayersScore()
      await expect(promise).rejects.toThrow(mockedError)
    })
  })
})
