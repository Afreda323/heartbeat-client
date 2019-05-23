import React, { FC } from 'react'
import Button from 'antd/lib/button'
import { RouteComponentProps } from 'react-router'
import { useAuth } from '../../providers/Auth'

const Content: FC<RouteComponentProps> = (props) => {
  const { logout, getUser } = useAuth()
  console.log(getUser())
  const handleClick = () => {
    logout(() => props.history.push('/'))
  }
  return (
    <div>
      <h1>Content</h1>
      <Button onClick={handleClick}>Logout</Button>
    </div>
  )
}

export default Content
