// eslint-disable-next-line import/extensions
import mapSeries from 'async/mapSeries.js'
import { compileString } from 'sass'
import less from 'less'

export const renderSass = (input: string) =>
  compileString(input, { loadPaths: [process.cwd()] }).css.toString()

export const renderLess = async (input: string) => (await less.render(input, {})).css

export const evaluate = async ({ styles, body, widths, selector, page }) => {
  const html = `<!DOCTYPE html>
    <head>
        ${styles.map((style: string) => `<style>${style}</style>`)}
    </head>
    <body>
        ${body}
    </body>
</html>`

  page.setContent(html)

  const results = await mapSeries(widths, async (width) => {
    page.setViewportSize({
      width,
      height: 1000,
    })

    const document = await page.$('document')

    return page.evaluate(selector, document)
  })

  const result = {}

  results.forEach((_result, index) => {
    result[widths[index]] = _result
  })

  return result
}
