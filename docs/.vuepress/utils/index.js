export function selectSingleFile(accept) {
  return new Promise((resolve, reject) => {
    // let fileCancel = true
    const inputFileElement = document.createElement('input')
    function handleInputChange(event) {
      const file = event?.target?.files[0]
      resolve(file || null)
      inputFileElement.remove()
    }
    inputFileElement.setAttribute('type', 'file')
    inputFileElement.setAttribute('accept', accept)
    inputFileElement.click()
    inputFileElement.addEventListener('change', handleInputChange)
  })
}


export function getBlobURL(blob) {
  if (!blob) return ''
  var url = null
  // @ts-ignore
  if ('createObjectURL' in window && isFunction(window.createObjectURL)) {
    // @ts-ignore
    url = window.createObjectURL(blob)
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(blob)
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(blob)
  }
  return url
}


export function downloadImageByUrl(src, name) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function() {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const context = canvas.getContext('2d')
      context && context.drawImage(image, 0, 0, image.width, image.height)
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      a.download = name
      a.href = url
      a.dispatchEvent(event)
      a.remove()
      resolve(null)
    }
    image.onerror = function(error){
      reject(error)
    }
    image.src = src
  })
}