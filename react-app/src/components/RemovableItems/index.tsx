import React from 'react'

import { MeasuringStrategy } from '@dnd-kit/core'
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, horizontalListSortingStrategy } from '@dnd-kit/sortable'

import { List } from './List'
import { Sortable, Props as SortableProps } from './Sortable'

const baseStyles: React.CSSProperties = {
  height: 55,
  width: 140,
}
const itemCount = 50

const props: Partial<SortableProps> = {
  Container: (props: any) => <List horizontal {...props} />,
  itemCount,
  getItemStyles: () => baseStyles,
  strategy: horizontalListSortingStrategy,
}

const animateLayoutChanges: AnimateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true })

type RemovableItemsProps = {
  items: string[]
}

export default function RemovableItems({ items }: RemovableItemsProps) {
  return (
    <Sortable
      {...props}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
      items={items}
    />
  )
}
