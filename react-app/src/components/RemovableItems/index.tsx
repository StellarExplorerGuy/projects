import React from 'react'

import { MeasuringStrategy, UniqueIdentifier } from '@dnd-kit/core'
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, horizontalListSortingStrategy } from '@dnd-kit/sortable'

import { List } from './List'
import { Sortable, Props as SortableProps } from './Sortable'

const baseStyles: React.CSSProperties = {
  height: 55,
  width: 140,
}

const props: Partial<SortableProps> = {
  Container: (props: any) => <List horizontal {...props} />,
  getItemStyles: () => baseStyles,
  strategy: horizontalListSortingStrategy,
}

const animateLayoutChanges: AnimateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true })

type RemovableItemsProps = {
  items: UniqueIdentifier[]
  setItems: React.Dispatch<React.SetStateAction<UniqueIdentifier[]>>
}

export default function RemovableItems({ items, setItems }: RemovableItemsProps) {
  return (
    <Sortable
      {...props}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
      items={items}
      setItems={setItems}
    />
  )
}
