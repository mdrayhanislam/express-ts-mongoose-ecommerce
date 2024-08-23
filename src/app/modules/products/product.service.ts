import { Product } from './product.interface'
import { ProductModel } from './product.model'

const createProductDB = async (product: Product) => {
  const result = await ProductModel.create(product)
  return result
}

const getAllProductFromDB = async (searchTerm: string | undefined) => {
  if (searchTerm) {
    const results = await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    })

    return results
  } else {
    const result = await ProductModel.find()
    return result
  }
}

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id })
  return result
}

const updateProductFromIdDB = async (id: string, product: Product) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, product)
  return result
}

const deleteProductFromIdDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id })
  return result
}
const searchProductFromIdDB = async (name: string) => {
  const result = await ProductModel.aggregate([{ $match: { name } }])
  return result
}

export const ProductServices = {
  createProductDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromIdDB,
  deleteProductFromIdDB,
  searchProductFromIdDB,
}
