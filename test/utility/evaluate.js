// eslint-disable-next-line import/extensions
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

  const results = await new Promise((done) =>
    // Have to be run in series as browser instance is shared.
    mapSeries(
      widths,
      async (width) => {
        page.setViewport({
          width,
          height: 1000,
        })

        return page.evaluate(selector)
      },
      (_, result) => done(result)
    )
  )

  const result = {}

  results.forEach((_result, index) => {
    result[widths[index]] = _result
  })

  return result
}
