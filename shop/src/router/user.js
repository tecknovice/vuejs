import User from '@/components/user/user'
import Login from '@/components/user/login'
import Register from '@/components/user/register'

export default {
  path: '/user',
  component: User,
  children: [
    {
      path: '',
      name: 'Login',
      component: Login
    },
    {
      path: 'register',
      name: 'Register',
      component: Register
    }
  ]
}
