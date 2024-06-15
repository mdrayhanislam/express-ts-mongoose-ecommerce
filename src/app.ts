import express, { Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/products/product.route'
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/products', ProductRoutes)

app.get('/', (req: Request, res: Response) => {
  const a = 'Hello World'
  res.send(a)
})

export default app
