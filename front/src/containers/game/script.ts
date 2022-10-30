import { updateBird, setupBird, getBirdRect } from "./bird"
import {
  updatePipes,
  setupPipes,
  getPassedPipesCount,
  getPipeRects,
} from "./pipe"
import axios from "axios";
import { isCollision } from "./isCollision";

document.addEventListener("keypress", handleStart, { once: true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime
function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(updateLoop)
    return
  }
  const delta = time - lastTime
  updateBird(delta)
  updatePipes(delta)
  if (checkLose()) return handleLose()
  lastTime = time
  window.requestAnimationFrame(updateLoop)
}

function checkLose() {
  const birdRect = getBirdRect()
  const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
  return outsideWorld || insidePipe
}

function handleStart() {
  title.classList.add("hide")
  setupBird()
  setupPipes()
  lastTime = null
  window.requestAnimationFrame(updateLoop)
}

async function handleLose() {
  setTimeout(() => {
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent = `${getPassedPipesCount()} Pipes`
    document.addEventListener("keypress", handleStart, { once: true })
  }, 100)

  const addressArr = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
  const address = addressArr[0];
  axios.post('http://localhost:3000/front/update-shila-point',{
    address: address,
    point: getPassedPipesCount()
  });

}