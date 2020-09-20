(() => {
  const dragNodes = document.getElementsByClassName('drag')
  const offsets = new Array(dragNodes.length + 1).join('0').split('').map(parseFloat)

  const handleDrag = (event, index) => {
    const dragElement = event.target;
    const wrapper = dragElement.parentElement
    const wrapperWidth = wrapper.clientWidth
    const iframe = dragElement.nextElementSibling
    const pageX = event.pageX
    const dragDifference = event.layerX

    if (pageX < 20) {
      return;
    }

    offsets[index] = Math.max(0, offsets[index] - dragDifference)
    wrapper.style.width = `calc(100% - ${offsets[index]}px)`
  }

  for (let i = 0; i < dragNodes.length; i++) {
    dragNodes[i].addEventListener('dragend', (event) => handleDrag(event, i))
  }
})()
