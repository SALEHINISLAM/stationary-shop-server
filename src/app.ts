import express, { Application, Request, Response } from 'express'
const app:Application = express()
import cors from 'cors'
import { stationaryRoutes } from './app/AllModules/stationaryProduct/stationaryProduct.route'
import { OrderRoute } from './app/AllModules/Order/Order.route'
//parsers
app.use(express.json())
app.use(cors())

//application routes
app.use("/api",stationaryRoutes)
app.use("/api",OrderRoute)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

//console.log(process.cwd()) // current working directory
export default app
