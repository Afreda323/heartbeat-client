import React, { FC } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import Icon from 'antd/lib/icon'
import Divider from 'antd/lib/divider'
import Button from 'antd/lib/button'
import { useAuth } from '../../providers/Auth'
import { wrapperStyle, innerStyle } from './style'

const Content: FC = () => {
  const { login } = useAuth()
  return (
    <div css={wrapperStyle}>
      <div css={innerStyle}>
        <Icon
          type="schedule"
          theme="twoTone"
          style={{ fontSize: 50, color: '#1890ff' }}
        />
        <Divider>Heartbeat</Divider>
        <p>
          Welcome to Heartbeat. Click the button below to log in either via
          email and password, or with your Google account.
        </p>
        <Button type="primary" ghost shape="round" icon="login" size="large" onClick={login}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default Content
