import { Product } from '../products/product.interface'
import { ProductModel } from '../products/product.model'
import { Order } from './order.interface'
import { OrderModel } from './order.model'

const createOrderService = async (order: Order) => {
  // Checking existence of product
  const product: Product | null = await ProductModel.findById(order.productId)
  if (!product) {
    const error = {
      success: false,
      message: 'Product not found',
    }
    throw error
  }

  // Checking Quantity Availability
  if (
    product.inventory.quantity <= 0 ||
    !product.inventory.inStock ||
    order.quantity > product.inventory.quantity
  ) {
    const error = {
      success: false,
      message: 'Insufficient quantity available in inventory',
    }
    throw error
  }

  // Update product quantity and set inStock to false if quantity becomes 0
  const updatedProduct: Product | null = await ProductModel.findOneAndUpdate(
    { _id: order.productId, 'inventory.quantity': { $gt: 0 } },
    {
      $inc: { 'inventory.quantity': -order.quantity },
      'inventory.inStock': true,
    },
    { new: true },
  )

  // Check if the product's quantity became 0 after the update
  if (updatedProduct?.inventory?.quantity === 0) {
    await ProductModel.updateOne(
      { _id: order.productId },
      { 'inventory.inStock': false },
    )
  }

  // Create order
  const result = await OrderModel.create(order)
  return result
}

const getAllOrderFromDB = async (email: string | undefined) => {
  if (email) {
    return await OrderModel.find({ email: email })
  } else {
    const result = await OrderModel.find()
    return result
  }
}

export const OrderServices = {
  createOrderService,
  getAllOrderFromDB,
}
