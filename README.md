<p align="center">
  <img src="https://raw.githubusercontent.com/tobua/wasser/main/logo.png" alt="wasser SASS/LESS Plugin">
</p>

# wasser

> Fluid CSS properties

Create highly responsive and still pixel-perfect websites.

## Use Cases

Best suited when you have a desktop and a mobile design of the site. Wasser will
allow you to implement the design pixel perfect on both of these viewports. In
between you get a linearly scaling design without any effort. If you only have
a design of the desktop version you get the mobile version for free.

## CSS-in-JS, SASS or LESS?

Below the CSS-in-JS version is documented. Please refer to the following documentations if you prefer SASS or LESS:

- [SASS Documentation](docs/sass.md)
- [LESS Documentation](docs/less.md)

The CSS-in-JS version is newer and requires CSS Variables (no IE11). Both the SASS and LESS version also work with older browsers.

## Installation and Usage

```
npm i wasser
```

```jsx
import React from 'react'
import { render } from 'react-dom'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import { wasser, font, head } from 'wasser'

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
```

## How it works

<p align="center">
  <img src="https://raw.githubusercontent.com/tobua/wasser/main/illustration.svg?sanitize=true" alt="How the wasser plugin works visualized">
</p>

## Interface

`wasser(max: number, [min]: number)`

`max` will be the value at the upper breakpoint, while `min` will be the value
at the lower breakpoint.

If `min` is missing, `max` divided by the scaling factor will be used.

```css
.some-element {
  padding: ${wasser(20)};
}
```

### Fonts

`font(max: number, [min]: number, [line-height-ratio]: number)`

This call does not require a property as it will set both the `font-size` and
the associated `line-height`. The `line-height` does not require a separate value
since it is stretched by the configurable `fontSizeToLineHeightRatio`.

```css
.some-text {
  ${font(16)}
}
```

## Configuration

Call the `configure` function before rendering to change the default settings.

```jsx
import { configure } from 'wasser'

configure({
  scalingRatio: 2,
})
```

The following variables are available and can be configured.

| Variable                  | Default | Description                                                           |
| ------------------------- | ------- | --------------------------------------------------------------------- |
| viewportMin               | 320     | Minimum breakpoint                                                    |
| viewportMax               | 1500    | Maximum breakpoint                                                    |
| scalingRatio              | 1.5     | Ratio to calculate `min` from `max` when `min` is not explicitly set. |
| scalingRatioFont          | 1.2     | Scaling ratio for font properties.                                    |
| fontSizeToLineHeightRatio | 1.5     | Ratio to get line-height from font-size.                              |
