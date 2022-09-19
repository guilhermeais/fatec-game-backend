import { makeExpressApp } from './config/app'
import { env } from './config/env'

const app = makeExpressApp()
app.listen(env.port, () =>
  console.log(`Server running at http://localhost:${env.port}`)
)
