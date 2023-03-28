let input = document.querySelector('.input-value') // The Input
let sendDataButton = document.querySelector('.send-data') // The Button
let theImage = document.querySelector('.img-container') // The Image
let theTitle = document.querySelector('.the-title') // The Title Of The Video
let theDurationP = document.querySelector('.duration-p') //The Duration Of Video
let instagram = document.querySelector('.instagram') // The Container Of Instagram
let buttonsContainer = document.querySelector('.download-div') // The Div To Container All Buttons

// Click On The Button Function
sendDataButton.addEventListener('click', (e) => {
  let link = input.value
  removeContent()
  if (link !== '') {
    let data = {
      url: `${link}`,
    }
    fetch('https://save-from.net/api/convert', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((responsive) => responsive.json())
      .then((fullData) => {
        if (fullData.message === 'Convert failed for some reason') {
          theTitle.innerHTML = `هذا الرابط يوجد به مشكلة`
        } else {
          if (fullData.length !== undefined) {
            if (
              fullData[0].meta.source.slice(0, 25) ===
              'https://www.instagram.com'
            ) {
              console.log('instagram')
              createMoreDivs(fullData)
            }
          } else {
            let type = fullData.url[0].type
            let imgLink = fullData.url[0].url
            generate(
              fullData.thumb,
              fullData.meta.title,
              fullData.meta.duration,
              fullData.url,
              fullData.video_quality,
              fullData.id,
              type,
              imgLink,
            )
          }
        }
      })
  } else {
    return false
  }
  input.value = ''
})

// Generate The Divs At Html
function generate(
  img,
  title,
  duration,
  allUrl,
  videoQuality,
  id,
  type,
  imgLink,
) {
  if (type === 'jpg') {
    theImage.src = img
    theTitle.innerHTML = title
    let a = document.createElement('a')
    a.href = imgLink
    a.target = '_blank'
    a.classList.add('block')
    a.classList.add('block')
    a.classList.add('w-[200px]')
    a.classList.add('mb-3')
    a.classList.add('mx-auto')
    a.classList.add('py-2')
    a.classList.add('text-white')
    a.classList.add('bg-blue-400')
    a.classList.add('hover:bg-blue-500')
    a.appendChild(document.createTextNode(`Download Image`))
    buttonsContainer.appendChild(a)
  } else {
    theImage.src = img
    theTitle.innerHTML = title
    if (duration !== undefined) {
      theDurationP.innerHTML = `مدة هذا الفيديو هي ${duration} دقيقة`
    } else {
      theDurationP.innerHTML = `مدة هذا الفيديو غير معروفة`
    }

    allUrl.forEach((link) => {
      if (link.type == 'mp4') {
        let a = document.createElement('a')
        a.href = link.url
        a.target = '_blank'
        a.classList.add('block')
        a.classList.add('block')
        a.classList.add('w-[200px]')
        a.classList.add('mb-3')
        a.classList.add('mx-auto')
        a.classList.add('py-2')
        a.classList.add('text-white')
        a.classList.add('bg-blue-400')
        a.classList.add('hover:bg-blue-500')
        if (link.subname !== undefined) {
          a.appendChild(document.createTextNode(`${link.name} ${link.subname}`))
        } else {
          a.appendChild(document.createTextNode(`${link.name}`))
        }
        buttonsContainer.appendChild(a)
      }
    })
  }
}

// This Function To Remove The Content Of All Div And Img
function removeContent() {
  buttonsContainer.innerHTML = ''
  theImage.src = ''
  theTitle.innerHTML = ''
  theDurationP.innerHTML = ''
  instagram.innerHTML = ''
}

// Create More Divs For Instagram
function createMoreDivs(allData) {
  // console.log(allData.length)
  // console.log(allData)
  allData.forEach((oneData) => {
    console.log(oneData)
    console.log(oneData.url[0].type)
    if (
      oneData.url[0].type === 'mp4' ||
      oneData.url[0].type === 'jpg' ||
      oneData.url[0].type === 'webp'
    ) {
      let mainDiv = document.createElement('div')
      mainDiv.classList.add('w-full')
      mainDiv.classList.add('md:w-[48%]')
      mainDiv.classList.add('mb-4')
      mainDiv.classList.add('overflow-hidden')
      let imgInstagram = document.createElement('img')
      imgInstagram.src = oneData.thumb
      mainDiv.appendChild(imgInstagram)
      instagram.appendChild(mainDiv)
      let h3 = document.createElement('h3')
      h3.classList.add('my-4')
      h3.appendChild(document.createTextNode(oneData.meta.title))
      mainDiv.appendChild(h3)
      let a = document.createElement('a')
      a.href = oneData.url[0].url
      a.target = '_blank'
      a.classList.add('block')
      a.classList.add('block')
      a.classList.add('w-[200px]')
      a.classList.add('mb-3')
      a.classList.add('mx-auto')
      a.classList.add('py-2')
      a.classList.add('text-white')
      a.classList.add('bg-blue-400')
      a.classList.add('hover:bg-blue-500')
      a.appendChild(document.createTextNode(oneData.url[0].type))
      mainDiv.appendChild(a)
    }
  })
}
// Stop The Right Click and The Keyboard Buttons Code
document.addEventListener('contextmenu', (e) => e.preventDefault())
function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0)
}
document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  ) {
    return false
  }
}
