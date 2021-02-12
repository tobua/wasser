import less from 'less'
import { evaluate } from './utility/evaluate'
import {
  twoElementHtmlBody,
  viewPorts,
  expectedResults,
} from './utility/defaults'

const render = async (input) => less.render(input, {})

test('Values for min and max viewports are matching for sass and less.', async () => {
  const styles = (
    await render(`@import 'wasser';

#text {
  .w-font(30);
}
#element {
  .wasser(height, 40);
}`)
  ).css

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
