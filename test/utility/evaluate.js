export const evaluate = ({ styles, body, width, selector }) => {
  const html = `<!DOCTYPE html>
    <head>
        ${styles.map((style) => `<style>${style}</style>`)}
    </head>
    <body>
        ${body}
    </body>
</html>`

  page.setContent(html)
  page.setViewport({
    width,
    height: 1000,
    // deviceScaleFactor: 1,
    // isMobile: false
  })

  return page.evaluate(selector)
}
