/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { Product } from './product.interface'
import { ProductServices } from './product.service'
import ProductValidationSchema from './student.zod.validation'
// import { z } from "zod";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body
    const zodparseData = ProductValidationSchema.parse(product)
    const result = await ProductServices.createProductDB(zodparseData)

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm: string | undefined = req.query.searchTerm as
      | string
      | undefined
    const result = await ProductServices.getAllProductFromDB(searchTerm)

    if (result.length === 0) {
      const error = {
        success: false,
        message: `No products found matching the search term '${searchTerm}'`,
      }
      throw error
    }

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : `Products fetched successfully!`,
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const result = await ProductServices.getSingleProductFromDB(productId)

    res.status(200).json({
      success: true,
      message: 'Product is retrieved succesfully',
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}
const searchProductFromId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.searchProductFromIdDB(productId)

    res.status(200).json({
      success: true,
      message: "Products matching search term 'iphone' fetched successfully!",
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

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProductFromId,
  deleteProductFromId,
  searchProductFromId,
}
