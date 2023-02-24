import { App } from './app'
import { AuthRoute } from '@/infra/http/routes/auth.route'

const app = new App([new AuthRoute()])

app.listen()
