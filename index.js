const variables = {
  scalingRatio: 1.5,
  viewportMin: 320,
  viewportMax: 1500,
  scalingRatioFont: 1.25,
  fontSizeToLineHeightRatio: 1.25,
}

export const configure = (configuration) =>
  Object.assign(variables, configuration)

const calculation = (max, min) => {
  const minReached = `${min}px * var(--min)`
  const maxReached = `${max}px * var(--max)`
  const difference = max - min
  const between = `var(--factor)) * var(--between)`

  return `calc((${min}px + ${difference} * ${between} + ${minReached} + ${maxReached})`
}

export const head = () => `
:root {
  --factor: (100vw - ${variables.viewportMin}px) / ${
  variables.viewportMax - variables.viewportMin
};
  --max: 0;
  --between: 1;
  --min: 0;
}

@media (min-width: ${variables.viewportMax}px) {
  :root {
    --max: 1;
    --between: 0;
    --min: 0;
  }
}

@media (max-width: ${variables.viewportMin}px) {
  :root {
    --max: 0;
    --between: 0;
    --min: 1;
  }
}

@media print {
  --max: 1;
  --between: 0;
  --min: 0;
}`

export const wasser = (max, min = max / variables.scalingRatio) => {
  const errorMessage = (place) =>
    `wasser: A number is expected as the ${place} parameter for wasser(max: number, min: number).`

  if (typeof max !== 'number') {
    throw new Error(errorMessage('first'))
  }

  if (typeof max !== 'number') {
    throw new Error(errorMessage('second'))
  }

  return calculation(max, min)
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

  return `font-size: ${calculation(max, min)};
line-height: ${calculation(max * lineHeightRaio, min * lineHeightRaio)};`
}
