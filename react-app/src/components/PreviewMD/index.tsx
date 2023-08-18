import MarkdownEditor from '@uiw/react-markdown-editor'

import styles from './PreviewMD.module.scss'

interface PreviewMDProps {
  text: string
  setMarkdown: React.Dispatch<React.SetStateAction<string>>
}

function PreviewMD({ text, setMarkdown }: PreviewMDProps) {
  return (
    <MarkdownEditor
      className={styles.wrapper}
      visible
      value={text}
      onChange={(value) => {
        setMarkdown(value)
      }}
    />
  )
}

export default PreviewMD
