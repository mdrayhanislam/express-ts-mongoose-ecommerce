import express, { Request, Response } from "express";
// const express = require('express')
import cors from "cors";
const app = express();

app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
