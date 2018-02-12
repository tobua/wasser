// Sends the current height to the parent, so that it can dynamically adapt.
(() => {
  window.parent.postMessage(document.body.scrollHeight, '*')
  window.addEventListener('resize', (event) => window.parent.postMessage(document.body.scrollHeight, '*'))
})()
