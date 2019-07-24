import Home from '@/components/home/home'
import ProductList from '@/components/home/ProductList'
import Details from '@/components/home/details'

export default {
  path: '/',
  name: 'Home',
  component: Home,
  children: [
    {
      path: '',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    }
  ]
}
