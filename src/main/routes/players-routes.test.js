import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest'
import firebaseTestHelpers from '../../../tests/helpers/firebase-test-helpers'
import { makeExpressApp } from '../config/app'
import request from 'supertest'
describe('Players Routes', () => {
  beforeAll(async () => {
    await firebaseTestHelpers.connect()
  })

  beforeEach(async () => {
    await firebaseTestHelpers.testEnvironment.clearDatabase()
  })

  afterAll(async () => {
    await firebaseTestHelpers.reset()
  })

  describe('GET /players/score', () => {
    test('should return 200 on success', async () => {
     await request(makeExpressApp())
     .get('/players/score')
      .expect(200)
    })
  })
})
