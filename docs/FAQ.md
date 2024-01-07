
(1) WebAssembly error on chrome

ISSUE:
content.js:77 wasm streaming compile failed: CompileError: WebAssembly.i
content.js:77 falling back to ArrayBuffer instantiation
content.js:77 failed to asynchronously prepare wasm: CompileError: WebAssembly.
content.js:77 Aborted(CompileError: WebAssembly.instantiate(): )

FIX:
https://github.com/WebAssembly/content-security-policy/issues/37#issuecomment-1081276516

NOTES:
works without
"content_security_policy": {
"extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
},


(2) browser issues
- chrome.runtime.getURL('')
"@types/chrome": "0.0.254",

- browser.runtime.getURL('')
firefox.d.ts

(3) RIVE
- canvas-lite@2.9.0/rive.wasm

(4) delay for suspense


import { useRive } from '@rive-app/react-canvas-lite'
import { RESOURCE, getAnimationURL } from '../../utils/animation'
import CircularProgress from '@mui/joy/CircularProgress'
import { Suspense } from 'react'
import Box from '@mui/joy/Box'

const fakeServerCall = (response: any, responseTime: number): Promise<Response> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(response)
    }, responseTime)
  })

function wrapPromise<T>(promise: Promise<T>): any {
  let status = 'pending'
  let result: T
  let suspender = promise.then(
    (r) => {
      status = 'success'
      result = r
    },
    (e) => {
      status = 'error'
      result = e
    },
  )

  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    },
  }
}
function fetchHomeText() {
  const homeTextPromise = fakeServerCall(homeText, 500000)

  return {
    text: wrapPromise(homeTextPromise),
  }
}

const homeText = {
  text: 'Welcome to your Home Page',
}

const resource = fetchHomeText()
const Animation = () => {
  const data = resource.text.read()

  const riveAnimationURL = getAnimationURL(RESOURCE.VEHICLES)

  const { RiveComponent } = useRive({
    src: riveAnimationURL,
    autoplay: true,
  })

  // return <RiveComponent />

  return <>{data}</>
}

const RiveAnimation = () => {
  return (
    <Suspense fallback={<CircularProgress sx={{ position: 'absolute', width: '100%', float: 'right' }} variant="solid" />}>
      <Animation />
    </Suspense>
  )
}

export default RiveAnimation


// GIF
// <img style={{ float: 'right', marginRight: 100 }} src={Fire} alt="GIF Example" />


docker run --rm -e HEIGHT=256 -e WIDTH=256 -e FPS=30 -v /home/ed/Downloads/lottie-animations:/source edasriyan/lottie-to-gif

docker run --rm -v /Users/strela/Downloads/000:/source edasriyan/lottie-to-gif


const DotLottie = memo((prop: any) => {
  console.log('!![TEST]DotLottie')
  return (
    <div style={{ float: 'right', marginRight: 10, width: '100px', height: '100px' }}>
      <DotLottiePlayer src={prop.config.config.animation.src} autoplay loop></DotLottiePlayer>
    </div>
  )
})

export default DotLottie
