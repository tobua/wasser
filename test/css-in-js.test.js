import { evaluate } from './utility/evaluate.js'
import { wasser, font, head, configure } from '../index.js'

test('Has possible values on viewport somewhre between min and max.', async () => {
  const styles = `.text {
    color: blue;
    ${font(30)}
}
.element {
    color: red;
    height: ${wasser(40)};
}`
  const body = `<p id="regular-text" class="text">Hello world</p>
        <div id="div-element" class="element">Here we are</div>`

  const {
    width,
    regularTextColor,
    regularTextFontSize,
    regularTextLineHeight,
    divElementColor,
    divElementHeight,
  } = await evaluate({
    styles: [head(), styles],
    body,
    width: 1000,
    // Executed inside puppeteer, will only return results.
    selector: () => {
      const regularText = document.querySelector('#regular-text')
      const regularTextStyle = window.getComputedStyle(regularText)
      const divElement = document.querySelector('#div-element')
      const divElementStyle = window.getComputedStyle(divElement)
      return {
        width: document.documentElement.clientWidth,
        regularTextColor: regularTextStyle.color,
        regularTextFontSize: parseFloat(regularTextStyle.fontSize, 10),
        regularTextLineHeight: parseFloat(regularTextStyle.lineHeight, 10),
        divElementColor: divElementStyle.color,
        divElementHeight: parseFloat(divElementStyle.height, 10),
      }
    },
  })

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
