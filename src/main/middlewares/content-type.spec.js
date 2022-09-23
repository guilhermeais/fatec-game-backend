import request from 'supertest'
import {makeExpressApp} from '../config/app'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    const app = makeExpressApp()
    app.get('/test_content_type', (req, res) => {
      return res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .expect('Content-Type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    const app = makeExpressApp()
   
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('Content-Type', /xml/)
  })
})
