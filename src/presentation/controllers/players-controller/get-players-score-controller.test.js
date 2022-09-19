import { test, describe, expect, vi } from 'vitest'
import { InjectionError } from '../../../utils/errors'
import { GetPlayersScoreController } from './get-players-score-controller'

describe('GetPlayersScoreController', () => {

  function makeGetPlayersScoreUseCaseSpy() {
    class GetPlayersScoreUseCaseSpy {
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
    return new GetPlayersScoreUseCaseSpy()
  }
  function makeSut() {
    const getPlayersScoreUseCaseSpy = makeGetPlayersScoreUseCaseSpy()
    const sut = new GetPlayersScoreController({
      getPlayersScoreUseCase: getPlayersScoreUseCaseSpy,
    })

    return {
      sut,
      getPlayersScoreUseCaseSpy,
    }
  }

  describe('constructor()', () => {
    test('should throw if GetPlayersScoreUseCase dependency was not provided', () => {
      expect(() => new GetPlayersScoreController({})).toThrow(
        new InjectionError('should inject GetPlayersScoreUseCase dependency')
      )
    })

    test(
      'should throw if getPlayersScoreUseCase dependency provided' +
        'but does not have the GetPlayersScoreUseCase method',
      () => {
        expect(
          () =>
            new GetPlayersScoreController({
              getPlayersScoreUseCase: {},
            })
        ).toThrow(
          new InjectionError(
            'dependency GetPlayersScoreUseCase should have getPlayersScore method'
          )
        )
      }
    )
  })

  describe('handle()', () => {
    test('should call GetPlayersUseCase with correct values', async () => {
      const { sut, getPlayersScoreUseCaseSpy } = makeSut();
      const request = {
          playerName: 'any_player'
      }
      await sut.handle(request);

      expect(getPlayersScoreUseCaseSpy.params).toEqual(request);
    });

    test('should return 200 with the getPlayersScoreUseCase result', async () => {
      const { sut, getPlayersScoreUseCaseSpy } = makeSut();
      const request = {}
      const httpResponse = await sut.handle(request);

      expect(httpResponse).toEqual({
        statusCode: 200,
        body: getPlayersScoreUseCaseSpy.getPlayersScoreResult,
      });
    })

    test('should return 500 if getPlayersScoreUseCase throws', async () => {
      const { sut, getPlayersScoreUseCaseSpy } = makeSut();
      const mockedError = new Error('any_error')
      vi.spyOn(getPlayersScoreUseCaseSpy, 'getPlayersScore').mockRejectedValueOnce(
        mockedError
      );
      const request = {}
      const httpResponse = await sut.handle(request);

      expect(httpResponse).toEqual({
        statusCode: 500,
        body: mockedError,
      });
    })
  })
})
