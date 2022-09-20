import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import firebaseTestHelpers from '../../../tests/helpers/firebase-test-helpers'
import { makeExpressApp } from '../config/app'
import request from 'supertest'
describe('Players Routes', () => {
  beforeAll(async () => {
    await firebaseTestHelpers.connect()
    await firebaseTestHelpers.testEnvironment.clearDatabase()
  })

  beforeEach(async () => {
    await firebaseTestHelpers.testEnvironment.clearDatabase()
  })

  afterAll(async () => {
    await firebaseTestHelpers.testEnvironment.clearDatabase()
    await firebaseTestHelpers.reset()
  })

  describe('GET /players/score', () => {
    test('should return 200 on success', async () => {
      const expectedPlayerScore = {
        playerName: 'any_name',
        score: 100,
      }
      await firebaseTestHelpers.insertDataWithRef(
        `ranking/${expectedPlayerScore.playerName}`,
        expectedPlayerScore.score
      )
      const res = await request(makeExpressApp())
        .get('/players/score')
        .expect(200)

      expect(res.body).toEqual([expectedPlayerScore])
    })
  })

  describe('GET /players/:playerName/score', () => {
    test('should return 200 on success', async () => {
      const expectedPlayerScore = {
        playerName: 'any_name',
        score: 100,
      }

      await firebaseTestHelpers.insertDataWithRef(
        `ranking/${expectedPlayerScore.playerName}`,
        expectedPlayerScore.score
      )

      await firebaseTestHelpers.insertDataWithRef(`ranking/any_other_name`, 500)
      
      const res = await request(makeExpressApp())
        .get(`/players/${expectedPlayerScore.playerName}/score`)
        .expect(200)

      expect(res.body).toEqual([expectedPlayerScore])
    })
  })
})
