import { useRive } from '@rive-app/react-canvas-lite'
import { Suspense, memo } from 'react'
import { ThemeConfig } from 'src/types'

type AnimationProps = { config: ThemeConfig }

const Animation = (prop: AnimationProps) => {
  const { RiveComponent } = useRive(prop.config.config.animation)
  return <RiveComponent style={prop.config.config.custom.style} />
}

const RiveAnimation = memo((prop: AnimationProps) => {
  return prop?.config?.config?.animation?.src ? (
    <Suspense fallback={<></>}>
      <Animation key={`${prop.config.id}${prop.config.config.animation.layout.fit}`} config={prop.config} />
    </Suspense>
  ) : null
})

export default RiveAnimation
