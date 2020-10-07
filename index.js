const variables = {
  scalingRatio: 1.5,
  viewportMin: 320,
  viewportMax: 1500,
  scalingRatioFont: 1.25,
  fontSizeToLineHeightRatio: 1.25,
}

export const configure = (configuration) =>
  Object.assign(variables, configuration)

const getResponsiveProperty = (property, max, min) => `
    ${property}: calc(${min}px + (${max} - ${min}) * (100vw - ${
  variables.viewportMin
}px) / (${variables.viewportMax} - ${variables.viewportMin}));

    @media (min-width: ${variables.viewportMax}px) {
        ${property}: ${max}px;
    }

    @media (max-width: ${variables.viewportMin - 1}px) {
        ${property}: ${min}px;
    }

    @media print {
        ${property}: ${max}px;
    }
`

export const wasser = (property, max, min = max / variables.scalingRatio) => {
  if (typeof max !== 'number') {
    throw new Error('wasser: A number is expected as the second parameter.')
  }

  return getResponsiveProperty(property, max, min)
}

export const font = (
  max,
  min = max / variables.scalingRatioFont,
  lineHeightRaio = variables.fontSizeToLineHeightRatio
) => {
  if (typeof max !== 'number' || typeof min !== 'number') {
    throw new Error(
      'wasser font(): A number is expected as the first and second parameter.'
    )
  }

  return `${getResponsiveProperty('font-size', max, min)}
  ${getResponsiveProperty(
    'line-height',
    max * lineHeightRaio,
    min * lineHeightRaio
  )}`
}
