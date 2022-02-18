import './assets/style/index.css'
import image from './assets/images/ops.jpeg'

const title = document.createElement('h1')
title.textContent = 'Hello world'

const img = document.createElement('img')
img.src = image

const link = document.createElement('a')
link.href = './about'
link.textContent = 'about >'

document.body.append(title)
document.body.append(img)
document.body.append(link)