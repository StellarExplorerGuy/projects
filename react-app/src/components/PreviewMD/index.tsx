import { ItemType } from '../../types'

import MarkdownEditor from '@uiw/react-markdown-editor'

import styles from './PreviewMD.module.scss'
import { toolbars } from './preview.utils'

interface PreviewMDProps {
  config: { hideToolbar: boolean; visible: boolean; editable: boolean }
  field: keyof ItemType
  value: string
  dialogValue: ItemType
  setDialogValue: React.Dispatch<React.SetStateAction<ItemType>>
}

function PreviewMD({ config, field, value, dialogValue, setDialogValue }: PreviewMDProps) {
  return (
    <MarkdownEditor
      className={styles.wrapper}
      editable={config.editable}
      hideToolbar={config.hideToolbar}
      visible={config.visible}
      toolbars={toolbars}
      value={value}
      onChange={(value) => {
        setDialogValue({ ...dialogValue, [field]: value })
      }}
    />
  )
}

export default PreviewMD
