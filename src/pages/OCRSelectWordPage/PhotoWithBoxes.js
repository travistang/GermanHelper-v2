import React from 'react'
import { withTheme } from '@material-ui/styles'
import { isEqual } from 'lodash'
function PhotoWithBoxes(props) {
  const {
    photo, boxAndWords,
    onBoxChosen,
    theme // withTheme
  } = props

  const [hitBox, setHitBox] = React.useState(null)

  const adjustBoxByRatio = (box, rX, rY) => {
    const startX = box[0] * rX
    const startY = box[1] * rY
    const endX   = box[2] * rX + startX
    const endY   = box[3] * rY + startY

    return [startX, startY, endX, endY]
  }
  // function for drawing a rectangle on the canvas
  const drawBox = (ctx, box, color) => {
    ctx.beginPath()
    ctx.lineWidth = "1"
    ctx.strokeStyle = color
    ctx.rect(...box)
    ctx.stroke()
  }
  // function for finding which box is hit
  const findHitBox = ({ x, y }, { rX, rY} ) => {
    return boxAndWords.find(({box, word}) => {
      const [startX, startY, endX, endY] = adjustBoxByRatio(box, rX, rY)
      return (
        startX <= x && x <= endX &&
        startY <= y && y <= endY
      )
    })
  }

  // function for drawing the image and all the boxes on canvas
  const drawImageAndBoxes = (canvas, ctx, image, hitBox = null) => {
    // empty everything
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const rY = canvas.height / image.height
    const rX = canvas.width / image.width

    // add the image
    ctx.drawImage(image,
      0, 0, image.width, image.height, // source image dimension
      0, 0, canvas.width, canvas.height, // canvas dimension
    )
    // add the boxes
    boxAndWords.forEach(boxAndWord => {
      const { box: rawBox, word } = boxAndWord
      const box = adjustBoxByRatio(rawBox, rX, rY)
      let strokeColor = 'red'

      if(hitBox) {
        const hitBoxAdjusted = adjustBoxByRatio(hitBox.box, rX, rY)
        if(hitBoxAdjusted[0] == box[0] && hitBoxAdjusted[1] == box[1]) {
          strokeColor = 'blue'
        }
      }

      drawBox(ctx, [
        box[0],
        box[1],
        box[2] - box[0],
        box[3] - box[1]
      ], strokeColor)
    })
  }

  React.useEffect(() => {
    const canvas = document.getElementById('OCRResult')
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    const image = new Image()

    image.onload = () => {
      const paddingSize = 20 * 2
      // setup dimension
      canvas.height = image.height - paddingSize
      canvas.width = image.width - paddingSize // padding
      const rY = canvas.height / image.height
      const rX = canvas.width / image.width

      // when the image just loaded on canvas, draw it as well as other bounding boxes
      drawImageAndBoxes(canvas, ctx, image)

      // when the user touches the canvas, find out which box is hit, set hitbox with that
      canvas.addEventListener('mouseup', async e => {
        // https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const foundHitBox = findHitBox({ x, y }, { rX, rY })

        await setHitBox(foundHitBox)
        drawImageAndBoxes(canvas, ctx, image, foundHitBox)
        onBoxChosen && onBoxChosen(foundHitBox)
      })
    }
    // load the photo
    image.src = photo
  }, [boxAndWords, photo])


  return (
    <div className="OCRSelectWordPagePhotoWithBoxesWrapper">
      <canvas id="OCRResult" className="OCRResultCanvas" />
    </div>
  )
}

export default withTheme(PhotoWithBoxes)
