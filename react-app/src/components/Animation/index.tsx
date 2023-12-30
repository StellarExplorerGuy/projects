import { useRive } from '@rive-app/react-canvas-lite'
import { RESOURCE, getAnimationURL } from '../../utils/animation'

export const Animation = () => {
  const riveAnimationURL = getAnimationURL(RESOURCE.VEHICLES)

  const { RiveComponent } = useRive({
    src: riveAnimationURL,
    autoplay: true,
  })

  return <RiveComponent />
}
