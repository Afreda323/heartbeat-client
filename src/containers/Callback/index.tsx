import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router'

const Callback: FC<RouteComponentProps> = () => {
  const foo = 'bar'
  return <h1>Callback</h1>
}

export default Callback
