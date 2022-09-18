import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeGetPlayersScoreController } from '../factories/controllers/get-players-score-controller-factory'

export function setupPlayersRoutes (router) {
  router.get('/players/score', adaptRoute(makeGetPlayersScoreController()))
}