import React, { FC } from 'react'
import Button from 'antd/lib/button'
import { useAuth } from '../../providers/Auth'

const Content: FC = () => {
  const { logout } = useAuth()
  return (
    <div>
      <h1>Content</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default Content
