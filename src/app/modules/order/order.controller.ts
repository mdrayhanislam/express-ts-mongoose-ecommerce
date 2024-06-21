import { Request, Response } from 'express'
import { Order } from './order.interface'
import { OrderServices } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body

    const result = await OrderServices.createOrderService(order)

    res.status(200).json({
      success: true,
      message: 'order created successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrderFromDB()

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const OrderControllers = {
  createOrder,
  getAllOrder,
}
