export const defaults = {
  scalingRatio: 1.5,
  viewportMin: 320,
  viewportMax: 1500,
  scalingRatioFont: 1.25,
  fontSizeToLineHeightRatio: 1.25,
}

export const twoElementHtmlBody = `<p id="text">Hello world</p>
<div id="element">Here we are</div>`

export const viewPorts = [
  defaults.viewportMin,
  defaults.viewportMax,
  defaults.viewportMin - 50,
  defaults.viewportMin + 50,
]

// Pixels between min and max viewport.
const viewPortDifference = defaults.viewportMax - defaults.viewportMin
const scale50PixelsAboveMin = (viewPortDifference - 50) / viewPortDifference

export const expectedResults = {
  [viewPorts[0]]: {
    text: 30 / defaults.scalingRatioFont,
    element: 40 / defaults.scalingRatio,
  },
  [viewPorts[1]]: {
    text: 30,
    element: 40,
  },
  // Below min, should be same as min.
  [viewPorts[2]]: {
    text: 30 / defaults.scalingRatioFont,
    element: 40 / defaults.scalingRatio,
  },
  // Slightly above min, should be slightly more.
  [viewPorts[3]]: {
    text: 30 - (30 - 30 / defaults.scalingRatioFont) * scale50PixelsAboveMin,
    element: 40 - (40 - 40 / defaults.scalingRatio) * scale50PixelsAboveMin,
  },
}
