import express from 'express'
import { setupRoutes } from './routes'

export function makeExpressApp() {
  const app = express()
  setupRoutes(app)
  return app
}