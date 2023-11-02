import { ItemType } from 'types'

import MarkdownEditor from '@uiw/react-markdown-editor'

import styles from './PreviewMD.module.scss'
import { toolbars } from './preview.utils'


interface PreviewMDProps {
  field: keyof ItemType
  value: string
  dialogValue: ItemType
  setDialogValue: React.Dispatch<React.SetStateAction<ItemType>>
}

function PreviewMD({ field, value, dialogValue, setDialogValue }: PreviewMDProps) {
  return (
    <MarkdownEditor
      className={styles.wrapper}
      visible
      toolbars={toolbars}
      value={value}
      onChange={(value) => {
        setDialogValue({ ...dialogValue, [field]: value })
      }}
    />
  )
}

export default PreviewMD
