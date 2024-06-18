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

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB()

    res.status(200).json({
      success: true,
      message: 'Product are retrieved succesfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const ProductControllers = {
  createProduct,
  getAllProduct,
}
