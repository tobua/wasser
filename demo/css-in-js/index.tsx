import React from 'react'
import { render } from 'react-dom'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import { wasser, font, configure, head } from 'wasser'

configure({
  scalingRatio: 8,
  scalingRatioFont: 5,
})

const Wrapper: any = styled.div`
  padding: ${wasser(50)};
`

const Heading: any = styled('h1')`
  ${font(50)}
`

render(
  <Wrapper>
    <Global styles={css(head())} />
    <Heading>Scalable Properties</Heading>
  </Wrapper>,
  document.body
)
