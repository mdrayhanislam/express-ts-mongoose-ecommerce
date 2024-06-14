import express, { Request, Response } from 'express'
import cors from 'cors'
const app = express()

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  const a = 'Hello World'
  res.send(a)
})

export default app
