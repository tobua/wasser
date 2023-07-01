import { evaluate, renderSass, renderLess } from './utility/evaluate'
import { defaults, defaultEvaluateConfiguration } from './utility/defaults'

// Run same test for SASS and LESS
const suite = (name, getContext) => {
  const context = getContext()

  test(`${name} for sass.`, async () => {
    const results = await evaluate({
      ...context.evaluateConfiguration,
      styles: [renderSass(context.sass)],
    })

    context.test(results)
  })

  test(`${name} for less.`, async () => {
    const results = await evaluate({
      ...context.evaluateConfiguration,
      styles: [await renderLess(context.less)],
    })

    context.test(results)
  })
}

suite('Proper sizes around common viewports', () => {
  // Pixels between min and max viewport.
  const viewPortDifference = defaults.viewportMax - defaults.viewportMin
  const viewportMiddle = Math.floor(defaults.viewportMin + viewPortDifference / 2)

  const viewPorts = [
    defaults.viewportMin,
    defaults.viewportMax,
    defaults.viewportMin - 50,
    defaults.viewportMin + 50,
    defaults.viewportMax - 50,
    defaults.viewportMax + 50,
    viewportMiddle,
  ]

  const scale50PixelsAboveMin = (viewPortDifference - 50) / viewPortDifference
  const scale50PixelsBelowMax = 50 / viewPortDifference

  const textSize = 30
  const elementSize = 40

  const expectedResults = {
    [viewPorts[0]]: {
      text: textSize / defaults.scalingRatioFont,
      element: elementSize / defaults.scalingRatio,
    },
    [viewPorts[1]]: {
      text: textSize,
      element: elementSize,
    },
    // Below min, should be same as min.
    [viewPorts[2]]: {
      text: textSize / defaults.scalingRatioFont,
      element: elementSize / defaults.scalingRatio,
    },
    // Slightly above min, should be slightly more.
    [viewPorts[3]]: {
      text: textSize - (textSize - textSize / defaults.scalingRatioFont) * scale50PixelsAboveMin,
      element:
        elementSize - (elementSize - elementSize / defaults.scalingRatio) * scale50PixelsAboveMin,
    },
    // Slightly below max, should be slightly less.
    [viewPorts[4]]: {
      text: textSize - (textSize - textSize / defaults.scalingRatioFont) * scale50PixelsBelowMax,
      element:
        elementSize - (elementSize - elementSize / defaults.scalingRatio) * scale50PixelsBelowMax,
    },
    // Above max, should be same as max.
    [viewPorts[5]]: {
      text: textSize,
      element: elementSize,
    },
    // Exactly in between.
    [viewPorts[6]]: {
      text: textSize - (textSize - textSize / defaults.scalingRatioFont) * 0.5,
      element: elementSize - (elementSize - elementSize / defaults.scalingRatio) * 0.5,
    },
  }

  const sassSource = `@import 'wasser';

#text {
  @include w-font(${textSize})
}
#element {
  @include wasser(height, ${elementSize});
}`

  const lessSource = `@import 'wasser';

#text {
  .w-font(${textSize});
}
#element {
  .wasser(height, ${elementSize});
}`

  return {
    // Rewriting @import for tests, as it's not coming from node_modules.
    sass: sassSource,
    less: lessSource,
    test: (results) => {
      viewPorts.forEach((viewPort) => {
        const result = results[viewPort]

        expect(result.regularTextFontSize).toBeCloseTo(expectedResults[viewPort].text)
        expect(result.divElementHeight).toBeCloseTo(expectedResults[viewPort].element, 1)
      })
    },
    evaluateConfiguration: defaultEvaluateConfiguration(viewPorts),
  }
})

