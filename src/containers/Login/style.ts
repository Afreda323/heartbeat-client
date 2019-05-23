import { jsx, css } from '@emotion/core'

export const wrapperStyle = css`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
`

export const innerStyle = css`
  padding: 32px;
  width: 370px;
  max-width: 98vw;
  text-align: center;
  background: white;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.13);
  > p {
    margin-bottom: 2em;
  }
`
