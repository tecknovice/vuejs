import Cart from '@/components/cart/cart'
import checkout from '@/components/cart/checkOut'
import index from '@/components/cart/index'

export default {
  path: '/cart',
  name: 'Cart',
  component: index,
  children: [
    {
      path: '',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: checkout
    }
  ]
}
