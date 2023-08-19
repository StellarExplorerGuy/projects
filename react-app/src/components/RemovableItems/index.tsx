import React from 'react'

import { MeasuringStrategy } from '@dnd-kit/core'
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, horizontalListSortingStrategy } from '@dnd-kit/sortable'

import { List } from './List'
import { Sortable, Props as SortableProps } from './Sortable'

const itemCount = 50
const baseStyles: React.CSSProperties = {
  height: 150,
  width: 150,
}

const props: Partial<SortableProps> = {
  Container: (props: any) => <List horizontal {...props} />,
  itemCount,
  getItemStyles: () => baseStyles,
  strategy: horizontalListSortingStrategy,
}

const animateLayoutChanges: AnimateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true })

export default function RemovableItems() {
  return (
    <Sortable
      {...props}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
    />
  )
}
