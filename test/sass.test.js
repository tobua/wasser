import sass from 'node-sass'
import { evaluate } from './utility/evaluate'
import {
  twoElementHtmlBody,
  viewPorts,
  expectedResults,
} from './utility/defaults'

const render = (input) =>
  sass.renderSync({ data: input, includePaths: [process.cwd()] })

test('Values for min and max viewports are matching for sass and less.', async () => {
  // Rewriting @import for tests, as it's not coming from node_modules.
  const styles = render(`@import 'wasser';

#text {
  @include w-font(30)
}
#element {
  @include wasser(height, 40);
}`).css.toString()

  const evaluateConfiguration = {
    styles: null,
    body: twoElementHtmlBody,
    widths: viewPorts,
    // Executed inside puppeteer, will only return results.
    selector: () => {
      const regularTextStyle = window.getComputedStyle(
        document.getElementById('text')
      )
      const divElementStyle = window.getComputedStyle(
        document.getElementById('element')
      )
      return {
        regularTextFontSize: parseFloat(regularTextStyle.fontSize, 10),
        divElementHeight: parseFloat(divElementStyle.height, 10),
      }
    },
  }

  const results = await evaluate({
    ...evaluateConfiguration,
    styles: [styles],
  })

  viewPorts.forEach((viewPort) => {
    const result = results[viewPort]

    expect(result.regularTextFontSize).toBeCloseTo(
      expectedResults[viewPort].text
    )
    expect(result.divElementHeight).toBeCloseTo(
      expectedResults[viewPort].element,
      1
    )
  })
})
