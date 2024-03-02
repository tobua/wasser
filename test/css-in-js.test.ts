import { test, expect } from '@playwright/test'
import { evaluate } from './utility/evaluate'
import { defaults } from './utility/defaults'
import { wasser, font, head, configure } from '../index'

const twoElementBody = `<p id="regular-text" class="text">Hello world</p>
<div id="div-element" class="element">Here we are</div>`

test('Has possible values on viewport somewhre between min and max.', async ({ page }) => {
  const styles = `.text {
    color: blue;
    ${font(30)}
}
.element {
    color: red;
    height: ${wasser(40)};
}`

  const results = await evaluate({
    styles: [head(), styles],
    body: twoElementBody,
    widths: [1000],
    // Executed inside puppeteer, will only return results.
    selector: function Selector() {
      const regularText = document.querySelector('#regular-text') as Element
      const regularTextStyle = window.getComputedStyle(regularText)
      const divElement = document.querySelector('#div-element') as Element
      const divElementStyle = window.getComputedStyle(divElement)
      return {
        width: document.documentElement.clientWidth,
        regularTextColor: regularTextStyle.color,
        regularTextFontSize: parseFloat(regularTextStyle.fontSize),
        regularTextLineHeight: parseFloat(regularTextStyle.lineHeight),
        divElementColor: divElementStyle.color,
        divElementHeight: parseFloat(divElementStyle.height),
      }
    },
    page,
  })

  const {
    width,
    regularTextColor,
    regularTextFontSize,
    regularTextLineHeight,
    divElementColor,
    divElementHeight,
  } = results['1000']

  expect(width).toEqual(1000)
  expect(regularTextColor).toEqual('rgb(0, 0, 255)') // Blue
  expect(regularTextFontSize).toBeGreaterThan(20)
  expect(regularTextFontSize).toBeLessThan(50)
  expect(regularTextLineHeight).toBeGreaterThan(20)
  expect(regularTextLineHeight).toBeLessThan(50)
  expect(divElementColor).toEqual('rgb(255, 0, 0)') // Red
  expect(divElementHeight).toBeGreaterThan(20)
  expect(divElementHeight).toBeLessThan(50)
})

test('Max and min values reached on maximum viewport.', async ({ page }) => {
  const styles = `.text {
    color: blue;
    ${font(30)}
}
.element {
    color: red;
    height: ${wasser(40)};
}`

  const results = await evaluate({
    styles: [head(), styles],
    body: twoElementBody,
    widths: [defaults.viewportMin, defaults.viewportMax],
    // Executed inside puppeteer, will only return results.
    selector: () => {
      const regularTextStyle = window.getComputedStyle(
        document.querySelector('#regular-text') as Element,
      )
      const divElementStyle = window.getComputedStyle(
        document.querySelector('#div-element') as Element,
      )
      return {
        regularTextFontSize: parseFloat(regularTextStyle.fontSize),
        divElementHeight: parseFloat(divElementStyle.height),
      }
    },
    page,
  })

  const minResult = results[defaults.viewportMin]
  const maxResult = results[defaults.viewportMax]

  expect(minResult.regularTextFontSize).toEqual(30 / defaults.scalingRatioFont)
  expect(minResult.divElementHeight).toBeCloseTo(40 / defaults.scalingRatio, 1)

  expect(maxResult.regularTextFontSize).toEqual(30)
  expect(maxResult.divElementHeight).toEqual(40)
})

test('Ratios can be configured.', async ({ page }) => {
  configure({
    scalingRatio: 2,
    scalingRatioFont: 3,
  })

  const styles = `.text {
    color: blue;
    ${font(30)}
}
.element {
    color: red;
    height: ${wasser(40)};
}`

  const results = await evaluate({
    styles: [head(), styles],
    body: twoElementBody,
    widths: [defaults.viewportMin, 910, defaults.viewportMax],
    // Executed inside puppeteer, will only return results.
    selector: () => {
      const regularTextStyle = window.getComputedStyle(
        document.querySelector('#regular-text') as Element,
      )
      const divElementStyle = window.getComputedStyle(
        document.querySelector('#div-element') as Element,
      )
      return {
        regularTextFontSize: parseFloat(regularTextStyle.fontSize),
        divElementHeight: parseFloat(divElementStyle.height),
      }
    },
    page,
  })

  const minResult = results[defaults.viewportMin]
  const betweenResults = results['910']
  const maxResult = results[defaults.viewportMax]

  expect(minResult.regularTextFontSize).toEqual(30 / 3)
  expect(minResult.divElementHeight).toBeCloseTo(40 / 2, 1)

  expect(betweenResults.regularTextFontSize).toBeGreaterThan(30 / 3 + 2)
  expect(betweenResults.regularTextFontSize).toBeLessThan(30 - 2)

  expect(betweenResults.divElementHeight).toBeGreaterThan(40 / 3 + 2)
  expect(betweenResults.divElementHeight).toBeLessThan(40 - 2)

  expect(maxResult.regularTextFontSize).toEqual(30)
  expect(maxResult.divElementHeight).toEqual(40)

  // Reset configuration
  configure(defaults)
})
