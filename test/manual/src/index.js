import './styles.scss'
import './layout.scss'

// Displays the current viewport width at the bottom left corner.
const setWidth = () => {
  document.querySelector('#width').innerHTML = window.innerWidth + 'px'
}

window.addEventListener('resize', setWidth)

setWidth()

// Watches and displays attributes.
let nodes
const getNodes = () => nodes = document.querySelectorAll('[data-visualize]')

const forEachNode = task => {
  for (let index = 0; index < nodes.length; index++) {
    task(nodes[index])
  }
}

const checkAttributes = node => {
  const attributes = node.getAttribute('data-visualize').split(',')
  const computedValues = window.getComputedStyle(node)
  node.__wasserDisplayNode.innerHTML = ''

  attributes.forEach((attribute) => {
    const value = computedValues[attribute]
    node.__wasserDisplayNode.innerHTML += `${attribute}: ${value}<br/>`
  })
}

const addDisplayNode = node => {
  const paragraphElement = document.createElement('p')
  paragraphElement.className = 'wasser-values'
  const textNode = document.createTextNode('')
  paragraphElement.appendChild(textNode)
  node.parentNode.insertBefore(paragraphElement, node.nextSibling)
  // Add private reference directly on the node.
  node.__wasserDisplayNode = paragraphElement
}

getNodes()
forEachNode(addDisplayNode)
forEachNode(checkAttributes)

window.addEventListener('resize', () => forEachNode(checkAttributes))
