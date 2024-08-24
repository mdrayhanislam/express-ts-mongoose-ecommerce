import { z } from 'zod'

// Inventory Schema
const InventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be at least 0' })
    .int()
    .nonnegative({ message: 'Quantity must be a non-negative integer' }),
  inStock: z.boolean(),
})

// Variant Schema
const VariantValidationSchema = z.object({
  type: z.string().nonempty({ message: 'Variant type is required' }),
  value: z.string().nonempty({ message: 'Variant value is required' }),
})

// Product Schema
const ProductValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Product name is required' }),
  description: z
    .string()
    .nonempty({ message: 'Product description is required' }),
  price: z.number().min(0, { message: 'Price cannot be negative' }),
  category: z.string().nonempty({ message: 'Product category is required' }),
  tags: z.array(z.string()).min(1, { message: 'At least one tag is required' }),
  variants: z
    .array(VariantValidationSchema)
    .min(1, { message: 'At least one variant is required' }),
  inventory: InventoryValidationSchema,
})

export default ProductValidationSchema
