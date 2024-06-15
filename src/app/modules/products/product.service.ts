import { Product } from './product.interface'
import { ProductModel } from './product.model'

const createProductDB = async (student: Product) => {
  const result = await ProductModel.create(student)
  return result
}
export const ProductServices = {
  createProductDB,
}
