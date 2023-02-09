import React from 'react'
import { createRoot } from 'react-dom/client'
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

createRoot(document.body as HTMLElement).render(
  <Wrapper>
    <Heading>Scalable Properties</Heading>
  </Wrapper>
)
