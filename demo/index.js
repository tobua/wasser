import React from 'react'
import { render } from 'react-dom'
import '@emotion/core'
import styled from '@emotion/styled'
import { wasser, font } from 'wasser'

export const Wrapper = styled.div`
  ${wasser('padding', 50)}
`

export const Heading = styled.h1`
  ${font(50)}
`

render(
  <Wrapper>
    <Heading>Scalable Property</Heading>
  </Wrapper>,
  document.body
)