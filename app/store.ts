import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartStore {
  products: {
    productId: number
    quantity: number
  }[]
  addProduct: (productId: number) => void
  removeProduct: (productId: number) => void
  removeAllProducts: (productId: number) => void
}

export const useCartStore = create<CartStore>(
  persist<CartStore>(
    (set) => ({
      products: [],
      addProduct: (productId: number) => {
        set((state) => {
          const existingProduct = state.products.find(
            (p) => p.productId === productId
          )

          if (existingProduct) {
            return {
              products: state.products.map((product) =>
                product.productId === productId
                  ? { ...product, quantity: product.quantity + 1 }
                  : product
              ),
            }
          } else {
            return {
              products: [...state.products, { productId, quantity: 1 }],
            }
          }
        })
      },
      removeProduct: (productId: number) => {
        set((state) => {
          const existingProduct = state.products.find(
            (p) => p.productId === productId
          )

          if (existingProduct) {
            return {
              products: state.products.map((product) =>
                product.productId === productId
                  ? {
                      ...product,
                      quantity:
                        product.quantity > 1
                          ? product.quantity + 1
                          : product.quantity,
                    }
                  : product
              ),
            }
          } else {
            return {
              products: [...state.products, { productId, quantity: 1 }],
            }
          }
        })
      },
      removeAllProducts: (productId: number) => {
        set((state) => ({
          products: state.products.filter((p) => p.productId !== productId),
        }))
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  ) as StateCreator<CartStore>
)
