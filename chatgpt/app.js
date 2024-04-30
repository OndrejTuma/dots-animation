const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let dots = []
let animationFrameId = null // Variable to hold the animation frame reference

class Dot {
  constructor(x, y, radius, xVel, yVel) {
    this.x = x
    this.y = y
    this.radius = radius
    this.xVel = xVel
    this.yVel = yVel
  }

  move() {
    this.x += this.xVel
    this.y += this.yVel
    // Reverse velocity if dot hits the edge of the canvas
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.xVel *= -1
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.yVel *= -1
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function createDots() {
  dots = [] // Clear existing dots
  const numDots = parseInt(document.getElementById('dotsCount').value)
  const radius = parseInt(document.getElementById('radius').value)
  const xVelValue = parseInt(document.getElementById('xVel').value)
  const yVelValue = parseInt(document.getElementById('yVel').value)
  for (let i = 0; i < numDots; i++) {
    let x = Math.random() * (canvas.width - radius * 2) + radius // Ensure dot starts within bounds
    let y = Math.random() * (canvas.height - radius * 2) + radius // Ensure dot starts within bounds
    let xVel = Math.random() * (2 * xVelValue) - xVelValue
    let yVel = Math.random() * (2 * yVelValue) - yVelValue
    dots.push(new Dot(x, y, radius, xVel, yVel))
  }
}

function drawLines() {
  const lineDistance = parseInt(document.getElementById('lineDistance').value)
  dots.forEach((dot, index) => {
    dots.slice(index + 1).forEach((otherDot) => {
      const distance = Math.hypot(dot.x - otherDot.x, dot.y - otherDot.y)
      if (distance < lineDistance) {
        const opacity = 1 - distance / lineDistance
        ctx.beginPath()
        ctx.moveTo(dot.x, dot.y)
        ctx.lineTo(otherDot.x, otherDot.y)
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
        ctx.stroke()
      }
    })
  })
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  dots.forEach((dot) => {
    dot.move()
    dot.draw()
  })
  drawLines()
  animationFrameId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId) // Cancel any existing animation frames
  }
  if (dots.length === 0) {
    createDots() // Only create dots if they haven't been created yet
  }
  animate() // Start the animation
}

function stopAnimation() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas
}

function updateRadius() {
  const newRadius = parseInt(document.getElementById('radius').value)
  dots.forEach((dot) => {
    dot.radius = newRadius // Update the radius of each dot
  })
}

function updateVelocity() {
  const newXVel = parseInt(document.getElementById('xVel').value)
  const newYVel = parseInt(document.getElementById('yVel').value)
  dots.forEach((dot) => {
    // Randomly assign new velocities based on the range
    dot.xVel = Math.random() * (2 * newXVel) - newXVel
    dot.yVel = Math.random() * (2 * newYVel) - newYVel
  })
}

document.getElementById('dotsCount').addEventListener('change', () => {
  createDots()
  if (animationFrameId) {
    startAnimation() // Restart the animation with new dot count
  }
})
document.getElementById('radius').addEventListener('change', updateRadius)
document.getElementById('xVel').addEventListener('change', updateVelocity)
document.getElementById('yVel').addEventListener('change', updateVelocity)

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  createDots() // Recreate dots to fit the new canvas size
  if (animationFrameId) {
    startAnimation() // Restart animation on resize
  }
})

startAnimation()
