import { bodyParser, contentType, cors } from '../middlewares'

export function setupMiddlewares(app) {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}