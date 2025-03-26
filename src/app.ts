import express, { Application, Request, Response } from 'express'
const app:Application = express()
import cors from 'cors'
import { stationaryRoutes } from './app/AllModules/stationaryProduct/stationaryProduct.route'
import { OrderRoute } from './app/AllModules/Order/Order.route'
import { UserRoutes } from './app/AllModules/Users/user.route'
import notFound from './app/middleware/notFound'
import globalErrorHandler from './app/middleware/globalErrorHandler'
//parsers
app.use(express.json())
app.use(cors())

//application routes
app.use("/api",stationaryRoutes)
app.use("/api",OrderRoute)
app.use("/user",UserRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler as express.ErrorRequestHandler)

//not found
app.use(notFound)

//console.log(process.cwd()) // current working directory
export default app
