(() => {
  const regularContainer = document.getElementById('regular')
  const wasserContainer = document.getElementById('wasser')
  
  const createAndAddRegularElement = (container, index) => {
    const element = document.createElement('div')
    const text = document.createTextNode(index) 
    element.appendChild(text)
    element.className = 'static'
    container.appendChild(element)
  }
  
  const createAndAddWasserElement = (container, index) => {
    const element = document.createElement('div')
    const text = document.createTextNode(index) 
    element.appendChild(text)
    element.className = 'dynamic'
    container.appendChild(element)
  }
  
  for (let i = 1; i < 1000; i++) { 
      createAndAddRegularElement(regularContainer, i)
      createAndAddWasserElement(wasserContainer, i)
  }
  
  const toggleShow = (element) => {
    element = element.nextElementSibling
    const style = window.getComputedStyle(element)
    const displayValue = style.getPropertyValue('display')
    
    element.style.display = displayValue === 'flex' ? 'none' : 'flex'
  }
  
  const toggles = document.getElementsByClassName('toggle')
  
  for (let i = 0; i < toggles.length; i++) { 
      toggles[i].addEventListener('click', (event) => toggleShow(event.target))
  }
})()
