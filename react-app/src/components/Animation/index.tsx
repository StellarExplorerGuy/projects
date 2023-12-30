import { UseRiveParameters, useRive } from '@rive-app/react-canvas-lite'
import { getAnimationURL } from '../../utils/animation'
import { Suspense } from 'react'

type AnimationProps = UseRiveParameters

const Animation = ({ config }: { config: AnimationProps }) => {
  const riveAnimationURL = getAnimationURL(config!.src!)
  const { RiveComponent } = useRive({
    ...config,
    src: riveAnimationURL,
  })

  return <RiveComponent />
}

const RiveAnimation = (config: AnimationProps) => {
  return config?.src ? (
    <Suspense fallback={<></>}>
      <Animation config={config} />
    </Suspense>
  ) : null
}

export default RiveAnimation
