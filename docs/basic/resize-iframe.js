// Receives the iframe height from message-height.js and adapts the iframe.
(() => {
  const iframes = document.getElementsByTagName('iframe')

  const setHeight = (event) => {
    const source = event.source
    const height = event.data
    
    // Find the source iframe and adapt it's height
    for (let i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow === source) {
        iframes[i].style.height = `${height + 60}px`
      }
    }
  }
  
  window.addEventListener('message', (event) => setHeight(event), false)  
})()
