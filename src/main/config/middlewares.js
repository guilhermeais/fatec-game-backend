import { bodyParser, cors } from '../middlewares'

export function setupMiddlewares(app) {
  app.use(cors)
  app.use(bodyParser)
}