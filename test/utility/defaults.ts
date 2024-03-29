export const defaults = {
  scalingRatio: 1.5,
  viewportMin: 320,
  viewportMax: 1500,
  scalingRatioFont: 1.25,
  fontSizeToLineHeightRatio: 1.25,
}

export const twoElementHtmlBody = `<p id="text">Hello world</p>
<div id="element">Here we are</div>`

export const defaultEvaluateConfiguration = (viewPorts) => ({
  styles: null,
  body: twoElementHtmlBody,
  widths: viewPorts,
  // Executed inside puppeteer, will only return results.
  selector: () => {
    const regularTextStyle = window.getComputedStyle(document.getElementById('text') as Element)
    const divElementStyle = window.getComputedStyle(document.getElementById('element') as Element)
    return {
      regularTextFontSize: parseFloat(regularTextStyle.fontSize),
      divElementHeight: parseFloat(divElementStyle.height),
    }
  },
})
