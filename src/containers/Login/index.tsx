import React, { FC } from 'react'
import Button from 'antd/lib/button'
import { useAuth } from '../../providers/Auth'

const Login: FC = () => {
  const { login } = useAuth()
  return (
    <div>
      <h1>Login</h1>
      <Button onClick={login}>Login</Button>
    </div>
  )
}

export default Login
