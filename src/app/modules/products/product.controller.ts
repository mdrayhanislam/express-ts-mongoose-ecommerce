import { Request, Response } from 'express'
import { Product } from './product.interface'
import { ProductServices } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body

    const result = await ProductServices.createProductDB(product)

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: product,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const ProductControllers = {
  createProduct,
}
