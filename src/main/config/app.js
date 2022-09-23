import express from 'express'
import { setupMiddlewares } from './middlewares'
import { setupRoutes } from './routes'

export function makeExpressApp() {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}