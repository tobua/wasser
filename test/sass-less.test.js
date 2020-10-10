import sass from 'node-sass'
import less from 'less'
import { evaluate } from './utility/evaluate.js'
import { defaults } from './utility/defaults.js'

const renderSass = (input) => sass.renderSync({ data: input, includePaths: [
  process.cwd()
] })

const renderLess = async (input) => less.render(input, {})

const twoElementBody = `<p id="regular-text" class="text">Hello world</p>
<div id="div-element" class="element">Here we are</div>`

test('Values for min and max viewports are matching for sass and less.', async () => {
  // Rewriting @import for tests, as it's not coming from node_modules.
  const stylesSass = renderSass(`@import 'wasser';

.text {
  @include w-font(30)
}
.element {
  @include wasser(height, 40);
}`).css.toString()

  const stylesLess = (await renderLess(`@import 'wasser';

.text {
  .w-font(30);
}
.element {
  .wasser(height, 40);
}`)).css

  const evaluateConfiguration = {
    styles: null,
    body: twoElementBody,
    widths: [defaults.viewportMin, defaults.viewportMax],
    // Executed inside puppeteer, will only return results.
    selector: () => {
      const regularTextStyle = window.getComputedStyle(
        document.querySelector('#regular-text')
      )
      const divElementStyle = window.getComputedStyle(
        document.querySelector('#div-element')
      )
      return {
        regularTextFontSize: parseFloat(regularTextStyle.fontSize, 10),
        divElementHeight: parseFloat(divElementStyle.height, 10),
      }
    },
  }

  const resultsSass = await evaluate({
      ...evaluateConfiguration,
      styles: [stylesSass]
  })

  const resultsLess = await evaluate({
      ...evaluateConfiguration,
      styles: [stylesLess]
  })

  const minResultSass = resultsSass[defaults.viewportMin]
  const maxResultSass = resultsSass[defaults.viewportMax]

  expect(minResultSass.regularTextFontSize).toEqual(30 / defaults.scalingRatioFont)
  expect(minResultSass.divElementHeight).toBeCloseTo(40 / defaults.scalingRatio, 1)

  expect(maxResultSass.regularTextFontSize).toEqual(30)
  expect(maxResultSass.divElementHeight).toEqual(40)

  const minResultLess = resultsLess[defaults.viewportMin]
  const maxResultLess = resultsLess[defaults.viewportMax]

  expect(minResultLess.regularTextFontSize).toEqual(30 / defaults.scalingRatioFont)
  expect(minResultLess.divElementHeight).toBeCloseTo(40 / defaults.scalingRatio, 1)

  expect(maxResultLess.regularTextFontSize).toEqual(30)
  expect(maxResultLess.divElementHeight).toEqual(40)
})