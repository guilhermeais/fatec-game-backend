import request from 'supertest'
import { describe, test } from 'vitest'
import {makeExpressApp} from '../config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    const app = makeExpressApp()
    
    app.get('/test_cors', (req, res) => {
      return res.send()
    })

    await request(app)
      .post('/test_cors')
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Allow-Methods', '*')
      .expect('Access-Control-Allow-Headers', '*')
  })
})
