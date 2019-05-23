import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router'
import Spin from 'antd/lib/spin'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const Callback: FC<RouteComponentProps> = () => (
  <div
    css={css`
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      position: fixed;
      top: 0;
      left: 0;
    `}
  >
    <Spin size="large" />
  </div>
)

export default Callback
