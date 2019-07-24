import Admin from '@/components/admin/admin'
import Products from '@/components/admin/products'
import AddProduct from '@/components/admin/addProduct'
import EditProduct from '@/components/admin/editProduct'
import Users from '@/components/admin/users'

export default {
  path: '/admin',
  component: Admin,
  children: [
    {
      path: 'products',
      name: 'Products',
      component: Products,
      children: []
    },
    {
      path: 'products/add',
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: 'products/edit/:id',
      name: 'EditProduct',
      component: EditProduct
    },
    {
      path: 'users',
      name: 'Users',
      component: Users
    }
  ]
}
