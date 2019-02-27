const firePixelsArray = []
const fireWidth = 10
const fireHeight = 10

function start () {
  createFireDataStructure()
  createFireSource()
  renderFire()

  setInterval(calculateFirePropagation, 10000)
}

function createFireDataStructure () {
  const numberOfPixels = fireWidth * fireHeight
  for (let i = 0; i < numberOfPixels; i++ ) {
    firePixelsArray[i] = 0
  }
}

function calculateFirePropagation () {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + ( fireWidth * row )
      updateFireIntencityPerPixel(pixelIndex)
    }
  }
  renderFire()
}

function updateFireIntencityPerPixel (currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth

  if (belowPixelIndex >= fireHeight * fireWidth) return

  const decay = 1
  const belowPixelFireIntencity = firePixelsArray[belowPixelIndex]
  const newFireIntencity = 
    belowPixelFireIntencity - decay >= 0 ? belowPixelFireIntencity - decay : 0

  firePixelsArray[currentPixelIndex] = newFireIntencity
}

function renderFire () {
  let html = '<table cellpadding=0 cellspacing=0>';
  for (let row = 0; row < fireHeight; row++) {
    html += '<tr>'
    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + ( fireWidth * row )
      const fireIntensity = firePixelsArray[pixelIndex]
      html += '<td>'
      html += `<div class="pixel-index">${pixelIndex}</div>` 
      html += fireIntensity
      html += '</td>'
    }
    html += '</tr>'
  }
  html += '</table>'

  document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource () {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIndex = fireHeight * fireWidth
    const pixelIndex = (overflowPixelIndex - fireWidth) + column

    firePixelsArray[pixelIndex] = 36
  }
}

start()
