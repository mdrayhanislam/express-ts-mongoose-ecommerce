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
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB()

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const result = await ProductServices.getSingleProductFromDB(productId)

    res.status(200).json({
      success: true,
      message: 'Product is retrieved succesfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const updateProductFromId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const product: Product = req.body

    const result = await ProductServices.updateProductFromIdDB(
      productId,
      product,
    )

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteProductFromId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await ProductServices.deleteProductFromIdDB(productId)

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProductFromId,
  deleteProductFromId,
}
