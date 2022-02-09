import './assets/style/index.css'
import image from './assets/images/ops.jpeg'

const title = document.createElement('h1')

title.textContent = 'Hello world'

const img = document.createElement('img')

img.src = image

document.body.append(title)
document.body.append(img)