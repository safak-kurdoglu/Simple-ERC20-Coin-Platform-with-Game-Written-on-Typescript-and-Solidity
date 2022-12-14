const HOLE_HEIGHT: number = 200
const PIPE_WIDTH: number = 120
const PIPE_INTERVAL: number = 1500
const PIPE_SPEED: number = 0.75
let pipes: any = []
let timeSinceLastPipe: any
let passedPipeCount: any

export function setupPipes() {
  document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH.toString())
  document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT.toString())
  pipes.forEach(pipe => pipe.remove())
  timeSinceLastPipe = PIPE_INTERVAL
  passedPipeCount = 0
}

export function updatePipes(delta) {
  timeSinceLastPipe += delta

  if (timeSinceLastPipe > PIPE_INTERVAL) {
    timeSinceLastPipe -= PIPE_INTERVAL
    createPipe()
  }

  pipes.forEach(pipe => {
    if (pipe.left + PIPE_WIDTH < 0) {
      passedPipeCount++
      return pipe.remove()
    }
    pipe.left = pipe.left - delta * PIPE_SPEED
  })
}

export function getPassedPipesCount() {
  return passedPipeCount
}

export function getPipeRects() {
  return pipes.flatMap(pipe => pipe.rects())
}

function createPipe() {
  const pipeElem = document.createElement("div")
  const topElem = createPipeSegment("top")
  const bottomElem = createPipeSegment("bottom")
  pipeElem.append(topElem)
  pipeElem.append(bottomElem)
  pipeElem.classList.add("pipe")
  pipeElem.style.setProperty(
    "--hole-top",
    randomNumberBetween(
      HOLE_HEIGHT * 1.5,
      window.innerHeight - HOLE_HEIGHT * 0.5
    ).toString()
  )
  const pipe = {
    get left() {
      return parseFloat(
        getComputedStyle(pipeElem).getPropertyValue("--pipe-left")
      )
    },
    set left(value) {
      pipeElem.style.setProperty("--pipe-left", value.toString())
    },
    remove() {
      pipes = pipes.filter(p => p !== pipe)
      pipeElem.remove()
    },
    rects() {
      return [
        topElem.getBoundingClientRect(),
        bottomElem.getBoundingClientRect(),
      ]
    },
  }
  pipe.left = window.innerWidth
  document.getElementById("game-container").append(pipeElem);
  pipes.push(pipe)
}

function createPipeSegment(position) {
  const segment = document.createElement("div")
  segment.classList.add("segment", position)
  return segment
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}