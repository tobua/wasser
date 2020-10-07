import 'expect-puppeteer'
import { wasser, font, configure } from '..'

test('Has possible values on viewport somewhete between min and max.', async () => {
    const styles = `.text {
        color: blue;
        ${font(30)}
    }`
    const html = `<!DOCTYPE html>
        <head>
            <style>${styles}</style>
        </head>
        <body>
            <p id="regular-text" class="text">Hello world</p>
        </body>
    </html>`

    page.setContent(html)
    page.setViewport({
        width: 1000,
        height: 1000,
        // deviceScaleFactor: 1,
        // isMobile: false
    })

    const regularText = await expect(page).toMatchElement('#regular-text')

    const { width, regularTextColor, regularTextFontSize } = await page.evaluate(() => {
        // Executed inside puppeteer, will only return results.
        const regularText = document.querySelector('#regular-text')
        const regularTextStyle = window.getComputedStyle(regularText)
        return {
            width: document.documentElement.clientWidth,
            regularTextColor: regularTextStyle.color,
            regularTextFontSize: parseFloat(regularTextStyle.fontSize, 10)
        }
    })

    expect(width).toEqual(1000)
    expect(regularTextColor).toEqual('rgb(0, 0, 255)')
    expect(regularTextFontSize).toBeGreaterThanOrEqual(20);
    expect(regularTextFontSize).toBeLessThan(50);
})
