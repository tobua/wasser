import React from 'react'
import { render } from 'react-dom'
import '@emotion/core'
import styled from '@emotion/styled'
import { wasser, font, configure } from 'wasser/js'

configure({
  scalingRatio: 8,
})

export const Wrapper = styled.div`
  ${wasser('padding', 50)}
`

export const Heading = styled.h1`
  ${font(50)}
`

render(
  <div>
    <Wrapper>
      <Heading>Scalable Property</Heading>
    </Wrapper>
  </div>,
  document.body
)
