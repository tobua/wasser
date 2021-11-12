import React from 'react'
import { render } from 'react-dom'
import { createStitches } from '@stitches/react'
import { wasser, fontObject, configure, globalVariables } from 'wasser'

configure({
  scalingRatio: 8,
  scalingRatioFont: 5,
})

export const { styled, globalCss } = createStitches({})

globalCss(globalVariables())()

const Wrapper = styled('div', {
  padding: wasser(50),
})

const Heading = styled('h1', {
  ...fontObject(50),
})

render(
  <Wrapper>
    <Heading>Scalable Properties</Heading>
  </Wrapper>,
  document.body
)