suite('Viewports can be modified', () => {
  const adaptedViewports = {
    min: 500,
    max: 1000,
  }

  // Pixels between min and max viewport.
  const viewPortDifference = adaptedViewports.max - adaptedViewports.min
  const viewportMiddle = 750

  const viewPorts = [
    adaptedViewports.min,
    adaptedViewports.max,
    adaptedViewports.min - 50,
    adaptedViewports.min + 50,
    adaptedViewports.max - 50,
    adaptedViewports.max + 50,
    viewportMiddle,
  ]

  const scale50PixelsAboveMin = (viewPortDifference - 50) / viewPortDifference
  const scale50PixelsBelowMax = 50 / viewPortDifference

  const textSize = 30
  const elementSize = 40

  const expectedResults = {
    [viewPorts[0]]: {
      text: textSize / defaults.scalingRatioFont,
      element: elementSize / defaults.scalingRatio,
    },
    [viewPorts[1]]: {
      text: textSize,
      element: elementSize,
    },
    // Below min, should be same as min.
    [viewPorts[2]]: {
      text: textSize / defaults.scalingRatioFont,
      element: elementSize / defaults.scalingRatio,
    },
    // Slightly above min, should be slightly more.
    [viewPorts[3]]: {
      text: textSize - (textSize - textSize / defaults.scalingRatioFont) * scale50PixelsAboveMin,
      element:
        elementSize - (elementSize - elementSize / defaults.scalingRatio) * scale50PixelsAboveMin,
    },
    // Slightly below max, should be slightly less.
    [viewPorts[4]]: {
      text: textSize - (textSize - textSize / defaults.scalingRatioFont) * scale50PixelsBelowMax,
      element:
        elementSize - (elementSize - elementSize / defaults.scalingRatio) * scale50PixelsBelowMax,
    },
    // Above max, should be same as max.
    [viewPorts[5]]: {
      text: textSize,
      element: elementSize,
    },
    // Exactly in between.
    [viewPorts[6]]: {
      text: textSize - (textSize - textSize / defaults.scalingRatioFont) * 0.5,
      element: elementSize - (elementSize - elementSize / defaults.scalingRatio) * 0.5,
    },
  }

  const sassSource = `@import 'wasser';

$wasser-viewport-min: ${adaptedViewports.min};
$wasser-viewport-max: ${adaptedViewports.max};

#text {
  @include w-font(${textSize})
}
#element {
  @include wasser(height, ${elementSize});
}`

  const lessSource = `@import 'wasser';

@wasser-viewport-min: ${adaptedViewports.min};
@wasser-viewport-max: ${adaptedViewports.max};

#text {
  .w-font(${textSize});
}
#element {
  .wasser(height, ${elementSize});
}`

  return {
    // Rewriting @import for tests, as it's not coming from node_modules.
    sass: sassSource,
    less: lessSource,
    test: (results) => {
      viewPorts.forEach((viewPort) => {
        const result = results[viewPort]

        expect(result.regularTextFontSize).toBeCloseTo(expectedResults[viewPort].text, 1)
        expect(result.divElementHeight).toBeCloseTo(expectedResults[viewPort].element, 1)
      })
    },
    evaluateConfiguration: defaultEvaluateConfiguration(viewPorts),
  }
})

suite('Scaling ratios can be modified', () => {
  const adaptedScalingRatios = {
    regular: 3.5,
    font: 2.5,
  }

  // Pixels between min and max viewport.
  const viewPortDifference = defaults.viewportMax - defaults.viewportMin
  const viewportMiddle = Math.floor(defaults.viewportMin + viewPortDifference / 2)

  const viewPorts = [
    defaults.viewportMin,
    defaults.viewportMax,
    defaults.viewportMin - 50,
    defaults.viewportMin + 50,
    defaults.viewportMax - 50,
    defaults.viewportMax + 50,
    viewportMiddle,
  ]

  const scale50PixelsAboveMin = (viewPortDifference - 50) / viewPortDifference
  const scale50PixelsBelowMax = 50 / viewPortDifference

  const textSize = 13
  const elementSize = 17

  const expectedResults = {
    [viewPorts[0]]: {
      text: textSize / adaptedScalingRatios.font,
      element: elementSize / adaptedScalingRatios.regular,
    },
    [viewPorts[1]]: {
      text: textSize,
      element: elementSize,
    },
    // Below min, should be same as min.
    [viewPorts[2]]: {
      text: textSize / adaptedScalingRatios.font,
      element: elementSize / adaptedScalingRatios.regular,
    },
    // Slightly above min, should be slightly more.
    [viewPorts[3]]: {
      text: textSize - (textSize - textSize / adaptedScalingRatios.font) * scale50PixelsAboveMin,
      element:
        elementSize -
        (elementSize - elementSize / adaptedScalingRatios.regular) * scale50PixelsAboveMin,
    },
    // Slightly below max, should be slightly less.
    [viewPorts[4]]: {
      text: textSize - (textSize - textSize / adaptedScalingRatios.font) * scale50PixelsBelowMax,
      element:
        elementSize -
        (elementSize - elementSize / adaptedScalingRatios.regular) * scale50PixelsBelowMax,
    },
    // Above max, should be same as max.
    [viewPorts[5]]: {
      text: textSize,
      element: elementSize,
    },
    // Exactly in between.
    [viewPorts[6]]: {
      text: textSize - (textSize - textSize / adaptedScalingRatios.font) * 0.5,
      element: elementSize - (elementSize - elementSize / adaptedScalingRatios.regular) * 0.5,
    },
  }

  const sassSource = `@import 'wasser';

$wasser-scaling-ratio: ${adaptedScalingRatios.regular};
$wasser-scaling-ratio-font: ${adaptedScalingRatios.font};

#text {
  @include w-font(${textSize})
}
#element {
  @include wasser(height, ${elementSize});
}`

  const lessSource = `@import 'wasser';

@wasser-scaling-ratio: ${adaptedScalingRatios.regular};
@wasser-scaling-ratio-font: ${adaptedScalingRatios.font};

#text {
  .w-font(${textSize});
}
#element {
  .wasser(height, ${elementSize});
}`

  return {
    // Rewriting @import for tests, as it's not coming from node_modules.
    sass: sassSource,
    less: lessSource,
    test: (results) => {
      viewPorts.forEach((viewPort) => {
        const result = results[viewPort]

        expect(result.regularTextFontSize).toBeCloseTo(expectedResults[viewPort].text, 1)
        expect(result.divElementHeight).toBeCloseTo(expectedResults[viewPort].element, 1)
      })
    },
    evaluateConfiguration: defaultEvaluateConfiguration(viewPorts),
  }
})
