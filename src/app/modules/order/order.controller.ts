/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { Order } from './order.interface'
import { OrderServices } from './order.service'
import OrderSchema from './order.zod.validation'

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body
    const zodparseData = OrderSchema.parse(order)
    const result = await OrderServices.createOrderService(zodparseData)

    res.status(200).json({
      success: true,
      message: 'order created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const email: string | undefined = req.query.email as string | undefined
    const result = await OrderServices.getAllOrderFromDB(email)

    if (result.length === 0) {
      const error = {
        success: false,
        message: 'Order not found',
      }
      throw error
    }

    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

export const OrderControllers = {
  createOrder,
  getAllOrder,
}
