import mapSeries from 'async/mapSeries'
import sass from 'node-sass'
import less from 'less'

export const renderSass = (input) =>
  sass.renderSync({ data: input, includePaths: [process.cwd()] }).css.toString()

export const renderLess = async (input) => (await less.render(input, {})).css

export const evaluate = async ({ styles, body, widths, selector }) => {
  const html = `<!DOCTYPE html>
    <head>
        ${styles.map((style) => `<style>${style}</style>`)}
    </head>
    <body>
        ${body}
    </body>
</html>`

  page.setContent(html)

  const results = await mapSeries(widths, async (width) => {
    page.setViewport({
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
